# STATE ENGINE — Project Awareness Layer (V2 Improved)

## Purpose

The State Engine is responsible for:

- Reading the real project structure
- Extracting actual backend components
- Extracting actual frontend components
- Detecting database schema state
- Providing structured, reliable data to the Planner

The State Engine is READ-ONLY.
It must NEVER modify files.
It must NEVER guess missing data.

---

# ROOT RESTRICTION

State Engine can ONLY read inside:

C:\projects\agent-lab\

Before reading any path:

- Normalize path
- Resolve absolute path
- Ensure it starts with ROOT_DIR

If not → STOP.

---

# Detection Strategy (MANDATORY)

State detection must rely ONLY on filesystem inspection.

No assumptions allowed.

---

## 1️⃣ Backend Detection (Laravel)

Detect Laravel installation by verifying:

- backend/artisan exists
- backend/composer.json exists
- backend/routes/api.php exists

If missing → laravel_installed = false

---

### Extract Models

Read directory:

backend/app/Models/

Extract all filenames ending with `.php`
Return model names without extension.

---

### Extract Controllers

Read directory:

backend/app/Http/Controllers/

Extract filenames.

---

### Extract API Routes

Parse:

backend/routes/api.php

Extract route definitions:
- GET
- POST
- PUT
- DELETE

Return structured list.

---

### Detect Sanctum

Check:

- composer.json contains "laravel/sanctum"
- config/sanctum.php exists

Return sanctum_installed = true/false

---

## 2️⃣ Frontend Detection (React)

Detect React by verifying:

- frontend/package.json exists
- frontend/src exists

---

### Extract Pages

Read:

frontend/src/pages/

Return folder names.

---

### Detect Auth Context

Check if exists:

frontend/src/context/AuthContext.jsx

Return auth_context = true/false

---

### Detect API Layer

Check if exists:

frontend/src/api/

Return api_layer_exists = true/false

---

## 3️⃣ Database Detection

Read:

backend/database/migrations/

Extract table names from migration filenames:

Example:
2024_01_01_create_products_table.php

Extract: products

Return list of tables.

---

## 4️⃣ Environment Validation

Check existence of:

- backend/.env
- APP_KEY present
- DB_DATABASE set
- APP_DEBUG value

Do NOT read sensitive credentials.
Only detect presence.

---

# Output Format (STRICT)

State Engine MUST return:

{
  "backend": {
    "laravel_installed": true/false,
    "models": [],
    "controllers": [],
    "routes": [],
    "sanctum_installed": true/false
  },
  "frontend": {
    "react_installed": true/false,
    "pages": [],
    "auth_context": true/false,
    "api_layer_exists": true/false
  },
  "database": {
    "tables": []
  },
  "environment": {
    "env_exists": true/false,
    "app_key_present": true/false,
    "debug_mode": true/false
  },
  "risks_detected": []
}

---

# Safety Rules

- Never assume missing files.
- If folder unreadable → add to risks_detected.
- Never modify files.
- Never execute commands.

State Engine = Awareness Only.