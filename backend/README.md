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
- `pnpm migration:generate <Name>` — Generate DB migration
- `pnpm migration:run` — Run pending migrations
- `pnpm migration:revert` — Rollback last migration