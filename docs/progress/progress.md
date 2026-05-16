# Progress Log

## Estado inicial

No existe implementacion de la aplicacion.

## Iteraciones

### Iteracion 0

- Rol: setup inicial
- Tarea trabajada: ninguna
- Archivos modificados: estructura base
- Comandos ejecutados: ninguno
- Resultado: listo para que Planner, Generator y Evaluator trabajen
- Pendiente: ejecutar primera iteracion del Generator

### Iteracion 1

- Rol: planner/generador/evaluator/reviewer
- Tarea trabajada: T1. Estructura base de la app
- Criterios trabajados: AC-001
- Archivos modificados:
  - `app/index.html`
  - `app/styles.css`
  - `app/main.js`
  - `tests/todo.test.js`
  - `docs/progress/progress.md`
  - `docs/quality/acceptance-criteria.json`
  - `docs/exce-plans/0001-build-hello-todo.md`
- Comandos ejecutados:
  - `pnpm test` — fallo por `EPERM: operation not permitted, futime` durante `pnpm install`.
  - `pnpm test` fuera del sandbox — mismo fallo `EPERM: operation not permitted, futime`.
  - `pnpm test` — fallo porque `jest` no esta instalado/disponible (`jest: not found`).
- Resultado: UI inicial creada con titulo, input, boton, lista vacia y contador de pendientes en 0. Pruebas Jest para AC-001 agregadas en `tests/todo.test.js`, pero no se pudieron ejecutar por entorno/dependencias.
- Pendiente: resolver instalacion/disponibilidad de Jest para ejecutar la suite y avanzar a T2.

### Iteracion 2

- Rol: planner/generador/evaluator
- Tarea trabajada: T2. Agregar tarea y validar vacios
- Criterios trabajados: AC-002, AC-003
- Archivos modificados:
  - `app/main.js`
  - `tests/todo.test.js`
  - `docs/quality/acceptance-criteria.json`
  - `docs/exce-plans/0001-build-hello-todo.md`
  - `docs/progress/progress.md`
- Comandos ejecutados:
  - `pnpm test` — fallo antes de ejecutar Jest por `EPERM: operation not permitted, futime` durante `pnpm install`.
  - `COREPACK_HOME=/tmp/corepack corepack pnpm install --reporter=append-only --package-import-method=copy --store-dir=/tmp/pnpm-store --node-linker=hoisted` en `/tmp/hola_mundo_testdeps` — instalo dependencias en `/tmp`, pero termino con `ERR_PNPM_IGNORED_BUILDS` por scripts de build ignorados.
  - `NODE_PATH=/tmp/hola_mundo_testdeps/node_modules /tmp/hola_mundo_testdeps/node_modules/.bin/jest --env=jsdom --testMatch='**/tests/**/*.test.js'` — paso: 8 tests.
  - `bash scripts/review-before-commit.sh` — fallo porque internamente ejecuta `pnpm test`, bloqueado por `EPERM: operation not permitted, futime`.
- Resultado: se implemento agregar tarea no vacia, recortar espacios, evitar tareas vacias/solo espacios y limpiar el input al agregar. Se agregaron pruebas Jest para AC-002 y AC-003. Los criterios AC-002 y AC-003 quedan marcados como cumplidos con evidencia de Jest ejecutado desde dependencias temporales en `/tmp`.
- Pendiente: resolver el bloqueo de `pnpm test` en el directorio del proyecto y avanzar a T3.
