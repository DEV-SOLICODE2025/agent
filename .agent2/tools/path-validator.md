# PATH VALIDATOR — Root Boundary Enforcement

## Purpose

Ensure all filesystem paths stay inside ROOT_DIR.

All tools must use this validator.

---

# ROOT

C:\agent-sandbox\workspace\

---

# Validation Rules

For every path:

1. Normalize path
2. Resolve absolute path
3. Reject if contains ".."
4. Reject if absolute path does NOT start with ROOT_DIR
5. Reject if path targets system directory

If any rule fails → STOP immediately.

---

# Example Rejection Cases

- C:\Windows\
- C:\Users\
- ..\..\system32
- D:\other-folder
- C:\

---

# Output Format

{
  "valid": true/false,
  "reason": ""
}

---

# Safety Rule

Path validation must occur BEFORE:

- File creation
- File modification
- Directory creation
- Command execution