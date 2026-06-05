# Descuentos Santiago

Open-source platform to manage discount campaigns across Santiago, Chile.

## Architecture

- `apps/api`: Fastify HTTP adapter exposing the application layer.
- `apps/web`: React + Vite frontend for landing, dashboard, and discount operations.
- `packages/domain`: Entities and domain rules.
- `packages/application`: Use cases and ports.
- `packages/infrastructure`: In-memory repository adapter and seed data.

## Local Development

```bash
npm install
npm run dev
```

API runs on `http://localhost:4000` and the web app on `http://localhost:5173`.

## Safety

- Copy `.env.example` to `.env` only for local use.
- `.gitignore` blocks environment files, credentials, local databases, secret folders, and common build artifacts.
- Keep real secrets out of commits and issue threads.
