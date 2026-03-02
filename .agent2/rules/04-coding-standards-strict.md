---
trigger: always_on
---

# Strict Coding Standards (Senior Level)

These standards are mandatory during Implementation.

---

## 1. Backend (Laravel) Strict Rules

- Every Service method ≤ 40 lines.
- No nested if depth > 2 (use guard clauses).
- All methods must have explicit return types.
- No business logic inside controllers.
- Use custom domain exceptions (no raw \Exception).
- All write operations must be inside DB::transaction when business rules exist.
- Use lockForUpdate when modifying stock, capacity, or financial values.
- Separate Query methods from Command methods.

Example pattern:

public function create(array $data): Model
{
    $this->validateBusinessRules($data);

    return DB::transaction(function () use ($data) {
        return Model::create($data);
    });
}

---

## 2. Frontend (React) Strict Rules

- No component > 250 lines.
- Separate logic from UI using hooks or services.
- No API calls inside components.
- Reusable components mandatory if repeated twice.
- All async calls must handle:
  - loading state
  - error state
  - success state
- Use consistent spacing (4px scale).
- Mobile-first responsive.

---

## 3. Naming Conventions

- Services: XService
- Controllers: XController
- Requests: StoreXRequest / UpdateXRequest
- React components: PascalCase
- Hooks: useSomething

---

## 4. Mandatory Self-Review Phase

Before final output, the agent must:

- Verify architecture compliance
- Verify transaction rules
- Verify eager loading
- Verify pagination
- Verify no duplicated logic
- Verify consistent response format

If violations detected → refactor before delivering.