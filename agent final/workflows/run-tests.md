# WORKFLOW: /run-tests

## Purpose

Execute automated tests and generate a structured test report.

Supports:

- Feature tests
- Unit tests
- Full project test suite
- Coverage evaluation
- Failure classification

Uses:

- testing-skill
- command-tool
- validator
- recovery
- memory

---

# REQUIRED INPUT (STRICT)

{
  "target": "module | auth | api | full-project",
  "coverage_level": "basic | standard | critical",
  "auto_repair_on_fail": true/false
}

If target missing → STOP.

---

# EXECUTION FLOW

## Step 1 — State Snapshot

Call State Engine.

Verify:

- Laravel installed
- phpunit.xml exists
- Tests directory exists

If missing testing setup:
→ Trigger testing-skill to initialize.

---

## Step 2 — Generate Tests (if missing)

Call testing-skill.

Ensure:

- Feature tests created
- Unit tests created (if requested)
- No duplicate test classes

---

## Step 3 — Execute Tests

Use command-tool:

php artisan test

Working directory MUST be:

C:\agent-sandbox\workspace\backend\

Capture:

- stdout
- stderr
- exit code

---

## Step 4 — Parse Results

Classify:

- Passed tests
- Failed tests
- Errors
- Skipped

Extract:

- Failing test names
- Assertion failures
- Exception messages

---

## Step 5 — Failure Handling

If tests fail:

If auto_repair_on_fail = true:
→ Trigger /repair-system
→ Re-run tests once

If still failing:
→ Escalate

If auto_repair_on_fail = false:
→ Report failure only

---

## Step 6 — Coverage Evaluation

If coverage_level = critical:

Ensure:

- Auth routes covered
- CRUD endpoints covered
- Service logic covered
- Critical flows tested

If gaps detected:
→ Suggest missing tests.

---

# SAFETY RULES

- Never run tests against production DB
- Never drop real tables
- Always use testing database
- Never retry more than once
- Never ignore failing test

---

# OUTPUT FORMAT

{
  "status": "passed | failed | escalated",
  "total_tests": 0,
  "passed": 0,
  "failed": 0,
  "errors": [],
  "coverage_level": "",
  "repair_attempted": true/false
}
