#!/bin/sh
set -e

echo "→ Applying database schema..."
node node_modules/prisma/build/index.js db push --skip-generate

echo "→ Seeding database (upserts — safe to re-run)..."
node prisma/seed.cjs

echo "→ Starting Next.js on port ${PORT:-3000}..."
exec "$@"
