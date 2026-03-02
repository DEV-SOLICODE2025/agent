Core components

The detailed core docs originate from `.agent2/core/` (state-engine.md, planner.md, executor.md, validator.md, orchestrator.md, recovery.md, memory.md).

To implement runtime behaviour, use the files in `.agent2/core/` as source-of-truth. This folder contains only a pointer and high-level summary.

Suggested immediate tasks:
- Implement a thin orchestrator loop that enforces confirmation-based execution.
- Implement command filtering and sandbox path validation.
