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

## Validation Flow

- Before rendering the form, validation rules are fetched from the backend using a Next.js server component. This ensures the UI always reflects the latest validation contract.

- The received rules are used to dynamically generate a Zod schema, allowing the client validation to adapt without hardcoding rules.

- When a user submits the form with empty fields or invalid formats, client-side validation triggers immediately and displays errors in light red beneath the relevant fields.

- If the data passes client validation but fails on the server, the server errors are shown in a darker red to clearly distinguish them from client errors.

- User input is preserved during failures, and duplicate submissions are prevented while the request is in progress.

**Use Case:**  
Business rules such as minimum amount can vary by region or policy. Instead of enforcing these rules in the frontend, they are controlled by the server so changes can be made without redeploying the client.
