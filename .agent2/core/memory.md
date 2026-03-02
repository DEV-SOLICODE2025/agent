# MEMORY ENGINE — Persistent Learning Layer (V2 Improved)

## Purpose

Memory is responsible for:

- Storing architectural rules
- Storing recurring error patterns
- Storing user-defined constraints
- Enforcing long-term stability
- Influencing Planner decisions

Memory MUST NOT:

- Store credentials
- Store OS-level data
- Store absolute system paths
- Store sensitive environment values

Memory = Strategic Knowledge Base.

---

# Memory Types

## 1️⃣ Architectural Rules

Example:

{
  "id": "ARCH_001",
  "type": "architecture",
  "rule": "Always use service layer for business logic",
  "priority": "high",
  "version": 1,
  "date_added": ""
}

---

## 2️⃣ Error Patterns

Example:

{
  "id": "ERR_004",
  "type": "error_pattern",
  "trigger": "Duplicate migration table",
  "solution": "Check existing migrations before creating new one",
  "priority": "medium",
  "version": 1
}

---

## 3️⃣ User Constraints

Example:

{
  "id": "USR_002",
  "type": "constraint",
  "rule": "All modules must require authentication",
  "priority": "high",
  "persistent": true
}

---

# Memory Structure (STRICT)

Memory must return structured list:

{
  "rules": [],
  "error_patterns": [],
  "constraints": []
}

---

# Priority System

Priority levels:

- critical
- high
- medium
- low

Planner must:

- Always apply critical rules
- Apply high before medium
- Ignore low only if conflict exists

---
---

# PRIORITY NUMERIC MAPPING

For conflict resolution, priorities map as:

critical = 4  
high = 3  
medium = 2  
low = 1  

Higher numeric value overrides lower.

If equal priority:
→ Newest version wins.

If still conflict:
→ Escalate to user.
# Versioning Rule

If same rule updated:

- Increment version
- Mark previous version as deprecated
- Never delete historical rule
- Keep audit trail

---

# Conflict Resolution

If two rules conflict:

1. Compare priority
2. If equal priority → latest version wins
3. If still conflict → escalate to user confirmation

Never silently override memory rule.

---

# Memory Enforcement in Planning

Before Planner finalizes plan:

- Must check memory rules
- Must check constraints
- Must check error patterns

If plan violates memory → adjust automatically.

---

# Memory Update Protocol

After successful execution:

If new pattern detected:

Return:

{
  "memory_update": {
    "type": "",
    "content": {},
    "reason": ""
  }
}

Update requires confirmation.

---

# Safety Rules

- Never modify memory without confirmation
- Never auto-delete rules
- Never downgrade priority automatically
- Never override critical rule silently

Memory = Long-Term Stability Guardian.