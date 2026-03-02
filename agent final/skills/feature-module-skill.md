# SKILL: Full Feature Module Builder (Laravel + React) — V2

## Purpose

Build a complete business module integrating:

- Database schema
- Relationships
- API contract
- Controller logic
- Auth protection
- Frontend pages
- UI integration
- Validation rules

This skill orchestrates:

relation-skill  
api-design-skill  
crud-skill  
ui-layout-skill  

Fully compatible with Autonomous Builder V2.

---

# REQUIRED INPUT (STRICT)

{
  "module_name": "",
  "fields": [],
  "relations": [],
  "protected": true/false,
  "pagination": true/false,
  "searchable_fields": [],
  "sortable_fields": []
}

If module_name missing → STOP.

---

# PRE-CONDITIONS

Before execution:

- Laravel installed
- UI Layout exists
- Auth system exists (if protected = true)
- No existing module with same name

If duplicate detected → FAIL.

---

# PHASE 1 — API Design

Call api-design-skill:

- Define endpoints
- Define request schema
- Define response schema
- Define middleware

Must succeed before proceeding.

---

# PHASE 2 — Database & Relations

Call:

- crud-skill (base table)
- relation-skill (if relations provided)

Enforce:

- Foreign key constraints
- Indexing policy
- Cascade rules

Validator must confirm integrity.

---

# PHASE 3 — Backend Logic Layer

Create:

- Service class (business logic separation)
- FormRequest validation classes
- Apply middleware

No business logic inside Controller.

Controller must delegate to Service.

---

# PHASE 4 — Frontend Integration

Create folder:

frontend/src/pages/{ModuleName}/

Files:

- List.jsx
- Create.jsx
- Edit.jsx
- View.jsx (optional)

Integrate:

- API calls
- Loading states
- Error display
- Pagination UI (if enabled)
- Search input (if enabled)
- Sorting UI (if enabled)

If protected = true → enforce ProtectedRoute.

---

# PHASE 5 — Navigation Integration

If dashboard layout exists:

- Add sidebar link
- Add route entry
- Ensure no duplicate route keys

---

# POST-CONDITIONS

After execution:

state_snapshot must include:

- Model created
- Migration created
- Relations applied
- Controller exists
- Service exists
- Routes registered
- Frontend pages created
- Navigation updated

---

# FAILURE SCENARIOS

Fail if:

- Relation conflict
- Route collision
- Duplicate migration
- Missing service layer
- Missing validation class
- Unprotected route when protected = true

On failure → pass structured report to Recovery.

---

# SECURITY REQUIREMENTS

- No raw SQL
- No business logic inside controller
- No missing validation
- No exposed sensitive fields
- No unprotected sensitive endpoints

---

# OUTPUT CONTRACT (STRICT)

{
  "status": "success | failed",
  "module_created": "",
  "components": {
    "migration": "",
    "model": "",
    "service": "",
    "controller": "",
    "routes": [],
    "frontend_pages": []
  },
  "warnings": []
}
