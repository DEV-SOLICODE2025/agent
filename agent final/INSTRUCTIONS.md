Agent Final — Workflow & Skill Instructions (Machine-readable guidance)

Purpose: provide a single, clear instruction set the agent runtime or an AI operator can read to know exactly which workflow to call, which skills to use, what rules to apply, and where to find the source-of-truth files in this workspace.

Use this file as the canonical execution contract. Each workflow section below lists:
- Workflow path
- Purpose in one line
- Required input contract (shape)
- Skills used (with file paths)
- Rules / resources to consult (with file paths)
- Safety & confirmation rules to obey (references)

Global rules and templates
- Confirmation & dynamic menu templates: `agent_interaction_spec.md`
- Traceability block (mandatory at end of any execution): see `agent_interaction_spec.md` (Traceability Block).
- Quality & enforcement: `resources/README.md` and `.agent2/resources/quality.md` (original in `.agent2`).
- Memory (persistence & rules): `memory/architectural-rules.json`, `memory/audit-history.json`, `memory/error-patterns.json`, `memory/learning-log.json`, `memory/user-constraints.json`.

Execution policy summary (must be enforced by orchestrator)
- Read-only detection mode if message prefixed with `>` (do not modify files).
- Require explicit confirmation for any action that changes the workspace (use confirmation template).
- Never overwrite existing modules/migrations/routes without explicit human approval.
- Record every execution in `memory/audit-history.json` (trace object including workflow, inputs, requester, timestamp, result, artifacts).

Workflows (canonical list)

1) /init-project
- File: `workflows/init-project.md`
- Purpose: Initialize a Laravel + React fullstack project inside the sandbox.
- Required input (strict): see file. Minimal contract:
  {
    "project_name": "",
    "database_name": "",
    "include_frontend": true|false,
    "include_auth": true|false,
    "layout_type": "dashboard|public|hybrid"
  }
- Skills used:
  - `skills/project-skill.md`
  - `skills/ui-layout-skill.md` (if frontend)
  - `skills/auth-skill.md` (if include_auth)
- Rules & resources:
  - `agent_interaction_spec.md` (confirmation templates and traceability)
  - `resources/README.md` (stack & UI rules)

2) /generate-crud
- File: `workflows/generate-crud.md`
- Purpose: Create database table, model, controller, routes, validation and optional frontend pages for a resource.
- Required input (strict): see file. Minimal contract:
  {
    "model_name": "",
    "fields": [],
    "protected": true|false,
    "with_relations": true|false,
    "include_frontend": true|false
  }
- Skills used:
  - `skills/api-design-skill.md`
  - `skills/crud-skill.md`
  - `skills/relation-skill.md` (if with_relations)
  - `skills/ui-layout-skill.md` (frontend integration if React)
- Rules & resources:
  - `resources/README.md` (atomic design & UI manifest rules)
  - `memory/architectural-rules.json` (controllers thin, service layer)

3) /generate-module
- File: `workflows/generate-module.md`
- Purpose: Build a full feature module (API, DB, service layer, frontend pages, navigation).
- Required input (strict): see file. Minimal contract:
  {
    "module_name": "",
    "fields": [],
    "relations": [],
    "protected": true|false,
    "pagination": true|false,
    "searchable_fields": [],
    "sortable_fields": []
  }
- Skills used:
  - `skills/api-design-skill.md`
  - `skills/crud-skill.md`
  - `skills/relation-skill.md`
  - `skills/feature-module-skill.md`
  - `skills/ui-layout-skill.md`
  - `skills/auth-skill.md` (if protected & no auth present)
- Rules & resources:
  - `agent_interaction_spec.md` (confirmation & traceability)
  - `resources/README.md` (UI manifests)
  - `memory/architectural-rules.json`

4) /impl-feature
- File: `workflows/impl-feature.md`
- Purpose: Implement a single feature inside an existing module (endpoint, status transition, bulk action, export, custom logic).
- Required input (strict): see file. Minimal contract:
  {
    "module_name": "",
    "feature_name": "",
    "feature_type": "endpoint|status-change|bulk-action|export|custom-logic",
    "protected": true|false,
    "update_frontend": true|false
  }
- Skills used:
  - `skills/api-design-skill.md`
  - `skills/refactor-skill.md`
  - `skills/testing-skill.md` (if tests requested)
  - `skills/relation-skill.md` (if schema changes)
- Rules & resources:
  - `agent_interaction_spec.md`
  - `memory/error-patterns.json` (if patching known failures)

5) /audit-project
- File: `workflows/audit-project.md`
- Purpose: Read-only structural, security, and performance analysis and report.
- Required input: scope & flags (see file)
- Skills used:
  - `skills/refactor-skill.md` (analysis mode)
  - `skills/testing-skill.md` (test generation/inspection)
- Rules & resources:
  - `memory/architectural-rules.json` (for rule checks)
  - `resources/README.md`

6) /repair-system
- File: `workflows/repair-system.md`
- Purpose: Attempt safe repairs for validation/migration/route/auth/performance issues (requires confirmation for destructive actions).
- Required input: { "issue_type": ..., "auto_fix": true|false }
- Skills used:
  - `skills/refactor-skill.md`
  - `skills/relation-skill.md` (if DB repair)
  - `skills/testing-skill.md` (post-repair validation)
- Rules & resources:
  - Safety: never delete critical files, never drop tables without human approval (see `agent_interaction_spec.md` and `workflows/repair-system.md`).

7) /run-tests
- File: `workflows/run-tests.md`
- Purpose: Run automated tests and optionally trigger repair workflow on failure.
- Required input: { target, coverage_level, auto_repair_on_fail }
- Skills used:
  - `skills/testing-skill.md`
  - `skills/refactor-skill.md` (if auto-repair)
- Rules & resources:
  - Use testing DB only; never run against production DB.

8) /optimize-performance
- File: `workflows/optimize-performance.md`
- Purpose: Non-breaking performance improvements (query optimization, pagination, caching suggestions).
- Required input: { scope, apply_optimizations, strict_mode }
- Skills used:
  - `skills/refactor-skill.md`
  - `skills/testing-skill.md` (to validate changes)
  - `skills/relation-skill.md` (index suggestions)
- Rules & resources:
  - Strict mode: only apply safe, non-breaking changes; never modify API contract.

Business-facing / local workflows (from `.agent` that remain relevant)
- `workflows/analyse-besoin.md` — Skill wrapper pattern for Analyste Besoin (French). File: `workflows/analyse-besoin.md`.
- `workflows/architecture-contenu.md` — Content architect wrappers. File: `workflows/architecture-contenu.md`.

How to read this file programmatically
- Read a workflow file under `workflows/` (it contains an explicit `REQUIRED INPUT` and `USES` sections). Use them to assemble the call to skills.
- For each skill referenced, read the skill file under `skills/` which contains the `REQUIRED INPUT` contract and `OUTPUT CONTRACT`.
- Before invoking any skill that modifies the workspace:
  1. Build a state snapshot using the State Engine (not yet implemented here — use `workflows/init-project.md` expectations).
  2. Validate preconditions listed in the target workflow and skill files.
  3. Present a confirmation to the user using the Confirmation Template from `agent_interaction_spec.md`.
  4. Only after explicit confirmation, call the skill(s) in sequence and log their results to `memory/audit-history.json`.

Files of special importance (quick links)
- `agent_interaction_spec.md` — confirmation, menu, traceability templates (mandatory enforcement).
- `resources/README.md` — UI and atomic design rules.
- `memory/architectural-rules.json` — architecture-level enforcement rules.
- `MERGE_LOG.md` — notes about choices made during merging (read before changing canonical sources).

Next steps you can ask me to perform
- Flatten all subfolder `SKILL.md` files into `skills/` and generate `SKILL_INDEX.md` (I will list conflicts and choices).
- Scaffold an orchestrator that builds the state snapshot and enforces confirmation using this instructions file.
- Generate an OpenAPI-like machine-readable manifest (YAML/JSON) derived from the `REQUIRED INPUT` fields in workflows and skills.

End of instructions — keep this file synchronized with `workflows/` and `skills/` when you update or add new items.
