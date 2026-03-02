Agent Final — Orchestrator runtime prototype

What this is
- A minimal, dependency-free Node.js HTTP server that implements the confirmation and validation flow described in `INSTRUCTIONS.md` and `agent_interaction_spec.md`.

Endpoints
- GET /health — sanity check
- POST /agent/execute — submit a workflow execution request

How it works
1. POST to `/agent/execute` with JSON: `{ "workflow": "generate-module", "inputs": { ... }, "requester": "dev" }`
2. Server reads `workflows/<workflow>.md` and attempts to extract the `REQUIRED INPUT` JSON to validate required top-level keys.
3. If request does not include `confirm: true`, server returns a confirmation template (prompt + list of missing required keys).
4. If `confirm: true`, server appends an audit entry to `memory/audit-history.json` and returns the execution trace.

Run (PowerShell)

node index.js

Then in another shell you can POST using curl (PowerShell):

curl -Method POST -ContentType 'application/json' -Body '{ "workflow":"generate-module", "inputs": { "module_name": "Products" }, "requester": "dev" }' http://localhost:3000/agent/execute

To confirm, resend with `"confirm": true` in the body.

- This prototype does NOT modify code or files beyond writing to `memory/audit-history.json`.
- It performs a naive extraction of `REQUIRED INPUT` from workflow markdown; complex or non-JSON blocks may not parse.
- Use this as a safe, demonstrable harness to build a fuller orchestrator that can call skill implementations.
Notes & limitations
- This prototype can call safe, dry-run skill implementations located in `runtime/skills_impl/` (currently: `project-skill.js` used by the `init-project` workflow).
- Skill implementations MUST be dry-run only (no destructive changes). The orchestrator will record skill results in `memory/audit-history.json`.
- This prototype does NOT modify project files beyond writing to `memory/audit-history.json`.
- It performs a naive extraction of `REQUIRED INPUT` from workflow markdown; complex or non-JSON blocks may not parse.

Wired workflows -> skill implementations
- `init-project` → `runtime/skills_impl/project-skill.js` (dry-run)

Use this as a safe, demonstrable harness to build a fuller orchestrator that can call skill implementations.
- This prototype does NOT modify code or files beyond writing to `memory/audit-history.json`.
- It performs a naive extraction of `REQUIRED INPUT` from workflow markdown; complex or non-JSON blocks may not parse.
- Use this as a safe, demonstrable harness to build a fuller orchestrator that can call skill implementations.

## Staging scaffolder (scaffold-staging-skill)

There is a safe scaffolder skill `scaffold-staging-skill` at `runtime/skills_impl/scaffold-staging-skill.js`.

- Dry-run: call the orchestrator with workflow `scaffold-demo` and `inputs.project_name` to preview what would be created.
- Write-run: include `inputs.allow_write = true` and call the orchestrator with `confirm: true` to create a staging folder at `agent final/staging/`.

To locally verify the latest staging folder, use the included `verify_staging.js` script which prints the latest staging path and key files (backend package.json, server.js, frontend index.html, and README snippet).

Example (PowerShell):
```powershell
# Run the orchestrator confirmation step (dry-run)
# Invoke-RestMethod -Uri http://localhost:3000/agent/execute -Method POST -Body (ConvertTo-Json @{ workflow='scaffold-demo'; inputs=@{ project_name='DemoApp' }; requester='you' }) -ContentType 'application/json'

# Execute and write (will require confirm=true and allow_write=true)
# Invoke-RestMethod -Uri http://localhost:3000/agent/execute -Method POST -Body (ConvertTo-Json @{ workflow='scaffold-demo'; inputs=@{ project_name='DemoApp'; allow_write=$true }; requester='you'; confirm=$true }) -ContentType 'application/json'

# Locally verify the latest staging folder
# node runtime/verify_staging.js
```
