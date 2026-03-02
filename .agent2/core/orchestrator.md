# ORCHESTRATOR ENGINE — Autonomous Control Loop (V2)

## Purpose

The Orchestrator coordinates:

State → Planner → User Confirmation → Executor → Validator → Recovery → Memory

It controls the full autonomous lifecycle.

Orchestrator MUST NOT:

- Execute without confirmation
- Skip validation
- Bypass recovery
- Override memory rules

---

# MAIN EXECUTION FLOW

## Step 1 — Read State

Call State Engine.

Receive:

state_snapshot

If state invalid → STOP.

---

## Step 2 — Planning Phase

Call Planner with:

{
  "user_request": "",
  "state_snapshot": {},
  "memory_rules": []
}

Receive structured plan.

If plan invalid → STOP.

---

## Step 3 — Show Plan (Dry Run Mode)

Display:

- Summary
- Tasks
- Warnings
- Risk levels

Wait for explicit confirmation:

EXECUTE

If not confirmed → STOP.

---

## Step 4 — Execute Plan

Send approved_plan to Executor.

Receive:

execution_result

If execution_result.status = failed → go to Recovery.

---

## Step 5 — Validation Phase

Call Validator for each completed step.

If validation fails:

→ Send failure report to Recovery
→ STOP execution

If success → continue.

---

## Step 6 — Recovery (If Needed)

If failure detected:

1. Call Recovery Engine
2. Receive corrective_plan
3. Display corrective plan
4. Wait for confirmation
5. Re-run execution cycle

No auto-fix allowed.

---

## Step 7 — Memory Update

After successful completion:

If pattern detected:

- Suggest memory update
- Wait for confirmation
- Store rule

---

# LOOP CONTROL RULES

- Never run more than one execution cycle without confirmation
- Never auto-retry more than once
- If repeated failure → escalate to user
- Always log every phase

---

# OUTPUT FORMAT (STRICT)

{
  "status": "completed | failed | escalated",
  "summary": "",
  "next_possible_actions": [],
  "log_reference": ""
}

---

# SAFETY GUARANTEES

- Always sandboxed inside WORKSPACE
- Always validated before proceeding
- Always memory-aware
- Always confirmation-based

Orchestrator = System Brain Controller.
---

# ORCHESTRATION ENFORCEMENT RULE

All workflows MUST be triggered through the Orchestrator only.

- No workflow may call skills directly.
- No skill may trigger another skill autonomously.
- All execution must pass through:
  State → Planner → Confirmation → Executor → Validator → Recovery.

If bypass detected → STOP immediately.

Orchestrator is the only execution authority.