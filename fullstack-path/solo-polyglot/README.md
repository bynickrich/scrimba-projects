# PollyGlot
An AI-powered translation app that translates English text into French, Spanish, or Japanese using the OpenAI API.

## About
PollyGlot is a solo project from Scrimba's Fullstack Path (AI Engineering section). It demonstrates integrating an AI API into a fullstack web application, using Bun's built-in HTTP server with HTML imports to serve both the frontend and a translation API endpoint.

## Features
- Translate English text into French, Spanish, or Japanese
- Clean radio-button language selection UI
- Loading spinner while awaiting the AI translation
- "New Translation" button to reset and translate again
- Server-side OpenAI integration with a developer system prompt for consistent translations

## What I Learned
- Integrating the OpenAI API (Responses endpoint) into a backend service
- Using Bun.serve() with route-based API handling and HTML imports
- Structuring prompt engineering with developer/user roles for translation tasks
- Building a frontend that communicates with an API via fetch and JSON
- Managing UI state (loading, results, reset) with vanilla JavaScript DOM manipulation

## Tech Stack
- Bun (server runtime with `Bun.serve()`)
- TypeScript (server)
- Vanilla JavaScript (frontend)
- OpenAI API (gpt-5-nano model)
- HTML / CSS with Google Fonts (DM Sans, Fraunces)

## Getting Started
```bash
# Install dependencies
bun install

# Create a .env file with your OpenAI API key
# OPENAI_API_KEY=sk-...

# Start the dev server with HMR
bun --hot server.ts
```
