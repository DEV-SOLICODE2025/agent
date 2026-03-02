# Skill: Architecture Design

## Objective
Define the full technical architecture before implementation.

---

## Preconditions

- Analyse de Besoin validated.
- Domain Model validated.

If not validated → REFUSE execution.

---

## Actions

### Action 1: System Architecture Definition
- Define application type (Monolith / Modular Monolith).
- Define backend structure (Laravel).
- Define frontend structure (React).

---

### Action 2: Database Design
- Map entities to tables.
- Define primary keys.
- Define foreign keys.
- Define indexes.
- Define soft delete policy.

---

### Action 3: API Structure
- Define REST routes.
- Define controllers.
- Define service layer mapping.
- Define request validation classes.

---

### Action 4: Frontend Structure
- Define pages.
- Define reusable components.
- Define service layer (API integration).

---

### Action 5: Folder Structure Proposal

Must include:

backend/
  app/
    Services/
    Http/
    Models/
    Policies/
  routes/

frontend/
  src/
    components/
    pages/
    services/

docs/
  analysis/
  architecture/
  decisions/

---

## Output

Create:

docs/architecture/system-architecture.md

Must include:

- High-Level Architecture
- Database Structure
- API Map
- Frontend Structure
- Folder Structure

---

## STOP RULE

After generating system-architecture.md:
STOP execution and wait for developer validation.

No coding allowed.

---

Trace required:
Action executed: Architecture Design
Skill: architecture-design