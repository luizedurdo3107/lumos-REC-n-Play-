#!/usr/bin/env bash
set -e
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo 'Instale Node.js 22 LTS com npm e execute este arquivo novamente.'
  exit 1
fi
if [ ! -d node_modules ]; then npm ci; fi
npm run dev
