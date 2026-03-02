# AGENT FINAL — ARCHITECTURE (Merged)

This document unifies the detailed architecture from `.agent2/architecture.md` with practical execution and UI rules taken from `.agent` resources.

1) Root structure

agent-final/
├── core/                 # Core control & decision docs (pointer to originals)
├── tools/                # Safe system tooling (path-validator, file-tool, command-tool)
├── skills/               # Reusable engineering skills (project, auth, CRUD, UI, testing)
├── workflows/            # User-facing orchestration flows
├── resources/            # UI rules, design manifests, stack guidance
├── rules/                # Interaction & coding rules
├── memory/               # Persistent JSON memory (architectural rules, audit history...)
└── agent_interaction_spec.md

2) System layers (concise)

- Security Layer: path-validator, file-tool, command-tool, sandbox enforcement.
- Core Intelligence Layer: orchestrator, state-engine, planner, executor, validator, recovery, memory.
- Skills Layer: modular skills for common engineering tasks.
- Workflow Layer: confirmed, traceable user flows.
- Interaction Layer: business-facing conversation templates, confirmations, dynamic menus.

3) Execution loop (confirmed)

User Request → Orchestrator → State Engine → Planner → User Confirmation → Executor → Validator → Recovery (if needed) → Memory Update

4) Safety & Business rules

- Confirmation required for destructive actions.
- No root escape; all operations constrained to sandbox workspace.
- No automatic code-push or destructive DB operations without explicit user approval.
- All executed workflows must log: workflow used, action executed, skill, and brief result (traceability block).

5) Additions from `.agent` (practical rules)

- Atomic design manifest rules (ui-kit manifests + strict upstream linking).
- Workflow wrappers must use SKILL.md as source of truth and not hardcode steps in workflows.
- Use the menu & confirmation templates defined in `agent_interaction_spec.md`.

6) Memory & learning

Memory contains:
- architectural-rules.json
- error-patterns.json
- user-constraints.json
- audit-history.json
- learning-log.json

Memory influences Planner decisions and is updated after validated actions.

7) Runtime readiness

This merged architecture is ready for implementation. The key next steps are:
1. Implement sandboxed runtime with strict command filtering.
2. Implement planner → executor with human confirmation hooks.
3. Wire memory persistence and learning-update workflows.
