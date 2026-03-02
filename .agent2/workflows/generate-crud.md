# WORKFLOW: /generate-crud

## Purpose

Generate a structured CRUD module for an existing project
without full feature orchestration.

This workflow focuses strictly on:

- Database table
- Model
- Controller
- Routes
- Validation
- Optional frontend pages

It does NOT handle complex business logic.
It does NOT handle advanced module orchestration.

Uses:

- state-engine
- api-design-skill
- crud-skill
- relation-skill (if needed)
- validator
- recovery
- memory

---

# REQUIRED INPUT (STRICT)

{
  "model_name": "",
  "fields": [],
  "protected": true/false,
  "with_relations": true/false,
  "include_frontend": true/false
}

If model_name missing → STOP.

---

# EXECUTION FLOW

## Step 1 — State Snapshot

Call State Engine.

Verify:

- Laravel installed
- Model does NOT already exist
- Table does NOT already exist

If duplicate detected → FAIL.

---

## Step 2 — API Design

Call api-design-skill:

- Define REST endpoints
- Define validation schema
- Define response format
- Apply middleware if protected = true

If conflict detected → STOP.

---

## Step 3 — CRUD Backend Generation

Call crud-skill:

- Create migration
- Create model
- Create controller
- Register routes
- Create FormRequest

If with_relations = true:
→ Call relation-skill for FK handling.

---

## Step 4 — Frontend (Optional)

If include_frontend = true AND React detected:

Create:

frontend/src/pages/{ModelName}/

Files:

- List.jsx
- Create.jsx
- Edit.jsx

Ensure:

- API integration via axios
- Loading state
- Error handling
- ProtectedRoute if required

If React not detected:
→ Skip frontend safely.

---

## Step 5 — Validation Phase

Call Validator.

Ensure:

- Migration file exists
- Model exists
- Controller exists
- Routes registered
- No duplicate route
- API response structure correct

If failed:
→ Send failure to Recovery.
→ Await confirmation.

---

# SAFETY RULES

- Never overwrite existing model
- Never modify old migration
- Never remove existing route
- Always use FormRequest
- Always enforce response contract

---

# OUTPUT FORMAT

{
  "status": "completed | failed",
  "model": "",
  "components_created": {
    "migration": "",
    "model": "",
    "controller": "",
    "routes": [],
    "frontend_pages": []
  },
  "warnings": [],
  "next_possible_actions": []
}