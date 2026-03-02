# COMMAND TOOL — Secure Command Execution (V2 Updated)

## Purpose

Command Tool executes shell commands safely inside:

WORKSPACE:
C:\agent-sandbox\workspace\

No command execution allowed outside workspace.

All command execution MUST pass through validation layer.

---

# ROOT STRUCTURE

ROOT_BASE:
C:\agent-sandbox\

WORKSPACE:
C:\agent-sandbox\workspace\

LOG DIRECTORY:
C:\agent-sandbox\.logs\

---

# WORKING DIRECTORY RULE (MANDATORY)

All commands must execute with:

working_directory = WORKSPACE

No dynamic directory switching allowed.

Commands attempting to change directory are rejected.

---

# COMMAND VALIDATION RULES

Before execution:

1. Reject if contains:
   - &&
   - ||
   - |
   - ;
   - >
   - <
2. Reject if contains ".."
3. Reject if contains absolute paths:
   - C:\
   - D:\
   - / (root reference)
4. Reject if contains system directories:
   - Windows
   - System32
   - Users
   - Program Files

If any rule violated → STOP immediately.

---

# WHITELIST (STRICT MATCH)

Allowed base commands:

- composer
- php
- php artisan
- npm
- node
- git
- mkdir
- touch

Command must start with one of the above.

If not exact prefix match → STOP.

---

# EXECUTION PROTOCOL

1. Validate command string
2. Confirm base command is whitelisted
3. Set working directory to WORKSPACE
4. Execute
5. Capture:
   - stdout
   - stderr
6. Log result
7. Return structured output

No retries allowed.

---

# LOGGING FORMAT

{
  "command": "",
  "working_directory": "C:\\agent-sandbox\\workspace\\",
  "status": "success | failed",
  "stdout": "",
  "stderr": "",
  "timestamp": ""
}

Logs stored in:

C:\agent-sandbox\.logs\

---

# FAILURE HANDLING

If execution fails:

- Return structured failure object
- Do NOT auto-retry
- Do NOT attempt fallback command
- Pass error to Executor

---

# OUTPUT FORMAT (STRICT)

{
  "status": "success | failed",
  "stdout": "",
  "stderr": ""
}

---

# SAFETY RULES

- Never escalate privileges
- Never allow chained commands
- Never execute destructive OS command
- Never modify system-level directories
- Never change working directory

Command Tool = Controlled Shell Gateway.