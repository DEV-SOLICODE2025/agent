# WORKFLOW: /repair-system

## Purpose

Detect, analyze, and repair system-level issues
without rebuilding the project.

This workflow is triggered when:

- Validator fails
- Runtime error detected
- Migration conflict detected
- Route conflict detected
- Auth misconfiguration detected

Uses:

- state-engine
- validator
- recovery
- planner
- executor
- memory

---

# REQUIRED INPUT (STRICT)

{
  "issue_type": "validation | migration | route | auth | performance | unknown",
  "auto_fix": true/false
}

If issue_type missing → STOP.

---

# EXECUTION FLOW

## Step 1 — State Snapshot

Call State Engine.

Capture:

- Current models
- Current routes
- Current migrations
- Auth status
- Frontend structure

If state invalid → STOP.

---

## Step 2 — Validation Recheck

Call Validator in repair mode.

Reconfirm issue.

If issue not reproducible:
→ STOP and report false positive.

---

## Step 3 — Root Cause Analysis

Call Recovery Engine.

Classify:

- Duplicate migration
- Duplicate route
- Missing middleware
- Missing validation
- Broken relationship
- N+1 query
- Missing service layer
- Inconsistent API response
- Build error

If unknown:
→ Escalate.

---

## Step 4 — Generate Corrective Plan

Recovery returns:

{
  "correction_summary": "",
  "corrective_tasks": [],
  "risk_level": "",
  "requires_user_confirmation": true
}

Display plan.

If auto_fix = false:
→ Await manual confirmation.

---

## Step 5 — Execute Repair

Call Executor with corrective_tasks.

All repair tasks must:

- Be atomic
- Be reversible
- Respect sandbox rules
- Not modify historical migrations

---

## Step 6 — Post-Repair Validation

Call Validator again.

If still failing:
→ Escalate to user.
→ Do NOT loop infinitely.

If success:
→ Continue.

---

## Step 7 — Memory Update

If new error pattern detected:

Suggest memory rule:

{
  "type": "error_pattern",
  "trigger": "",
  "solution": ""
}

Require confirmation before saving.

---

# SAFETY RULES

- Never delete critical files automatically
- Never drop database table automatically
- Never remove middleware blindly
- Never retry more than once
- Never override memory rules silently

---

# OUTPUT FORMAT

{
  "status": "repaired | failed | escalated",
  "issue_type": "",
  "fix_applied": [],
  "warnings": [],
  "requires_manual_intervention": true/false
}