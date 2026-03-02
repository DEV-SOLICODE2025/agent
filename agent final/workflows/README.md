Workflows merged into `agent final/workflows`.

This folder contains the canonical workflow markdown files used by the orchestrator.

What I copied:
- All top-level workflows from `.agent2/workflows/` (init-project, generate-module, generate-crud, impl-feature, audit-project, repair-system, run-tests, optimize-performance, etc.).
- Representative workflows from `.agent/workflows/` that were not duplicates (`analyse-besoin.md`, `architecture-contenu.md`).

Notes & next steps:
- There are workflows in subfolders or with overlapping responsibilities between `.agent` and `.agent2`; if you want I can perform an automated dedupe pass and produce a single merged version for each overlapping workflow (I will create conflict notes in `MERGE_LOG.md`).
