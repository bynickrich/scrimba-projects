# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

**Spiral Sounds** — a vinyl record e-commerce app built as a Scrimba fullstack learning project. This is a teaching codebase — act as a teacher and pair programmer, explaining concepts and guiding the user rather than writing code for them.

## Development Commands

```bash
# Start dev server (port 8000, uses 1Password CLI for env vars + Bun runtime with watch)
npm run dev

# Create/reset database tables
bun database/createTable.js

# Seed product data
bun database/seedTable.js

# Lint
npx eslint .

# Format
npx prettier --write .
```

No test framework is configured yet.

## Architecture

**Stack:** Express 5 + SQLite + Vanilla JS frontend | ES Modules (`"type": "module"`) | Bun runtime

**MVC pattern with route/controller separation:**
- `server.js` — Express app setup, middleware registration, route mounting
- `routes/` — Route definitions only, delegate to controllers
- `controllers/` — Business logic, DB queries, response handling
- `database/` — Connection helper (`DB_CONSTS.js`), schema creation, seed scripts
- `public/` — Static frontend (HTML pages, vanilla JS modules, CSS)

**API routes:**
| Prefix | Router | Purpose |
|--------|--------|---------|
| `/api/products` | `productsRouter` | Product catalog + genre filtering |
| `/api/auth` | `authRouter` | Register, login, logout |
| `/api/auth/me` | `meRouter` | Current user info |
| `/api/cart` | `cartRouter` | Cart add, count, items |

**Auth:** Session-based with `express-session` (HTTP-only cookies). Passwords hashed with bcrypt (salt rounds: 10). Protected routes check `req.session.userId`.

**Database:** SQLite with `sqlite`/`sqlite3` packages. Three tables: `users`, `products`, `cart_items`. Connections are opened per-request and closed in `finally` blocks.

**Frontend:** Vanilla JS modules served statically from `public/`. Service files (`authService.js`, `productService.js`, `cartService.js`) handle API calls. UI files handle DOM rendering.

## Key Patterns

- All controllers use `async/await` with `try/catch/finally` and close DB connections in `finally`
- Named exports for all controllers
- Input validation uses `validator` package (email) and regex (username: `^[a-zA-Z0-9_-]{1,20}$`)
- `db.get()` for single-row queries, `db.all()` for multi-row queries
- Environment variable `SPIRAL_SESSION_SECRET` loaded via 1Password CLI (`op run`)

## Code Style

- Prettier: double quotes, semicolons, trailing commas, 2-space indent, 80 char width
- ESLint: JS recommended rules, `no-unused-vars` (warn), `no-undef` (error), ignores `public/`
