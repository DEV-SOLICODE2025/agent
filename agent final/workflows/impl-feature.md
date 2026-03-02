# WORKFLOW: /impl-feature

## Purpose

Implement a new feature inside an existing module
without rebuilding the module.

Supports:

- New endpoint
- Custom action (approve, cancel, publish, etc.)
- Status transitions
- Bulk operations
- Export / import
- Custom query logic
- UI feature enhancement

Uses:

- state-engine
- api-design-skill
- refactor-skill
- validator
- recovery
- memory

---

# REQUIRED INPUT (STRICT)

{
  "module_name": "",
  "feature_name": "",
  "feature_type": "endpoint | status-change | bulk-action | export | custom-logic",
  "protected": true/false,
  "update_frontend": true/false
}

If module_name or feature_name missing → STOP.

---

# EXECUTION FLOW

## Step 1 — State Snapshot

Call State Engine.

Verify:

- Module exists
- Model exists
- Controller exists
- Routes registered

If module not found → FAIL.

---

## Step 2 — Feature Design Phase

Call api-design-skill (feature mode).

Define:

- New endpoint path
- HTTP method
- Request validation schema
- Response format
- Middleware requirement

Ensure no route conflict.

---

## Step 3 — Backend Implementation

Depending on feature_type:

### endpoint
- Add new controller method
- Add new route
- Add validation
- Delegate logic to Service

### status-change
- Add status field (if missing via extend-module logic)
- Add transition logic in Service
- Validate allowed transitions

### bulk-action
- Accept array of IDs
- Validate existence
- Wrap inside DB transaction

### export
- Generate export service
- Stream response
- Prevent heavy memory usage

### custom-logic
- Implement logic inside Service layer
- Keep controller thin

No business logic allowed in controller.

---

## Step 4 — Frontend Update (if update_frontend = true)

- Add button/action in List.jsx
- Add confirmation modal (if destructive)
- Handle loading state
- Handle error response
- Update UI state after success

Never duplicate API call logic.
Always use centralized api layer.

---

## Step 5 — Validation Phase

Call Validator.

Ensure:

- Route exists
- Middleware applied if protected = true
- No duplicate endpoint
- No broken existing functionality
- Response format consistent

If failed:
→ Send to Recovery.
→ Await confirmation.

---

# SAFETY RULES

- Never modify existing endpoint behavior silently
- Never remove validation
- Never break API contract
- Always use Service layer
- Always validate state transition logic

---

# OUTPUT FORMAT

{
  "status": "completed | failed",
  "feature": "",
  "endpoint_added": "",
  "frontend_updated": true/false,
  "warnings": [],
  "next_possible_actions": []
}
