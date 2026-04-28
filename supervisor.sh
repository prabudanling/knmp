#!/usr/bin/bash
# Auto-restart Next.js dev server
cd /home/z/my-project
while true; do
  echo "[$(date)] Starting Next.js..." >> /home/z/my-project/supervisor.log
  NODE_OPTIONS="--max-old-space-size=1536" node node_modules/.bin/next dev -p 3000 >> /home/z/my-project/dev.log 2>&1
  echo "[$(date)] Server exited. Restarting in 3s..." >> /home/z/my-project/supervisor.log
  sleep 3
done
