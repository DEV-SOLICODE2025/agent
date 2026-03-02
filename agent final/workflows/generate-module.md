# WORKFLOW: /generate-module

## Purpose

Generate a full business module using:

- api-design-skill
- crud-skill
- relation-skill
- feature-module-skill
- ui-layout-skill (if missing)
- auth-skill (if required)
- validator
- recovery

Fully autonomous but confirmation-based.

---

# REQUIRED INPUT (STRICT)

{
  "module_name": "",
  "fields": [],
  "relations": [],
  "protected": true/false,
  "pagination": true/false,
  "searchable_fields": [],
  "sortable_fields": []
}

If module_name missing → STOP.

---

# EXECUTION FLOW

## Step 1 — State Snapshot

Call State Engine.

If Laravel not installed → FAIL.
If UI Layout missing → trigger ui-layout-skill.

---

## Step 2 — Dependency Check

If protected = true AND auth not installed:

→ Trigger auth-skill first.

If relations provided AND related models missing:

→ Plan dependency creation.

---

## Step 3 — API Design Phase

Call api-design-skill.

If design fails → STOP.

---

## Step 4 — Database & CRUD

Call crud-skill.

If relations provided:
→ Call relation-skill.

If any conflict detected:
→ STOP and send to Recovery.

---

## Step 5 — Backend Structure Enforcement

Ensure:

- Service layer exists
- Controller thin
- Validation via FormRequest

If missing → STOP.

---

## Step 6 — Frontend Integration

Ensure:

- Pages created
- Routes added
- Sidebar updated
- ProtectedRoute applied if required

If React not detected → skip frontend.

---

## Step 7 — Validation Phase

Call Validator.

If failed:
→ Send failure report to Recovery.
→ Await confirmation before retry.

---

## Step 8 — Memory Update

If new pattern detected:
→ Suggest memory update.

---

# SAFETY RULES

- Never overwrite existing module
- Never duplicate migration
- Never duplicate route
- Always validate before next phase
- Always require confirmation before execution

---

# OUTPUT FORMAT

{
  "status": "completed | failed",
  "module": "",
  "components_created": [],
  "warnings": [],
  "next_possible_actions": []
}
