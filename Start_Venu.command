#!/bin/sh
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js wurde nicht gefunden."
  echo "Installiere zuerst Node.js von https://nodejs.org"
  read -r
  exit 1
fi
node server.js
