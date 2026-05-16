#!/usr/bin/env bash
set -e
echo "== Revision previa al commit =="
pnpm test
echo ""
echo "Revise manualmente:"
echo "1. git status --short"
echo "2. git diff"
echo "3. docs/progress/progress.md"
echo "4. docs/quality/acceptance-criteria.json"
echo ""
echo "Si todo esta correcto, haga commit manualmente."