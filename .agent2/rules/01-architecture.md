---
trigger: always_on
---

# Architecture Standards (Full Stack & Agent)

This document defines the architectural rules the agent must follow when designing any system.

---

## 1. Architecture Philosophy

- Prefer Clean Architecture principles.
- Separate concerns strictly (Controller ≠ Service ≠ Repository ≠ UI).
- Favor maintainability over short-term speed.
- Design for scalability from the beginning.

---

## 2. Backend Architecture (Laravel)

### 2.1 Layer Separation

Mandatory layers:

- Controller (HTTP layer)
- Service (Business logic)
- Model (Data layer)
- Policy / Gate (Authorization)
- Request (Validation)

Controllers must:
- Only receive request
- Validate input
- Call service
- Return response

No business logic inside controllers.

---

### 2.2 Folder Structure

backend/
  app/
    Http/
    Services/
    Models/
    Policies/
  database/
  routes/

Services folder must always exist.

---

### 2.3 API Design

- RESTful routes only.
- Use proper HTTP status codes.
- Consistent JSON response structure:

{
  "success": true,
  "data": {},
  "message": ""
}

- Validation errors must be structured.
- No inconsistent API shapes.

---

## 3. Frontend Architecture (React)

### 3.1 Layer Separation

- pages/ → route-level components
- components/ → reusable UI
- services/ → API logic
- hooks/ (optional) → shared logic

No API calls inside UI components directly.

---

### 3.2 Component Discipline

- Components must be small and reusable.
- No component > 250 lines.
- Avoid deeply nested logic.
- Extract repeated UI blocks.

---

## 4. Database Design

- Use proper foreign keys.
- Avoid nullable columns unless necessary.
- Use timestamps.
- Index searchable fields.
- Avoid unnecessary pivot tables.

---

## 5. Domain Modeling

Before coding:

- Identify Entities
- Identify Relationships
- Identify Business Rules
- Identify Edge Cases

Coding must not start before domain is clearly defined.

---

## 6. Scalability Mindset

- Avoid tight coupling.
- Design services to be testable.
- Avoid hardcoded values.
- Prepare for future feature extension.

---

## 7. Architectural Prohibitions

- No direct DB calls from frontend.
- No mixing responsibilities.
- No logic duplication between backend and frontend.
- No monolithic uncontrolled file.