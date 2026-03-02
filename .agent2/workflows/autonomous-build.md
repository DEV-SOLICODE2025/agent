# WORKFLOW: /autonomous-build

## Purpose

Handle full autonomous project feature implementation.

---

# Step 1 — State Read

Call State Engine.

---

# Step 2 — Planning

Call Planner with:
- User request
- Current state
- Memory rules

---

# Step 3 — Show Plan

Display structured plan.

Wait for user confirmation:
EXECUTE

---

# Step 4 — Execute Plan

Call Executor.

---

# Step 5 — Validate

Call Validator.

If Validator fails:
  → Pass failure to Recovery
  → Recovery returns corrected plan
  → Planner validates correction
  → User confirms
  → Re-execute

---

# Step 6 — Update Memory

If new rule learned → store in Memory.

---

# Final Output

{
  "status": "completed",
  "summary": "",
  "next_possible_actions": []
}