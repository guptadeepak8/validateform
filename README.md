# Validated Form

## About

This project demonstrates a dynamic validated form where validation rules are provided by the server instead of being hardcoded on the frontend.

The form validates:

- Email  
- Numeric input  
- Required fields  

Even if an input passes client validation, the server can reject it. Errors are displayed clearly, and user input is not lost.

Validation rules are treated as configuration so they can change without requiring a frontend redeploy.

---

## Requirements Covered

- Dynamic client-side validation  
- Server-side validation as the source of truth  
- Clear separation of client and server errors  
- No duplicate submissions  
- User input persists on error  

---

## Development Method

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

---

## Architecture

### Server

Built with **NestJS**.  
The server exposes an API that sends validation rules consumed by the frontend.

### Client

Built with **Next.js**.

- **Zod** is used to generate the validation schema dynamically.
- **React Hook Form** handles form state and validation.
- The schema is created at runtime based on server rules.

### Monorepo

The project uses **Turborepo** for faster development and shared packages.