#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_DIR"

echo "[DEV] Installing dependencies..."
bun install

echo "[DEV] Setting up database..."
bun run db:push

echo "[DEV] Starting development server..."
node node_modules/.bin/next dev -p 3000 -H 0.0.0.0 &

DEV_PID=$!
echo "$DEV_PID" > "$SCRIPT_DIR/dev.pid"

# Wait for dev server
for i in $(seq 1 60); do
  if curl -s --connect-timeout 2 http://localhost:3000 > /dev/null 2>&1; then
    echo "[DEV] Next.js dev server is ready!"
    break
  fi
  sleep 1
done

echo "[DEV] Dev server started with PID $DEV_PID"
disown "$DEV_PID" 2>/dev/null || true
