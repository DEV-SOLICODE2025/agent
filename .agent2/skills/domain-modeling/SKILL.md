# Skill: Domain Modeling

## Objective
Transform validated requirements into a structured domain model before any architecture or coding.

---

## Preconditions

- Analyse de Besoin must be validated.
- docs/analysis/cahier-de-charge.md must exist.

If not validated → REFUSE execution.

---

## Actions

### Action 1: Entity Identification
- Extract core entities from functional requirements.
- Define purpose of each entity.
- List main attributes.

---

### Action 2: Relationship Definition
- Define relationships (1-1, 1-N, N-N).
- Identify foreign keys.
- Detect pivot tables if necessary.

---

### Action 3: Business Rules Mapping
- Define validation rules.
- Define constraints.
- Define edge cases.

---

### Action 4: Data Lifecycle Definition
- Creation flow
- Update flow
- Deletion policy (soft delete / hard delete)
- State transitions if applicable

---

## Output

Create:

docs/analysis/domain-model.md

Structure must include:

- Entities Table
- Relationships
- Business Rules
- Data Lifecycle
- Edge Cases

---
---

## 5. Concurrency & Transaction Safety (Mandatory)

### Rule 1: Enrollment Transaction

Enrollment creation MUST be wrapped inside a database transaction.

Example (conceptual):

- Start transaction
- Lock course row (SELECT ... FOR UPDATE)
- Check capacity
- Insert enrollment
- Commit transaction

No enrollment logic is allowed outside a transaction.

---

### Rule 2: Capacity Concurrency Protection

Capacity validation must be atomic.

The agent must ensure:

- Race conditions are prevented.
- Two concurrent requests cannot exceed course capacity.
- Capacity check and insert occur within the same transaction.

---

### Rule 3: Database-Level Protection

In addition to application-level validation:

- Enforce UNIQUE(student_id, course_id) at database level.
- Use foreign key constraints.
- Prefer DB constraints over application-only checks.

---

Failure to enforce transaction safety is considered a critical architectural violation.
## STOP RULE

After generating domain-model.md:
STOP execution and wait for developer validation.

No architecture allowed.
No coding allowed.

---

Trace required:
Action executed: Domain Modeling
Skill: domain-modeling