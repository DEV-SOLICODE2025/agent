# WORKFLOW: /extend-module

## Purpose

Extend an existing module without rebuilding it.

Supports:

- Adding new fields
- Adding new relationships
- Adding search & sort
- Enabling pagination
- Adding new endpoint
- Updating frontend pages

Fully incremental and non-destructive.

---

# REQUIRED INPUT (STRICT)

{
  "module_name": "",
  "add_fields": [],
  "add_relations": [],
  "enable_pagination": true/false,
  "add_searchable_fields": [],
  "add_sortable_fields": []
}

If module_name missing → STOP.

---

# EXECUTION FLOW

## Step 1 — State Snapshot

Call State Engine.

Verify:

- Model exists
- Controller exists
- Migration exists
- Routes exist

If module not found → FAIL.

---

## Step 2 — Field Extension

If add_fields not empty:

- Generate new migration
- Add new columns
- Update Model $fillable
- Update FormRequest validation
- Update Service logic if needed

Never modify existing migration file.

Validator must confirm:

- New migration created
- No duplicate column
- Validation updated

---

## Step 3 — Relation Extension

If add_relations not empty:

Call relation-skill.

Ensure:

- Foreign key not duplicated
- Proper Eloquent method added
- No circular dependency

---

## Step 4 — API Update

If searchable_fields provided:

- Update index endpoint logic
- Add search query builder logic

If sortable_fields provided:

- Add orderBy support
- Validate allowed sort fields

If enable_pagination = true:

- Add paginate() support
- Update response meta

All changes must respect original API response format.

---

## Step 5 — Frontend Update

If React detected:

- Update Form.jsx
- Update List.jsx
- Add new input fields
- Add search UI if enabled
- Add sort UI if enabled
- Update validation display

No breaking UI allowed.

---

## Step 6 — Validation Phase

Call Validator.

If failed:
→ Send failure to Recovery.
→ Await confirmation.

---

## SAFETY RULES

- Never delete existing column
- Never modify original migration
- Never remove existing route
- Never break API contract
- Always create incremental migration

---

# OUTPUT FORMAT

{
  "status": "completed | failed",
  "extended_module": "",
  "changes_applied": [],
  "warnings": [],
  "next_possible_actions": []
}