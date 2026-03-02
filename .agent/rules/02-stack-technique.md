---
trigger: always_on
---

# Stack Technique (Front-end rules)

## Purpose & Scope
This document defines the front-end stack and conventions for static sites and single-page applications. It is written in English. React is allowed and recommended for projects that need component-based structure or complex UI; for very small static prototypes vanilla JavaScript is acceptable.

## 1. Structure, Semantics & Accessibility
- HTML: Semantic HTML5 is required (proper use of headings, sections, article, nav, main, footer, etc.). Always set the `lang` attribute on `html` and include `<meta name="viewport" content="width=device-width,initial-scale=1">`.
- Accessibility (must-haves): provide meaningful `alt` text for images, ensure keyboard navigability, use ARIA only when native semantics are insufficient, include skip-to-content links, and verify color contrast per WCAG AA as a minimum. Run an accessibility audit (Lighthouse or axe) before major releases.

## 2. Styles (Tailwind & CSS)
- Preferred: Tailwind CSS v3 integrated via npm and a build step (recommended for production). This enables purging unused styles and using the JIT engine.
- Prototyping: Tailwind CDN is allowed for quick prototypes only. For production sites, do not use the CDN; install Tailwind and configure `content` paths to remove unused CSS.
- Alternatives: Plain CSS, BEM, or CSS modules are acceptable where appropriate. Keep class names clear and avoid excessive inline styles.

## 3. JavaScript / Frameworks
- Language: Vanilla JS should be ES6+ (use modules: `type="module"`). Follow a modular approach, avoid polluting the global scope.
- Frameworks: React is allowed and preferred for component-based apps. Use React 18+ with functional components and hooks. Other frameworks (Vue, Alpine, Svelte) are discouraged unless a specific case is approved.
- When to choose vanilla JS vs React:
  - Use vanilla JS for very small, static pages with minor interactivity (menus, sliders, small widgets).
  - Use React for multi-component UIs, client-side routing, or when state management becomes non-trivial.

## 4. React-specific guidance
- Tooling: Prefer Vite (fast dev server + build). Create a minimal project with Vite + React and integrate Tailwind via PostCSS.
- Patterns: favor functional components, use Context or lightweight state libs for cross-cutting state. Keep components small and focused.
- Data fetching: use the Fetch API or libraries like React Query for caching and background updates. Keep secrets off the client.

## 5. Tooling, Quality & Testing
- Linting/Formatting: ESLint (with an agreed rule set) and Prettier are required. Add a pre-commit hook (husky) to run formatting/linting checks.
- Testing: Unit tests with Jest + React Testing Library for React projects. E2E tests with Playwright or Cypress for critical flows.
- CI: Ensure CI runs lint, tests, and build. Gate merges on green checks.

## 6. Performance & Assets
- Images: serve responsive images (`srcset` / `picture`), prefer modern formats (WebP/AVIF), and use lazy loading where appropriate.
- Bundling: code-splitting, tree-shaking, and minification for production builds. Avoid shipping large third-party libraries when possible.
- Metrics: monitor Lighthouse scores for performance, accessibility, best practices, and SEO. Set practical targets (e.g., Lighthouse Performance > 70 for initial target).

## 7. Browser Support & Polyfills
- Define a `browserslist` for the project (e.g., `>0.5%, last 2 versions, not dead`). Add polyfills only when required and scope them to affected browsers.

## 8. Security & Headers
- Use HTTPS for all deployments. Recommend setting sensible Content Security Policy (CSP) headers, X-Frame-Options, and other security headers at the host/edge.

## 9. Production vs Prototype
- Prototype: Tailwind CDN, simple HTML + vanilla JS, no build step — fine for mockups or internal demos.
- Production: npm-based Tailwind, Vite/build step, lint/tests/CI, image optimization, and auditing (Lighthouse, accessibility). Always purge unused CSS and enable minification.

## 10. Minimal project checklist (ready-to-ship)
- `index.html` contains `lang` and viewport meta tags.
- Accessibility checks passed (basic checklist + Lighthouse/axe).
- ESLint + Prettier configured and run in CI.
- Tests: unit tests for core logic and at least one E2E for critical path.
- Build: production build passes and artifacts are deployable to static hosting (Vercel, Netlify, S3 + CloudFront).

## 11. Example contract (brief)
- Inputs: HTML/CSS/JS source files, optional API endpoints.
- Outputs: production-ready static assets (minified JS/CSS, optimized images), accessible HTML, and CI artifacts.
- Error modes: build failures (lint/test), accessibility regressions, performance regressions.

---

## 12. Backend: PHP, Laravel & SQL (new)
This section adds backend guidance for projects that require server-side logic, database storage, and APIs to serve the front-end.

### Stack & Versions
- PHP: Use a modern, supported PHP version (PHP 8.1+ recommended). Ensure the runtime matches hosting/container environments and CI.
- Framework: Laravel (8/9/10+) — prefer the latest LTS/minor supported release. Use Composer to manage dependencies and commit `composer.lock`.
- Database: MySQL 8+ or PostgreSQL 12+ (Postgres recommended for advanced SQL features). For simple projects MySQL is acceptable. Use a managed RDS/Cloud SQL when possible.

### Project layout & tooling
- Use Laravel application conventions (controllers, models, migrations, seeders, factories, policies).
- Migrations & Seeds: manage schema changes via migrations. Ensure migrations run in CI and production deploys are coordinated.
- ORM: Eloquent is recommended for most use cases. Use query builder for complex queries and avoid N+1s (use eager loading).
- Local dev: use Docker (recommended) or Laravel Sail for local parity with production. Keep Dockerfiles and docker-compose in repo if used.
- Environment: use `.env` for environment variables. Never commit secrets. Use secret management for CI and production (GitHub Actions secrets, Vault, or cloud secret manager).

### APIs & Front-end integration
- API style: RESTful JSON APIs by default. GraphQL allowed if justified.
- Authentication for SPAs: prefer Laravel Sanctum for cookie-based SPA auth, or use token strategies (OAuth2, JWT) for third-party or mobile clients. Avoid storing secrets in the client.
- CSRF: Protect web routes with CSRF tokens. For API routes used by SPAs, use Sanctum or proper token-based flow.
- CORS: Configure CORS minimally to allow known front-end origins only.
- Versioning: Version API routes if breaking changes are expected (e.g., `/api/v1/...`).

### Security & Data
- Input validation: use Laravel Form Requests or validator rules. Sanitize and validate all external inputs.
- SQL injection: Eloquent and query builder use parameter binding—avoid raw concatenated SQL. Review any raw queries carefully.
- Authentication & Authorization: use Laravel policies and gates for authorization. Centralize permission logic.
- Rate limiting: implement rate limits on public endpoints.
- Secrets: store DB credentials, API keys, and credentials in environment secrets and rotate keys regularly.

### Performance & Scaling
- Caching: use Redis for caching and queues. Cache query results and heavy computations when appropriate.
- Queues: Offload long-running tasks to queues (Redis, Amazon SQS). Monitor failed jobs and implement retries.
- Database: use connection pooling (where supported), index critical columns, and use read replicas for high-read traffic.
- Optimization: use Laravel route caching, config caching, and optimized Composer autoloading for production.

### Testing & CI
- Tests: Unit tests (PHPUnit) for models and services, feature tests for endpoints, and integration tests for important flows. Consider Dusk for browser tests if needed.
- CI: Run `composer install --no-dev --prefer-dist`, run migrations (on ephemeral test DB), run tests, run PHPStan/psalm static analysis if used.
- Health checks: include endpoint(s) for basic health and readiness for load balancers.

### Backups & Observability
- Backups: automated DB backups with point-in-time recovery where possible. Test restores periodically.
- Logs & Monitoring: centralize logs (ELK, Cloud logs), monitor errors (Sentry), and collect performance metrics (APM, NewRelic).

### Deployment
- Options: deploy via Docker images, Laravel Forge, Vapor (for serverless), or standard SSH/CI pipelines. Prefer containerized deployments for reproducibility.
- Migration strategy: run migrations in CI or during deployment with care for zero-downtime where needed (use `php artisan migrate --force` in controlled deployments).
- Rollbacks: have a rollback plan (DB and code) for failed releases.

### Developer ergonomics
- Composer scripts: provide `composer` scripts for common tasks (migrate, seed, test).
- Local environment: provide a `README` with steps to run the project locally (Docker/Sail), run tests, and seed data.

## 13. Backend checklist (ready-to-ship)
- `composer.json` and `composer.lock` present and consistent.
- `.env.example` provided (no secrets committed).
- Migrations and seeders included for schema and basic data.
- Authentication flow documented (Sanctum/JWT/session) and tested.
- Tests: unit and feature tests pass in CI.
- Backups: DB backup strategy configured and tested.
- Monitoring: error reporting and APM configured for production.
- Security: CSP, CORS, rate limiting, and input validation in place.

---


