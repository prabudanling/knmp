#!/bin/bash
if ! pgrep -f "next-server" > /dev/null; then
  cd /home/z/my-project
  node node_modules/.bin/next dev -p 3000 -H 0.0.0.0 > /home/z/my-project/dev.log 2>&1 &
fi
