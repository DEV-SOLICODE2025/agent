Resources — UI & Technical Manifests

This folder consolidates the most useful resources from `.agent` and `.agent2`.

Included guidance summary:

- Atomic design: follow Atoms → Molecules → Components manifest approach. Maintain `ui-kit/*-manifest.yaml` with explicit dependency links and documentation references.
- Workflow protocols: workflows that act as Skill wrappers must NOT hardcode low-level steps; they must read the Skill's action descriptions, produce dynamic menus, and require confirmation before executing.
- Stack guidance: prefer Tailwind CSS, Preline UI for component templates; maintain strict listing of allowed frameworks in `resources/stack.md` (originals in `.agent/resources/stack-technique.md`).

Templates & enforcement
- Each component must list dependencies and documentation link in the manifest.
- Use the Confirmation and Dynamic Menu templates in `agent_interaction_spec.md`.

References
- See `.agent/resources/atomic-design.md` for the detailed manifest format.
- See `.agent/resources/protocoles-workflow.md` for the French canonical protocol templates.
