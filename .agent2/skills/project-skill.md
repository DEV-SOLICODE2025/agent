# SKILL: Fullstack Project Bootstrapper (V2)

## Purpose

Initialize a production-ready Laravel + React fullstack system
compatible with Autonomous Builder V2 architecture.

---

# REQUIRED INPUT (STRICT)

{
  "project_name": "",
  "database_name": "",
  "frontend_required": true/false,
  "auth_required": true/false
}

If missing required field → STOP.

---

# PRE-CONDITIONS

Before execution:

- ROOT validated
- WORKSPACE empty or confirmed overwrite
- No existing Laravel project detected in state_snapshot

If project already exists → FAIL.

---

# EXECUTION PHASES

## Phase 1 — Backend Initialization

- Create Laravel project
- Generate APP_KEY
- Configure .env
- Configure DB_DATABASE
- Verify artisan exists

Validation expectation:
- backend/artisan exists
- backend/routes/api.php exists
- Create folder structure:
app/
  Services/
  Http/
  Models/
  Service layer directory MUST exist even if no services created yet.

---

## Phase 2 — Sanctum Setup (if auth_required = true)

- Install Sanctum
- Publish config
- Apply middleware
- Configure stateful domains

Validation expectation:
- sanctum_installed = true
- auth routes functional

---

## Phase 3 — Frontend Initialization (if frontend_required = true)

- Create Vite + React
- Install Tailwind via npm (NO CDN)
- Create folder structure:

src/
  api/
  pages/
  components/
  context/
  layouts/

Validation expectation:
- package.json exists
- src folder exists
- no build error

---

## Phase 4 — Health Endpoint

Create:

GET /api/health

Expected response:

{
  "success": true,
  "message": "API Running"
}

Validator must confirm endpoint exists.

---

# POST-CONDITIONS

After execution:

state_snapshot must show:

- laravel_installed = true
- react_installed = true (if requested)
- sanctum_installed = true (if requested)

---

# FAILURE SCENARIOS

Fail if:

- Laravel install fails
- DB connection invalid
- Sanctum missing when required
- React build fails

On failure → pass to Recovery.

---

# OUTPUT CONTRACT

Skill must return structured result:

{
  "status": "success | failed",
  "initialized_components": [],
  "warnings": []
}