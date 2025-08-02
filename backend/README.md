# SWAPI NestJS Backend

## Prerequisites
- [pnpm](https://pnpm.io/) globally (`npm install -g pnpm`)
- [Docker](https://docs.docker.com/get-docker/)

## Setup

```bash
# Clone and install dependencies
git clone https://github.com/ginev91/sw.git
cd sw/backend
pnpm install

# Copy env and edit as desired
cp .env.example .env

# Start containers (backend, postgres, redis)
pnpm compose:start

# For local dev (with hot reload)
pnpm start:dev
```

## Useful scripts

- `pnpm compose:start` — Start all containers
- `pnpm compose:down` — Stop all containers
- `pnpm run typeorm:migration:generate ./migrations/runs/<Name>` — Generate DB migration
- `pnpm run typeorm:migration:run` — Run pending migrations, start scripts run migration which are already created
- `pnpm run typeorm:migration:revert` — Rollback last migration