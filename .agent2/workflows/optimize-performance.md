# WORKFLOW: /optimize-performance

## Purpose

Analyze and improve backend & frontend performance
without changing business logic.

Focuses on:

- Query optimization
- N+1 detection
- Index improvements
- Pagination enforcement
- Caching opportunities
- Frontend rendering optimization

Uses:

- state-engine
- audit-project
- refactor-skill
- validator
- memory

---

# REQUIRED INPUT (STRICT)

{
  "scope": "backend | frontend | full-project",
  "apply_optimizations": true/false,
  "strict_mode": true/false
}

If scope missing → STOP.

---

# EXECUTION FLOW

## Step 1 — State Snapshot

Call State Engine.

Collect:

- Models
- Controllers
- Relations
- Routes
- Frontend pages

If state invalid → STOP.

---

## Step 2 — Performance Audit

Call /audit-project with:

{
  "scope": scope,
  "deep_analysis": true,
  "check_security": false,
  "check_performance": true
}

Collect:

- N+1 risks
- Missing eager loading
- Large controllers
- Missing pagination
- Heavy endpoints
- Missing indexes

---

## Step 3 — Optimization Plan

Generate structured plan:

- Add eager loading
- Add paginate()
- Add indexes suggestion
- Extract heavy logic to Service
- Add caching layer (if appropriate)
- Reduce large JSON payloads
- Remove redundant API calls (frontend)

If strict_mode = true:
→ Only safe non-breaking optimizations allowed.

---

## Step 4 — Apply Optimizations (if apply_optimizations = true)

Call refactor-skill with:

- optimize_queries = true
- enforce_service_layer = true

Never:

- Modify migration history
- Drop columns
- Change API contract

---

## Step 5 — Validation

Call Validator.

Ensure:

- No broken route
- No response contract change
- No auth removed
- No missing middleware

If validation fails → STOP.

---

## Step 6 — Performance Score

Calculate approximate performance score:

Based on:

- Query efficiency
- Pagination usage
- Route cleanliness
- Service layer enforcement
- Duplicate code removed

---

# SAFETY RULES

- Never remove business logic
- Never change API response structure
- Never drop DB column
- Never auto-apply breaking change
- Always require confirmation

---

# OUTPUT FORMAT

{
  "status": "completed | failed",
  "optimizations_applied": [],
  "performance_score": 0-100,
  "warnings": [],
  "recommended_next_steps": []
}