# FILE TOOL — Secure Filesystem Abstraction (V2 Updated)

## Purpose

File Tool provides secure file operations strictly inside:

C:\agent-sandbox\workspace\

All file operations MUST pass through Path Validator.

No direct filesystem access allowed.

---

# ROOT STRUCTURE

ROOT_BASE:
C:\agent-sandbox\

WORKSPACE:
C:\agent-sandbox\workspace\

BACKUP DIRECTORY:
C:\agent-sandbox\.backup\

LOG DIRECTORY:
C:\agent-sandbox\.logs\

Workspace is the ONLY writable zone.

---

# MANDATORY VALIDATION FLOW

Before any file operation:

1. Send path to Path Validator
2. If valid = false → STOP
3. Resolve absolute path
4. Continue operation

File Tool MUST NOT perform its own root logic.
It MUST rely on path-validator.

---

# Allowed Operations

- create_file(path, content)
- modify_file(path, content)
- append_file(path, content)
- create_directory(path)
- read_file(path)

Deletion is NOT allowed in V2.

---

# Backup Policy (MANDATORY)

Before modify_file:

1. Create backup copy
2. Store in:

C:\agent-sandbox\.backup\

Format:

original_filename.timestamp.bak

If modification fails:
→ Restore backup
→ Log failure

---

# Logging Policy

Every operation must log:

{
  "operation": "",
  "relative_path": "",
  "absolute_path": "",
  "status": "success | failed",
  "timestamp": ""
}

Logs stored in:

C:\agent-sandbox\.logs\

---

# Safety Rules

- Never allow absolute path outside workspace
- Never allow parent navigation ".."
- Never overwrite system files
- Never operate outside workspace
- Never skip backup on modification

---

# Output Format (STRICT)

{
  "status": "success | failed",
  "message": "",
  "absolute_path": ""
}

File Tool = Workspace Gatekeeper.