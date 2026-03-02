const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, '..');
const WORKFLOWS_DIR = path.join(ROOT, 'workflows');
const MEMORY_AUDIT = path.join(ROOT, 'memory', 'audit-history.json');

function now() { return new Date().toISOString(); }

function readAudit() {
  try { return JSON.parse(fs.readFileSync(MEMORY_AUDIT, 'utf8')); }
  catch (e) { return { history: [] }; }
}

function writeAudit(a) { fs.writeFileSync(MEMORY_AUDIT, JSON.stringify(a, null, 2), 'utf8'); }

function loadWorkflowSpec(name) {
  const file = path.join(WORKFLOWS_DIR, `${name}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');

  // Try to extract the REQUIRED INPUT JSON block naively
  const marker = 'REQUIRED INPUT';
  const idx = raw.indexOf(marker);
  if (idx === -1) return { raw };
  const sub = raw.slice(idx);
  const firstBrace = sub.indexOf('{');
  const lastBrace = sub.indexOf('}');
  if (firstBrace === -1 || lastBrace === -1) return { raw };
  const jsonText = sub.slice(firstBrace, sub.indexOf('}', firstBrace) + 1);
  try {
    const obj = JSON.parse(jsonText.replace(/\n/g, '\n'));
    return { raw, requiredInput: obj };
  } catch (e) {
    return { raw };
  }
}

function validateRequired(requiredInput, provided) {
  if (!requiredInput) return { ok: true, missing: [] };
  const missing = [];
  // requiredInput is an object with keys; we check top-level keys
  for (const k of Object.keys(requiredInput)) {
    if (provided[k] === undefined) missing.push(k);
  }
  return { ok: missing.length === 0, missing };
}

function confirmationTemplate(workflow, missing) {
  return {
    prompt: `📋 Request Identified\n\nYou asked to run workflow: ${workflow}\n\nDetected action: ${workflow} - requires confirmation.`,
    required_missing: missing,
    how_to_confirm: 'Resend the same POST with { "confirm": true } to execute.'
  };
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ success: true, message: 'agent-final orchestrator running', time: now() }));
  }

  if (req.method === 'POST' && req.url === '/agent/execute') {
    let body = '';
  req.on('data', c => body += c);
  req.on('end', async () => {
      let payload = {};
      try { payload = JSON.parse(body || '{}'); } catch (e) { /* ignore */ }

      const workflow = payload.workflow || 'unknown';
      const inputs = payload.inputs || {};
      const requester = payload.requester || 'anonymous';
      const confirm = !!payload.confirm;

      const spec = loadWorkflowSpec(workflow);
      if (!spec) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: 'error', message: `Workflow ${workflow} not found` }));
      }

      const validation = validateRequired(spec.requiredInput, inputs);
      if (!confirm) {
        const tpl = confirmationTemplate(workflow, validation.missing);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: 'pending_confirmation', template: tpl }, null, 2));
      }

      // confirmed -> try to execute mapped skill implementation (dry-run safe implementations only)
      const WORKFLOW_TO_SKILL = {
        'init-project': 'project-skill',
        'generate-module': 'feature-module-skill'
        // add more mappings here as you implement skill handlers
      };
      // allow additional dev-only mapping for scaffolding demos
      WORKFLOW_TO_SKILL['scaffold-demo'] = 'scaffold-staging-skill';

      const skillName = WORKFLOW_TO_SKILL[workflow];
      let execResult = null;
      if (skillName) {
        const implPath = path.join(__dirname, 'skills_impl', `${skillName}.js`);
        if (fs.existsSync(implPath)) {
          try {
            const impl = require(implPath);
            if (impl && typeof impl.execute === 'function') {
              // allow promise
              execResult = impl.execute(inputs);
              if (execResult && typeof execResult.then === 'function') execResult = await execResult;
            }
          } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ status: 'error', message: 'Skill execution failed', error: String(e) }));
          }
        }
      }

      // write audit entry including execResult (if any)
      const audit = readAudit();
      const entry = {
        timestamp: now(),
        workflow,
        requester,
        inputs,
        validation: validation,
        result: execResult ? (execResult.status || 'executed') : 'executed',
        artifacts: execResult && execResult.artifacts ? execResult.artifacts : []
      };
      audit.history.push(entry);
      try { writeAudit(audit); }
      catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: 'error', message: 'Failed to write audit', error: String(e) }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ status: 'done', trace: entry, skill_result: execResult }, null, 2));
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(PORT, () => console.log(`Orchestrator listening http://localhost:${PORT}`));
