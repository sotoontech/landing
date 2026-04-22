#!/bin/sh
set -e

echo "→ Applying database schema..."
node node_modules/prisma/build/index.js db push --skip-generate

echo "→ Seeding database (upserts — safe to re-run)..."
node node_modules/tsx/dist/cli.mjs prisma/seed.ts || echo "  seed skipped"

echo "→ Starting Next.js on port ${PORT:-3000}..."
exec "$@"
