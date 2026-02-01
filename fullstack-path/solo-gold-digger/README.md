# Gold Digger
A gold investment app that displays live gold prices and lets users submit investment purchases.

## About
Gold Digger is a solo project from Scrimba's Fullstack Path, built to practice server-side fundamentals with Node.js. It demonstrates building a raw HTTP server from scratch with no frameworks -- handling routing, static file serving, Server-Sent Events (SSE) for live price streaming, and processing POST requests for investment submissions.

## Features
- Live gold price display (GBP per troy ounce) with SSE streaming
- Investment form that POSTs purchase data to the server
- Summary dialog shown after a successful investment
- Custom static file server with MIME type handling
- 404 error page for missing routes
- Accessible UI with `aria-live` regions for dynamic price updates

## What I Learned
- Building an HTTP server from scratch using `node:http` with no frameworks
- Server-Sent Events (SSE) for real-time data streaming to the browser
- Handling POST requests and parsing JSON request bodies from chunks
- Serving static files with correct MIME types
- Organizing server code into routes and utility modules (ES modules)
- Frontend `fetch` API for sending form data as JSON

## Tech Stack
- Node.js / Bun (raw `node:http` server, no external dependencies)
- Vanilla JavaScript (frontend)
- HTML / CSS with Google Fonts (Poppins, Roboto, Saira Stencil One)

## Getting Started
```bash
# Start the dev server with file watching
bun run dev

# Or start without watching
bun run start
```
The server runs at http://localhost:8000.
