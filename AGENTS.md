# AGENTS.md

Este repositorio se usa subagentes definidos en `.codex/agents/`.

## Regla principal

No uses prompts sueltos para simular roles. Usa los custom agents del repositorio.

## Flujo obligatorio

1. Leer `ARCHITECTURE.md`.
2. Leer `docs/product-specs/hello-todo.md`.
3. Leer `docs/quality/acceptance-criteria.json`.
4. Delegar trabajo a subagentes especializados cuando corresponda.
5. Integrar cambios de forma incremental.
6. Ejecutar `pnpm test`.
7. Actualizar `docs/progress/progress.md`.
8. No hacer commit automatico. El humano revisa primero.

## Subagentes esperados

- planner: divide el trabajo y actualiza el plan.
- generator: modifica app/ y codigo fuente.
- evaluator: crea y ejecuta pruebas Jest.
- reviewer: revisa calidad, evidencia y criterios.

## Cierre de iteracion

Antes de pedir commit, ejecutar:

```bash
pnpm test
bash scripts/review-before-commit.sh
```
