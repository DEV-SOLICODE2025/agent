# SKILL: Automated Testing Architect (Laravel + React) — V2

## Purpose

Generate structured automated tests to ensure:

- API correctness
- Business logic integrity
- Auth protection enforcement
- Database consistency
- Critical user flows stability

This skill upgrades system from "working"
to "production-grade reliable".

Fully compatible with Autonomous Builder V2.

---

# REQUIRED INPUT (STRICT)

{
  "target": "module | auth | api | full-project",
  "coverage_level": "basic | standard | critical",
  "include_feature_tests": true/false,
  "include_unit_tests": true/false
}

If target missing → STOP.

---

# PRE-CONDITIONS

Before execution:

- Laravel installed
- PHPUnit configured
- Database testing environment configured
- No failing migrations

If testing environment missing → FAIL.

---

# PHASE 1 — Feature Tests (API Level)

If include_feature_tests = true:

Generate tests for:

- GET list endpoint
- GET single endpoint
- POST create
- PUT update
- DELETE destroy
- Unauthorized access attempt
- Validation error scenario

Use:

- RefreshDatabase trait
- Proper test database
- JSON assertions

Must validate:

- Response status codes
- Response structure
- Database state after operation

---

# PHASE 2 — Auth Tests

If target = auth or full-project:

Test:

- Successful registration
- Successful login
- Failed login
- Access protected route without auth
- Logout invalidates session

Ensure:

- No route accessible without middleware
- No token exposed in response

---

# PHASE 3 — Unit Tests (Service Layer)

If include_unit_tests = true:

Generate tests for:

- Business logic inside Services
- Edge cases
- Calculation logic
- Validation edge cases

Controllers must NOT contain logic worth unit testing.

---

# PHASE 4 — Database Integrity Tests

Test:

- Foreign key constraints
- Cascade delete behavior
- Unique constraint enforcement
- Pivot table integrity (if many-to-many)

---

# PHASE 5 — Critical Flow Tests

If coverage_level = critical:

Simulate full flow:

User registers  
→ logs in  
→ creates resource  
→ updates resource  
→ deletes resource  

Ensure full lifecycle stable.

---

# TESTING STANDARDS

- No hardcoded IDs
- Use factories
- Use proper seeding
- No reliance on production DB
- Isolated test environment only

---

# FAILURE SCENARIOS

Fail if:

- Test environment misconfigured
- Database conflicts
- Missing factory
- Broken route
- Response contract mismatch

On failure → pass structured report to Recovery.

---

# SECURITY REQUIREMENTS

- No sensitive data in test logs
- No production DB access
- No bypass of auth middleware
- No debug mode enabled

---

# POST-CONDITIONS

After execution:

- Test files created
- Coverage improved
- No failing tests
- Database isolated during testing

---

# OUTPUT CONTRACT (STRICT)

{
  "status": "success | failed",
  "tests_created": [],
  "coverage_level": "",
  "warnings": []
}