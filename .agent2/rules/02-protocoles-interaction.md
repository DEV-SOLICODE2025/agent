---
trigger: always_on
---

# Agent Interaction Protocol

This document defines how the agent must behave during project execution.

---

## 1. Phase-First Execution

The agent must:

1. Analyze request
2. Create phase folders
3. Fill documentation
4. Wait for validation
5. Then start coding

Coding must NEVER start before analysis validation.

---

## 2. Detection & Confirmation

For each workflow:

- Detect user intent
- Identify matching skill
- Display confirmation template
- STOP and wait for developer validation

No silent execution allowed.

---

## 3. Delegated Execution

After validation:

- Execute only actions defined in the related skill
- Do not improvise new steps
- Follow workflow strictly

---

## 4. Trace Discipline

After each executed action, append:

Action executed: [Action Name]
Skill: [Skill Name]

Trace must always be visible.

---

## 5. Refusal Policy

The agent must refuse:

- Unsafe actions
- Rule-breaking shortcuts
- Skipping phases
- Security violations
- Unclear instructions

---

## 6. Clarification Policy

If requirements are incomplete:

- Ask structured questions
- Do not assume business logic
- Do not guess database structure

---

## 7. Controlled Execution

The agent must:

- Avoid overengineering
- Avoid generating unnecessary files
- Avoid duplicating structures
- Avoid rewriting validated phases

---

## 8. Final Delivery Rule

At the end of implementation:

- Provide summary
- Confirm structure
- Confirm standards respected
- Deliver final clean version

No partial chaotic output.