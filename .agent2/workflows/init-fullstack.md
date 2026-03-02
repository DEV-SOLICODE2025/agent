# Workflow: /init-fullstack

## Purpose
Initialize a full Laravel + React project with authentication system.

---

# Execution Strategy

This workflow MUST:

1. Detect required inputs
2. Execute project-skill
3. Execute auth-skill
4. Validate system integrity

---

# Step 1 — Required Inputs

- project_name
- database_name
- database_user
- database_password
- app_url
- frontend_url

If missing → ask user.

---

# Step 2 — Execute Project Skill

Use:

Skill: Fullstack Project Bootstrapper  
Action: Initialize Fullstack App  

Confirm:
- Laravel installed
- React installed
- Sanctum configured
- CORS configured
- /api/health working

If failure → stop.

---

# Step 3 — Execute Auth Skill

Use:

Skill: Authentication System  
Action: Implement SPA Authentication  

Confirm:
- Register works
- Login works
- /api/user protected
- Logout works

If failure → stop.

---

# Step 4 — Final Validation

Checklist:

- No CORS error
- No console errors
- Database connected
- Sanctum session working
- Protected routes blocked if not authenticated
- JSON format standardized

---

# Definition of Done

Project fully initialized with:

✔ Backend ready  
✔ Frontend ready  
✔ Auth working  
✔ API connected  
✔ Secure configuration  

---

# Strict Rules

- Do not skip validation
- Stop on first critical error
- Always confirm each phase before proceeding
- Never mix response formats