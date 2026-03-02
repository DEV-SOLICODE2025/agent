# WORKFLOW: /init-project

## Purpose

Initialize a new fullstack project (Laravel + React)
inside the sandbox workspace with proper structure,
security configuration, and base architecture.

This workflow prepares a clean production-ready foundation.

Uses:

- state-engine
- project-skill
- ui-layout-skill
- auth-skill (optional)
- validator
- memory

---

# REQUIRED INPUT (STRICT)

{
  "project_name": "",
  "database_name": "",
  "include_frontend": true/false,
  "include_auth": true/false,
  "layout_type": "dashboard | public | hybrid"
}

If project_name or database_name missing → STOP.

---

# EXECUTION FLOW

## Step 1 — Workspace Validation

Call State Engine.

Verify:

- Workspace empty OR
- Explicit overwrite confirmation received

If existing project detected → FAIL.

---

## Step 2 — Project Bootstrap

Call project-skill:

- Install Laravel
- Configure .env
- Set DB_DATABASE
- Generate APP_KEY
- Verify artisan works

If include_frontend = true:
- Initialize React (Vite)
- Install Tailwind via npm
- Setup folder structure

---

## Step 3 — Layout Initialization

If include_frontend = true:

Call ui-layout-skill with:

{
  "layout_type": layout_type,
  "auth_required": include_auth,
  "sidebar_enabled": true,
  "theme": "light"
}

Ensure layout created before feature modules.

---

## Step 4 — Authentication Setup (Optional)

If include_auth = true:

Call auth-skill.

Ensure:

- Sanctum installed
- Auth routes created
- ProtectedRoute exists (frontend)
- Middleware applied

---

## Step 5 — Health Endpoint

Ensure:

GET /api/health

Returns:

{
  "success": true,
  "message": "API Running"
}

Validator must confirm endpoint works.

---

## Step 6 — Validation Phase

Call Validator.

Ensure:

- Laravel installed
- React installed (if requested)
- Auth working (if requested)
- No broken build
- No debug mode exposed

If failure:
→ Send to Recovery.
→ Await confirmation.

---

# SAFETY RULES

- Never overwrite existing project silently
- Never expose debug mode in production
- Never skip environment validation
- Never skip APP_KEY generation
- Never skip DB configuration

---

# OUTPUT FORMAT

{
  "status": "completed | failed",
  "project_name": "",
  "components_initialized": [],
  "warnings": [],
  "next_possible_actions": []
}
