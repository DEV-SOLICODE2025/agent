# Agent Interaction Specification — Business Level

This document defines the business-facing interaction model for the merged autonomous agent. It is the canonical source for conversation modes, confirmation templates, menus, SLAs, and traceability.

1) Interaction Modes

- Mode Discussion (`>` prefix): read-only analytics and guidance. No file changes or system commands. Use for architectural questions, code review, explanations.
- Mode Standard (no prefix): full agent behavior; may propose workflows and request confirmations before making changes.

2) Decision & Confirmation Patterns

- High confidence actions (confidence > 90%): present a Confirmation Template and wait for explicit approval.
- Ambiguous actions: present a Dynamic Menu generated from the SKILL.md for the relevant skill.

Confirmation Template (use when action detected with high confidence):

```
📋 Request Identified

You asked: [Short description]

Detected action: [Action X] - [Action name] (Skill: [SkillName])
→ [Short description from Skill]

Do you want to proceed with this action? (Type `Y` to confirm)
```

Dynamic Menu Template (use when ambiguous):

```
> Actions available (Skill: [SkillName]):
> [A] Title - [Short description]
> [B] Title - [Short description]
> ...

Which action do you want to execute? (Type the letter)
```

3) Traceability Block (mandatory at end of any execution-causing response)

```
---
Workflow used : /[workflow-name]
Action executed : [Action X] - [short description] (Skill: [SkillName])
Result summary : [one-line result or next steps]
```

4) Handoff and Escalation

- If the agent cannot resolve a task after 2 recovery attempts, escalate to human and provide an action list for manual remediation.
- Provide a compact diff or pointer to changed files and request human approval for final push.

5) Business KPIs and SLAs

- Confirmation latency: < 60s for presenting options in interactive sessions.
- Action accuracy (first execution without rollback): target 92%+ for production-critical flows.
- Audit coverage: 100% of executed workflows must be recorded in `memory/audit-history.json`.

6) Security & Privacy

- No secrets or keys in chat responses.
- All paths are sandboxed to workspace only.

7) Example conversation (happy path)

User (no prefix): "Create CRUD for products"
Agent: Presents detected action and required inputs, e.g. DB fields and endpoints.
Agent: Shows Confirmation Template.
User: `Y`
Agent: Executes workflow `/generate-crud`, reports traceability block and the path to changed files, and updates memory/audit-history.

8) Data contract for integrations (lightweight)

- POST /agent/execute
  - body: { "workflow": "generate-crud", "inputs": { ... }, "requester": "user-id" }
  - response: { "status": "pending|confirmed|done|failed", "trace": { workflow, action, timestamp }, "artifacts": [paths] }

9) Templates & Locales

- Templates must support English and French by default (merged source includes French protocols from `.agent`).

10) Upgrade & Reflex

- When a user corrects the agent, present `/raffinement-agent` option to propose a permanent skill/rule update instead of a simple apology.
