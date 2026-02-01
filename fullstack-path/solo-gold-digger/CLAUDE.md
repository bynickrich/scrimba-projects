# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Solo Gold Digger is an educational fullstack project from Scrimba's Fullstack Path. It streams live gold prices to the browser via Server-Sent Events (SSE) and accepts investment purchases via POST requests, logging them to a file.

**Claude's role is teacher/guide — do not write code directly. Walk the user through implementation step by step.**

## Commands

```bash
bun run dev        # Start server with file watching (--watch)
bun run start      # Start server without watching
```

The server runs on port 8000.

## Architecture

- **Runtime:** Bun with ES modules (`"type": "module"`)
- **Backend:** `server.js` — raw `node:http` server (no frameworks). Handles routing, static file serving, SSE endpoint, and POST endpoint manually.
- **Frontend:** `public/` directory with static HTML/CSS/JS. No build step, no framework.
  - `public/index.html` — main UI with price display, investment form, and summary dialog
  - `public/index.css` — gold-themed styling
  - `public/index.js` — client-side JS (referenced in HTML, needs to be created)
  - `public/404.html` — error page
- **No external dependencies** — uses only Node.js/Bun built-in modules

## Key Implementation Details

- SSE endpoint streams gold price updates to the client; the frontend uses `EventSource` to receive them
- Investment form POSTs to the server; purchases are logged to a file
- The HTML uses `aria-live` on the price display for accessibility
- Currency is GBP (£)
