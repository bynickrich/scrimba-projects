# Jimmy's Diner
A mobile-first restaurant ordering app where users can browse a menu, add items to a cart, and check out with a payment dialog.

## About
This is a solo project from the Scrimba Frontend Developer Career Path. It demonstrates DOM manipulation, event delegation, and dynamic HTML rendering using vanilla JavaScript -- building a complete ordering flow without any frameworks.

## Features
- Menu display with item emoji, name, ingredients, and price
- Add-to-cart functionality with a "+" button per menu item
- Dynamic cart that shows/hides based on order contents
- Remove individual items from the cart
- Running total price calculation
- Checkout flow with a payment dialog (HTML dialog element)
- Credit card number input formatting with auto-spacing
- Thank you confirmation message with auto-dismiss

## What I Learned
- Event delegation using a single document-level click listener
- Dynamic HTML rendering from a JavaScript data array
- Working with the native HTML `<dialog>` element and `showModal()`/`close()`
- Array manipulation for cart state (push, splice, reduce)
- Input masking and formatting for credit card numbers
- Mobile-first responsive design using a max-width container
- CSS transitions and hover effects for interactive elements

## Tech Stack
- HTML5 (including native `<dialog>`)
- CSS3 (custom properties, transitions, flexbox)
- Vanilla JavaScript (ES Modules)
- Google Fonts (Smythe)
- Vite (dev server and build tool)

## Getting Started
```bash
bun install
bun run dev
```
