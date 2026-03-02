# SKILL: API Design & Contract Architect (Laravel) — V2

## Purpose

Design a consistent, secure, and scalable REST API contract
before implementation.

This skill defines:

- Endpoints
- HTTP methods
- Request schema
- Response schema
- Validation rules
- Middleware requirements
- Error handling strategy

Fully compatible with Autonomous Builder V2.

---

# REQUIRED INPUT (STRICT)

{
  "resource_name": "",
  "fields": [],
  "protected": true/false,
  "pagination": true/false,
  "searchable_fields": [],
  "sortable_fields": []
}

If resource_name missing → STOP.

---

# PRE-CONDITIONS

Before execution:

- Laravel must be installed
- routes/api.php must exist
- No conflicting base route for resource

If route conflict detected → FAIL.

---

# PHASE 1 — Endpoint Design

Define endpoints:

GET    /api/{resource}
GET    /api/{resource}/{id}
POST   /api/{resource}
PUT    /api/{resource}/{id}
DELETE /api/{resource}/{id}

If pagination = true:
GET /api/{resource}?page=1&per_page=10

If searchable_fields defined:
GET /api/{resource}?search=keyword

If sortable_fields defined:
GET /api/{resource}?sort=field&direction=asc|desc

---

# PHASE 2 — Request Schema Design

For POST & PUT:

Define validation schema based on field types.

Rules must be compatible with FormRequest.

No inline validation in controller.

---

# PHASE 3 — Response Contract (STRICT)

All endpoints must return:

Success:

{
  "success": true,
  "data": {},
  "message": "",
  "meta": {}
}

Error:

{
  "success": false,
  "message": "",
  "errors": {}
}

If pagination enabled:

meta must include:

{
  "current_page": "",
  "last_page": "",
  "per_page": "",
  "total": ""
}

---

# PHASE 4 — Middleware Strategy

If protected = true:

- Apply auth:sanctum
- Optionally apply role middleware

Public endpoints must NEVER expose sensitive data.

---

# PHASE 5 — Error Handling Policy

Standardize:

- 200 OK
- 201 Created
- 404 Not Found
- 422 Validation Error
- 401 Unauthorized
- 403 Forbidden

Never return raw exception messages.

Never expose stack traces.

---

# PHASE 6 — Rate Limiting Strategy

If resource sensitive:

- Apply throttle middleware
- Define reasonable limit

---

# POST-CONDITIONS

After design:

- API contract documented
- Routes consistent
- No conflicting endpoints
- Middleware properly defined

---

# FAILURE SCENARIOS

Fail if:

- Route collision detected
- Invalid HTTP method mapping
- Inconsistent response format
- Missing validation rules

On failure → pass to Recovery.

---

# SECURITY REQUIREMENTS

- No raw SQL exposure
- No mass assignment vulnerability
- No unprotected sensitive endpoints
- No debug exception exposure

---

# OUTPUT CONTRACT (STRICT)

{
  "status": "success | failed",
  "designed_endpoints": [],
  "middleware_applied": [],
  "pagination_enabled": true/false,
  "warnings": []
}
