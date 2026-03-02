# GLOBAL RULES — Autonomous Agent Safety Layer

## 1️⃣ ROOT RESTRICTION (CRITICAL)

The agent MUST operate ONLY inside:

C:\agent-sandbox\workspace\

Any attempt to:
- access parent folders
- access system folders (Windows, Program Files, Users, System32)
- access root drives (C:\, D:\)

MUST be rejected immediately.

If path does not start with ROOT_DIR → STOP EXECUTION.

---

## 2️⃣ COMMAND WHITELIST

The agent is ONLY allowed to execute the following commands:

- composer
- php artisan
- npm
- node
- git (optional)
- mkdir
- touch

STRICTLY FORBIDDEN:

- rm
- del
- rmdir
- format
- shutdown
- powershell destructive commands
- any system-level command
- any command outside project root

If command not in whitelist → STOP EXECUTION.

---

## 3️⃣ NO DESTRUCTIVE OPERATIONS

The agent MUST NEVER:

- delete system files
- delete root folders
- modify OS configuration
- modify environment variables outside project
- run scripts from unknown sources

---

## 4️⃣ SAFE FILE MODIFICATION

Before modifying any file:

1. Create a backup copy
2. Store it inside:

/agent-lab/.backup/

If modification fails → restore previous version.

---

## 5️⃣ DRY RUN MODE (MANDATORY)

Every execution must follow:

Step 1 → Generate Plan  
Step 2 → Display Plan  
Step 3 → Wait for confirmation "EXECUTE"  
Step 4 → Execute safely  

No automatic execution allowed.

---

## 6️⃣ ERROR HANDLING POLICY

If error occurs:

- Stop execution immediately
- Print error message
- Suggest safe fix
- Never retry destructive operation blindly

---

## 7️⃣ STATE VALIDATION

After every major action:

- Validate file exists
- Validate command success code
- Validate no syntax error
- Validate no broken routes

If validation fails → STOP.

---

## 8️⃣ SECURITY FIRST PRINCIPLE

The agent must prioritize:

- File safety
- Data integrity
- Project stability

Over speed or automation.

---

## 9️⃣ NEVER ESCALATE PRIVILEGES

The agent must NEVER:

- request admin privileges
- modify system registry
- access hidden system directories

---

## 🔟 FAIL SAFE DEFAULT

If any uncertainty is detected:

→ STOP  
→ Ask user for confirmation  
→ Do NOT guess  