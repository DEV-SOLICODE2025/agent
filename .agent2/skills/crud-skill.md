# SKILL: CRUD Module Generator (Laravel + React) — V2

## Purpose

Generate a fully structured CRUD module including:

- Database schema
- Eloquent Model
- API Controller
- Routes
- Validation
- Auth protection (optional)
- React Pages
- API integration
- Standard response contract

Fully compatible with Autonomous Builder V2.

---

# REQUIRED INPUT (STRICT)

{
  "model_name": "",
  "fields": [
    {
      "name": "",
      "type": "string | text | integer | decimal | boolean | date | foreignId",
      "nullable": true/false,
      "unique": true/false
    }
  ],
  "protected": true/false,
  "with_relations": true/false
}

If missing model_name or fields → STOP.

---

# PRE-CONDITIONS

Before execution:

- Laravel installed
- Database configured
- Model does NOT already exist
- Table does NOT already exist

If model exists → FAIL.
If table exists → FAIL.

---

# EXECUTION PHASES

## Phase 1 — Database Migration

- Create migration file
- Define schema based on fields
- Apply nullable/unique rules
- Add timestamps

If foreignId detected:
- Require relation-skill to handle properly

Validator must confirm migration file exists.

---

## Phase 2 — Model Creation

- Create Eloquent Model
- Define $fillable
- Add relationships if with_relations = true
- No guarded = *

No raw SQL allowed.

---

## Phase 3 — API Controller

Create:

GET    /api/{models}
GET    /api/{models}/{id}
POST   /api/{models}
PUT    /api/{models}/{id}
DELETE /api/{models}/{id}

Apply:

- auth:sanctum if protected = true
- Request validation class

---

## Phase 4 — Validation Rules

Map types:

string → required|string|max:255  
text → nullable|string  
integer → required|integer  
decimal → required|numeric  
boolean → required|boolean  
date → required|date  

Must use Form Request class.
No inline validation in controller.

---

## Phase 5 — Standard API Response

All endpoints must return:

{
  "success": boolean,
  "data": {},
  "message": "",
  "errors": {}
}

Validator must enforce format.

---

## Phase 6 — Frontend Integration (if React detected)

Create folder:

frontend/src/pages/{ModelName}/

Files:

- List.jsx
- Create.jsx
- Edit.jsx
- Form.jsx

Features:

- Axios API integration
- Loading state
- Error handling
- Delete confirmation
- Redirect after create/update

If protected = true → wrap with ProtectedRoute.

---

# POST-CONDITIONS

After execution:

state_snapshot must include:

- model exists
- controller exists
- routes registered
- table migration created
- frontend pages exist (if React)

---

# FAILURE SCENARIOS

Fail if:

- Duplicate migration detected
- Duplicate route detected
- Invalid field type
- Missing validation class
- Auth middleware missing when required
- Foreign key without relation definition

On failure → send structured report to Recovery.

---

# SECURITY REQUIREMENTS

- No raw SQL
- No mass assignment vulnerability
- No unprotected route when protected = true
- No missing validation

---

# OUTPUT CONTRACT (STRICT)

{
  "status": "success | failed",
  "created_components": {
    "migration": "",
    "model": "",
    "controller": "",
    "routes": [],
    "frontend_pages": []
  },
  "warnings": []
}