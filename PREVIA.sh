#!/usr/bin/env bash
set -e
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
echo 'Abra http://localhost:8000. Para encerrar, pressione Ctrl+C.'
python3 scripts/preview.py
