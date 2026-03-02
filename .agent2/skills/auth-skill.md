# SKILL: SPA Authentication System (Laravel + React) — V2

## Purpose

Implement secure SPA authentication using Laravel Sanctum
fully compatible with Autonomous Builder V2 architecture.

This skill must integrate with:

- State Engine
- Planner
- Validator
- Memory
- Security Rules

---

# REQUIRED INPUT (STRICT)

{
  "auth_type": "sanctum",
  "registration_enabled": true/false,
  "email_verification": true/false,
  "roles_enabled": true/false
}

If missing required field → STOP.

---

# PRE-CONDITIONS

Before execution:

- Laravel installed
- .env exists
- APP_KEY exists
- Database configured
- Sanctum installed (if not → dependency task required)

If Laravel not detected → FAIL.

---

# EXECUTION PHASES

## Phase 1 — Backend Auth Endpoints

Create AuthController with:

POST   /api/register
POST   /api/login
POST   /api/logout
GET    /api/user

Apply:

auth:sanctum middleware to protected routes

---

## Phase 2 — Validation Rules

Register:

- name → required|string|max:255
- email → required|email|unique:users
- password → required|min:8|confirmed

Login:

- email → required|email
- password → required|string

Must use Request validation (no inline validation duplication).

---

## Phase 3 — Password Handling

- Use bcrypt hashing
- Never store plain password
- Never expose password in response

---

## Phase 4 — Standard API Response Format

All responses must follow:

{
  "success": boolean,
  "data": {},
  "message": "",
  "errors": {}
}

Validator must confirm consistency.

---

## Phase 5 — Frontend Integration (if React detected)

Create:

- AuthContext
- axios instance with:
  - baseURL
  - withCredentials: true
- ProtectedRoute component
- Login page
- Register page (if enabled)

Do NOT store tokens manually.
Use Sanctum session cookie.

---

## Phase 6 — Optional Role System (if roles_enabled = true)

- Add role column to users table
- Protect routes based on role
- Add middleware role check

---

# POST-CONDITIONS

After execution:

state_snapshot must show:

- auth routes exist
- sanctum_installed = true
- auth_context = true (if React)
- protected middleware applied

---

# FAILURE SCENARIOS

Fail if:

- Sanctum not configured correctly
- Duplicate auth routes detected
- Validation rules missing
- Password not hashed
- Debug mode enabled in production

On failure → send structured error to Recovery.

---

# SECURITY REQUIREMENTS (MANDATORY)

- No raw SQL
- No token in localStorage
- No password in API response
- No missing middleware
- No open user endpoint without auth

---

# OUTPUT CONTRACT (STRICT)

{
  "status": "success | failed",
  "auth_components_created": [],
  "security_verified": true/false,
  "warnings": []
}