# WORKFLOW: /audit-project

## Purpose

Analyze the current project and generate a structured quality report.

This workflow does NOT modify anything.
It is strictly read-only.

Uses:

- state-engine
- validator
- memory
- refactor-skill (analysis mode only)

---

# REQUIRED INPUT (STRICT)

{
  "scope": "backend | frontend | full-project",
  "deep_analysis": true/false,
  "check_security": true/false,
  "check_performance": true/false
}

If scope missing → STOP.

---

# EXECUTION FLOW

## Step 1 — State Snapshot

Call State Engine.

Collect:

- Installed components
- Models
- Controllers
- Routes
- Tables
- Frontend pages
- Auth status

If state invalid → STOP.

---

## Step 2 — Structural Integrity Check

Call Validator in audit mode.

Check:

- Duplicate routes
- Missing validation classes
- Missing service layer
- Controllers too large
- Missing middleware
- Missing foreign keys

---

## Step 3 — Security Analysis (if enabled)

If check_security = true:

Analyze:

- Unprotected routes
- Missing auth middleware
- Raw SQL usage
- Mass assignment risks
- Debug mode enabled
- Exposed sensitive fields

Flag critical issues.

---

## Step 4 — Performance Analysis (if enabled)

If check_performance = true:

Check:

- N+1 query risk
- Missing eager loading
- Missing pagination on large collections
- Missing indexes on foreign keys
- Large controller logic blocks

Suggest optimization opportunities.

---

## Step 5 — Frontend Structure Check (if scope includes frontend)

Analyze:

- Inline axios usage
- Missing ProtectedRoute
- Duplicated components
- Inconsistent folder structure
- Large page components
- No loading state handling

---

## Step 6 — Memory Cross-Check

Compare findings with memory rules.

If violations detected:
→ Add to critical_violations list.

---

# OUTPUT FORMAT (STRICT)

{
  "status": "completed",
  "project_health_score": 0-100,
  "critical_issues": [],
  "warnings": [],
  "optimization_suggestions": [],
  "security_risks": [],
  "recommended_actions": []
}
