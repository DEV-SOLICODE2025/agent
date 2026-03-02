# QUALITY STANDARDS — Autonomous Builder V2

## Purpose

Define strict quality standards that all engines,
skills, and workflows must follow.

This document acts as a global quality contract.

---

# 1️⃣ Code Quality Standards

## Backend (Laravel)

- Controllers must be thin
- Business logic must live in Services/
- Validation must use FormRequest
- No inline validation duplication
- No raw SQL unless justified
- Use Eloquent relationships properly
- Use eager loading when needed
- No mass assignment vulnerability

---

## Frontend (React)

- No inline axios calls inside UI components
- API logic must live in api/ folder
- Reusable components for inputs & buttons
- No inline styles (use Tailwind)
- Protected routes must be enforced
- No hardcoded URLs
- Proper loading & error states required

---

# 2️⃣ API Standards

All API responses must follow:

Success:

{
  "success": true,
  "data": {},
  "message": "",
  "meta": {}
}

Error:

{
  "success": false,
  "message": "",
  "errors": {}
}

Never expose:

- Stack traces
- Raw exception messages
- Sensitive fields

---

# 3️⃣ Database Standards

- Always use foreign key constraints
- No nullable FK unless justified
- Always use indexes for relations
- No modification of old migrations
- Always create incremental migrations
- No destructive DB operation without confirmation

---

# 4️⃣ Security Standards

- auth:sanctum enforced where required
- No token stored in localStorage
- No debug mode in production
- No open sensitive routes
- Always validate user input
- No bypass of middleware

---

# 5️⃣ Testing Standards

- Critical endpoints must have feature tests
- Business logic must have unit tests
- No tests using production database
- Always use factories
- Tests must be deterministic

---

# 6️⃣ Performance Standards

- Avoid N+1 queries
- Use pagination for large collections
- Avoid returning massive JSON payloads
- Apply eager loading when needed
- Optimize queries before adding caching

---

# 7️⃣ Refactor Standards

- Controllers < 200 lines
- No duplicated validation rules
- No duplicated business logic
- Clear separation of concerns
- No anonymous route closures

---

# 8️⃣ Workflow Integrity Rules

- No workflow may skip Validator
- No execution without confirmation
- No automatic destructive operation
- Always update memory on new pattern detection

---

# 9️⃣ Escalation Rules

Escalate to user when:

- Migration conflict detected
- Unknown error classification
- Potential breaking change
- Security risk detected
- Repeated failure after repair

---

# QUALITY SCORE SYSTEM

During /audit-project:

Score calculation based on:

- Structure (20%)
- Security (20%)
- API consistency (15%)
- Performance (15%)
- Testing coverage (15%)
- Refactor cleanliness (15%)

Final score: 0–100

---

# ENFORCEMENT

Validator must enforce these standards.

No skill or workflow may bypass quality rules.