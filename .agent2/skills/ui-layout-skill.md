# SKILL: UI Layout & Structure Architect (React + Tailwind) — V2

## Purpose

Design a scalable, maintainable React application structure
before implementing feature modules.

This skill defines:

- Folder architecture
- Layout system
- Route structure
- Protected routes
- Reusable components
- UI consistency rules

Fully compatible with Autonomous Builder V2.

---

# REQUIRED INPUT (STRICT)

{
  "layout_type": "dashboard | public | hybrid",
  "auth_required": true/false,
  "sidebar_enabled": true/false,
  "theme": "light | dark | system"
}

If layout_type missing → STOP.

---

# PRE-CONDITIONS

Before execution:

- React project must exist
- src directory must exist
- No conflicting layout already defined

If layout already exists → FAIL.

---

# PHASE 1 — Folder Architecture

Ensure structure:

src/
  api/
  components/
  context/
  hooks/
  layouts/
  pages/
  routes/
  utils/

No feature logic outside pages/.
No API logic outside api/.

---

# PHASE 2 — Layout System

Create:

layouts/MainLayout.jsx
layouts/AuthLayout.jsx (if auth_required = true)

MainLayout must include:

- Navbar
- Optional Sidebar
- Content wrapper
- Responsive structure
- Scroll handling

---

# PHASE 3 — Route Architecture

Create centralized routing:

routes/AppRoutes.jsx

Rules:

- Group protected routes
- Wrap protected routes with ProtectedRoute
- No inline route logic inside App.jsx

If auth_required = true:
- All dashboard routes protected

---

# PHASE 4 — ProtectedRoute Component

If auth_required = true:

Create:

components/ProtectedRoute.jsx

Must:

- Check auth context
- Redirect to login if unauthenticated
- Prevent flashing protected content

---

# PHASE 5 — UI Consistency Rules

Enforce:

- Tailwind via npm (no CDN)
- No inline styles
- Reusable Button component
- Reusable Input component
- Standard spacing scale (4px grid)
- No hardcoded colors (use theme)

---

# PHASE 6 — Theming Strategy

If theme = dark or system:

- Use Tailwind dark mode class strategy
- No manual CSS overrides
- Store theme in context (not localStorage directly)

---

# POST-CONDITIONS

After execution:

state_snapshot must reflect:

- Layout files exist
- Route structure exists
- ProtectedRoute exists (if required)
- No duplicated layout files

---

# FAILURE SCENARIOS

Fail if:

- React not installed
- Duplicate layout detected
- Route conflict detected
- Missing auth context when auth_required = true

On failure → pass to Recovery.

---

# SECURITY & UX REQUIREMENTS

- No route accessible without intended protection
- No broken navigation links
- No console errors
- No unmounted component memory leaks

---

# OUTPUT CONTRACT (STRICT)

{
  "status": "success | failed",
  "layout_created": "",
  "routes_configured": true/false,
  "protected_routes_enabled": true/false,
  "warnings": []
}