# SKILL: Intelligent Refactor & Optimization Engine (Laravel + React) — V2

## Purpose

Analyze and improve existing codebase structure without breaking functionality.

This skill handles:

- Business logic separation
- Service layer enforcement
- Query optimization
- Eager loading fixes
- Validation improvements
- Route cleanup
- Duplicate code removal
- Frontend structure cleanup

Fully compatible with Autonomous Builder V2.

---

# REQUIRED INPUT (STRICT)

{
  "target": "module | controller | model | frontend | full-project",
  "optimize_queries": true/false,
  "enforce_service_layer": true/false,
  "clean_routes": true/false,
  "frontend_cleanup": true/false
}

If target missing → STOP.

---

# PRE-CONDITIONS

Before execution:

- Project must exist
- State snapshot available
- No ongoing execution process
- No failed migration state

If unstable system detected → FAIL.

---

# PHASE 1 — Structural Analysis

Analyze:

- Controllers for business logic
- Models for missing relationships
- Duplicate validation logic
- Repeated code blocks
- Inline queries in controllers
- Massive controllers (>200 lines)

Return refactor candidates list.

---

# PHASE 2 — Service Layer Enforcement

If enforce_service_layer = true:

- Move business logic to Services/
- Controllers must only:
  - Validate request
  - Call service
  - Return response

No business logic allowed inside controller.

Validator must confirm clean separation.

---

# PHASE 3 — Query Optimization

If optimize_queries = true:

- Detect N+1 problems
- Apply eager loading
- Replace inefficient loops
- Add missing indexes suggestion
- Ensure pagination where needed

No raw DB::select allowed.

---

# PHASE 4 — Route Cleanup

If clean_routes = true:

- Remove duplicate routes
- Ensure consistent REST naming
- Ensure middleware consistency
- Group routes logically

No anonymous closure routes allowed.

---

# PHASE 5 — Frontend Refactor

If frontend_cleanup = true:

- Move API calls to api layer
- Remove inline axios calls in pages
- Extract reusable components
- Remove duplicated form logic
- Normalize folder structure

No business logic inside UI components.

---

# PHASE 6 — Validation Improvement

- Replace inline validation with FormRequest
- Ensure consistent error format
- Remove duplicated validation rules

---

# POST-CONDITIONS

After execution:

- Controllers lightweight
- Services present
- No N+1 detected
- Routes standardized
- Frontend structure normalized
- Validation centralized

---

# FAILURE SCENARIOS

Fail if:

- Breaking change detected
- Route removal affects active feature
- Missing service dependency
- Database schema conflict

On failure → pass to Recovery.

---

# SECURITY REQUIREMENTS

- No removal of auth middleware
- No removal of validation
- No exposure of hidden attributes
- No route left unprotected unintentionally

---

# OUTPUT CONTRACT (STRICT)

{
  "status": "success | failed",
  "refactored_targets": [],
  "improvements_applied": [],
  "warnings": []
}