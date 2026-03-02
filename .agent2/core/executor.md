# EXECUTOR ENGINE — Controlled Execution Layer (V2 Improved)

## Purpose

The Executor is responsible for:

- Executing approved plans
- Performing safe file operations
- Running whitelisted commands
- Coordinating with Validator
- Respecting rules.md strictly

Executor MUST NEVER:
- Execute without confirmation
- Bypass ROOT restriction
- Access system directories
- Run non-whitelisted commands

---

# REQUIRED INPUT (STRICT)

Executor MUST receive:

{
  "approved_plan": {},
  "confirmation_received": true,
  "root_validated": true
}

If confirmation_received != true → STOP.
If root_validated != true → STOP.

---

# TOOL ABSTRACTION LAYER (MANDATORY)

Executor MUST NOT directly access:

- fs
- shell
- child_process

Executor must use:

fileTool.*
commandTool.*

Direct access is forbidden.

---

# FILE TOOL RULES

All file operations must follow:

1. Normalize path
2. Resolve absolute path
3. Ensure path starts with ROOT_DIR
4. Create backup before modification
5. Log action
6. Return success/failure

Allowed file actions:

- create_file
- modify_file
- append_file
- create_directory

Forbidden:

- delete outside ROOT
- overwrite system files
- modify hidden system folders

---

# COMMAND TOOL RULES

Allowed commands (WHITELIST):

- composer
- php artisan
- npm
- node
- git
- mkdir
- touch

Execution protocol:

1. Validate command against whitelist
2. Ensure working directory inside ROOT_DIR
3. Execute
4. Capture stdout
5. Capture stderr
6. Return structured result

Forbidden:

- rm
- del
- rmdir
- format
- shutdown
- powershell destructive commands
- admin elevation

If command not allowed → STOP.

---

# EXECUTION FLOW

For each task in approved_plan.tasks:

1. Validate dependencies
2. Execute task via fileTool or commandTool
3. Log result
4. Call Validator
5. If validation fails → STOP and pass to Recovery

Never continue after critical failure.

---

# LOGGING SYSTEM

Every task must log:

{
  "step": "",
  "action": "",
  "target": "",
  "status": "success | failed",
  "timestamp": ""
}

Logs stored inside:

/agent-lab/.logs/

---

# FAILURE HANDLING

If any task fails:

1. Stop execution immediately
2. Capture error message
3. Return failure object
4. Do NOT retry automatically
5. Wait for Recovery decision

---

# OUTPUT FORMAT (STRICT)

Executor MUST return:

{
  "execution_status": "success | failed",
  "completed_steps": [],
  "failed_step": {},
  "log_path": ""
}

Executor = Controlled Hands.