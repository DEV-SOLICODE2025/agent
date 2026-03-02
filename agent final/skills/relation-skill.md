# SKILL: Database Relationship Builder (Laravel) — V2

## Purpose

Design and implement proper Eloquent relationships
with correct database constraints, foreign keys,
and validation logic.

Fully compatible with Autonomous Builder V2.

---

# REQUIRED INPUT (STRICT)

{
  "relation_type": "one-to-many | many-to-many | one-to-one",
  "parent_model": "",
  "child_model": "",
  "foreign_key": "",
  "cascade_on_delete": true/false,
  "create_pivot": true/false
}

If required field missing → STOP.

---

# PRE-CONDITIONS

Before execution:

- Both models must exist
- Base tables must exist
- No duplicate foreign key already present
- No circular relation conflict

If model missing → dependency task required.
If FK exists → FAIL.

---

# RELATION TYPES

## 1️⃣ One-to-Many

Example:

User → hasMany → Order  
Order → belongsTo → User  

Execution:

- Add foreignId column in child migration
- Add constrained() with correct reference
- Add onDelete('cascade') if required
- Add relationship methods in both models

Validator must confirm:
- FK column exists
- Eloquent methods exist
- No duplicate column

---

## 2️⃣ One-to-One

Example:

User → hasOne → Profile  
Profile → belongsTo → User  

Execution:

- Add unique foreign key in child table
- Add proper Eloquent methods
- Add database-level unique constraint

Validator must confirm uniqueness enforced.

---

## 3️⃣ Many-to-Many

Example:

User ↔ Role  

Execution:

- Create pivot table:
  parent_child (alphabetical order)
- Add foreignId for both models
- Add composite primary key or unique index
- Add belongsToMany() in both models

If create_pivot = false → FAIL.

Validator must confirm:
- Pivot table exists
- Foreign keys exist
- belongsToMany methods defined

---

# FOREIGN KEY RULES

- Use foreignId()->constrained()
- Match table names properly
- Use cascade only if specified
- Never use raw SQL for constraints

---

# INDEXING POLICY

- Foreign keys must be indexed
- Many-to-many pivot must have composite index
- Unique constraints enforced where required

---

# POST-CONDITIONS

After execution:

state_snapshot must reflect:

- New foreign key in child table
- Updated model methods
- Pivot table (if applicable)

---

# FAILURE SCENARIOS

Fail if:

- Parent model missing
- Child model missing
- Duplicate foreign key detected
- Migration conflict
- Circular relation created

On failure → send structured report to Recovery.

---

# SECURITY & INTEGRITY RULES

- No nullable FK unless explicitly allowed
- No orphan records allowed
- No relation without database constraint
- No inconsistent table naming

---

# OUTPUT CONTRACT (STRICT)

{
  "status": "success | failed",
  "relation_created": {
    "type": "",
    "parent": "",
    "child": "",
    "foreign_key": ""
  },
  "pivot_created": true/false,
  "warnings": []
}
