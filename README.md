# Orquestacion de subagentes con Codex

Este proyecto demuestra como coordinar varios subagentes de Codex para construir una app TODO simple con HTML, CSS y JavaScript puro.

> Nota de esta ejecucion: este archivo documenta la orquestacion. No avanza ninguna tarea funcional de la app.

## Objetivo del proyecto

Crear una aplicacion TODO sin frameworks, sin backend y sin base de datos.

La implementacion vive en:

```text
app/
├── index.html   # estructura visual
├── styles.css   # estilos
└── main.js      # logica de la TODO app
```

## Como esta organizada la orquestacion

El proyecto usa instrucciones globales en `AGENTS.md` y subagentes definidos en `.codex/agents/`.

```text
.
├── AGENTS.md
│   └── instrucciones obligatorias para Codex en este repo
│
├── .codex/
│   ├── agents/
│   │   ├── planner.toml    # planifica la siguiente tarea
│   │   ├── generator.toml  # implementa codigo de la app
│   │   ├── evaluator.toml  # crea/ejecuta pruebas
│   │   └── review.toml     # revisa calidad antes del commit humano
│   └── cofig.toml          # configuracion local de agentes
│
├── ARCHITECTURE.md
│   └── arquitectura tecnica de la app
│
├── docs/
│   ├── product/
│   │   └── hello-todo.md
│   │       └── especificacion funcional del producto
│   │
│   ├── exce-plans/
│   │   └── 0001-build-hello-todo.md
│   │       └── lista de tareas T1, T2, T3... y su estado
│   │
│   ├── quality/
│   │   └── acceptance-criteria.json
│   │       └── criterios AC-001, AC-002... y si pasan o no
│   │
│   └── progress/
│       └── progress.md
│           └── bitacora de iteraciones y evidencia
│
├── tests/
│   └── todo.test.js
│       └── pruebas Jest de criterios de aceptacion
│
└── scripts/
    └── review-before-commit.sh
        └── revision previa al commit manual
```

## Funcion de cada subagente

### 1. Planner

Archivo:

```text
.codex/agents/planner.toml
```

Responsabilidad:

- Leer la arquitectura.
- Leer la especificacion de producto.
- Leer criterios de aceptacion.
- Leer el progreso actual.
- Determinar cual es la siguiente tarea pendiente.
- Recomendar archivos a cambiar, riesgos y orden de trabajo.

Archivos que normalmente lee:

```text
ARCHITECTURE.md
docs/product/hello-todo.md
docs/quality/acceptance-criteria.json
docs/progress/progress.md
docs/exce-plans/0001-build-hello-todo.md
```

No deberia editar codigo de `app/`.

### 2. Generator

Archivo:

```text
.codex/agents/generator.toml
```

Responsabilidad:

- Implementar una tarea concreta.
- Modificar solo los archivos necesarios.
- Mantener cambios pequenos y verificables.
- No cambiar criterios de aceptacion para hacerlos pasar artificialmente.
- No hacer commits.

Archivos que normalmente modifica:

```text
app/index.html
app/styles.css
app/main.js
```

Dependiendo de la tarea, puede tocar solo uno de ellos.

### 3. Evaluator

Archivo:

```text
.codex/agents/evaluator.toml
```

Responsabilidad:

- Crear o mejorar pruebas Jest.
- Validar criterios de aceptacion.
- Ejecutar `pnpm test` cuando sea posible.
- Reportar fallos reales.
- No debilitar pruebas para que pasen.

Archivos que normalmente lee o modifica:

```text
docs/quality/acceptance-criteria.json
tests/todo.test.js
```

### 4. Reviewer

Archivo:

```text
.codex/agents/review.toml
```

Responsabilidad:

- Revisar el diff final.
- Verificar que la tarea cumple la arquitectura.
- Verificar evidencia de pruebas.
- Confirmar que no se hizo commit automatico.
- Recomendar si el humano puede revisar para commit.

Archivos/comandos que normalmente revisa:

```text
git diff
git status --short
ARCHITECTURE.md
docs/progress/progress.md
docs/quality/acceptance-criteria.json
tests/todo.test.js
```

## Donde estan las tareas

Las tareas estan en:

```text
docs/exce-plans/0001-build-hello-todo.md
```

Ejemplo:

```text
T1. Estructura base de la app
Estado: completada
Criterios: AC-001

T2. Agregar tarea y validar vacios
Estado: completada
Criterios: AC-002, AC-003

T3. Completar tarea y actualizar contador
Estado: pendiente
Criterios: AC-004, AC-006
```

## Como sabe Codex cual tarea esta pendiente

El flujo recomendado es:

```text
1. Leer docs/exce-plans/0001-build-hello-todo.md
2. Buscar la primera tarea con Estado: pendiente
3. Revisar que criterios cubre esa tarea
4. Confirmar en docs/quality/acceptance-criteria.json que esos criterios siguen en passes: false
5. Revisar docs/progress/progress.md para entender que se hizo antes
6. Ejecutar solo esa tarea
```

Representacion ASCII:

```text
┌────────────────────────────────────────────┐
│ Codex recibe: "continua siguiente tarea"   │
└──────────────────────┬─────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────┐
│ Lee AGENTS.md                              │
│ - flujo obligatorio                        │
│ - subagentes esperados                     │
└──────────────────────┬─────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────┐
│ Planner lee documentos base                │
│ - ARCHITECTURE.md                          │
│ - docs/product/hello-todo.md               │
│ - acceptance-criteria.json                 │
│ - progress.md                              │
│ - execution plan                           │
└──────────────────────┬─────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────┐
│ Detecta primera tarea pendiente            │
│ Ejemplo: T3                                │
│ Criterios: AC-004, AC-006                  │
└──────────────────────┬─────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────┐
│ Generator implementa SOLO esa tarea        │
│ Archivos tipicos: app/main.js              │
└──────────────────────┬─────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────┐
│ Evaluator agrega/ajusta pruebas            │
│ Archivo tipico: tests/todo.test.js         │
└──────────────────────┬─────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────┐
│ Codex ejecuta validacion                   │
│ - pnpm test                                │
│ - scripts/review-before-commit.sh          │
└──────────────────────┬─────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────┐
│ Actualiza documentacion de avance          │
│ - progress.md                              │
│ - acceptance-criteria.json                 │
│ - execution plan                           │
└──────────────────────┬─────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────┐
│ Reviewer revisa calidad                    │
│ Resultado: aprobado o requiere cambios     │
└────────────────────────────────────────────┘
```

## Donde se registra el avance

El avance se registra en:

```text
docs/progress/progress.md
```

Cada iteracion deberia incluir:

```text
- Rol o agentes involucrados
- Tarea trabajada
- Criterios trabajados
- Archivos modificados
- Comandos ejecutados
- Resultado
- Pendiente
```

Los criterios se actualizan en:

```text
docs/quality/acceptance-criteria.json
```

Ejemplo:

```json
{
  "id": "AC-004",
  "description": "Marcar tarea como completada.",
  "passes": false
}
```

Cuando una tarea se completa con evidencia, se cambia a:

```json
{
  "id": "AC-004",
  "description": "Marcar tarea como completada.",
  "passes": true
}
```

## Flujo completo de una iteracion

```text
┌────────────┐
│  Humano    │
└─────┬──────┘
      │ prompt: "continua con la siguiente tarea pendiente"
      ▼
┌────────────┐
│  Codex     │
└─────┬──────┘
      │ lee AGENTS.md
      ▼
┌────────────┐
│ Planner    │
└─────┬──────┘
      │ identifica tarea pendiente
      ▼
┌────────────┐
│ Generator  │
└─────┬──────┘
      │ implementa codigo
      ▼
┌────────────┐
│ Evaluator  │
└─────┬──────┘
      │ crea o ajusta pruebas
      ▼
┌────────────┐
│ Codex      │
└─────┬──────┘
      │ integra cambios y ejecuta pruebas
      ▼
┌────────────┐
│ Docs       │
└─────┬──────┘
      │ actualiza progreso y criterios
      ▼
┌────────────┐
│ Reviewer   │
└─────┬──────┘
      │ revisa diff y evidencia
      ▼
┌────────────┐
│ Humano     │
└────────────┘
      revisa y decide si hace commit
```

## Instalacion para probar el flujo

### 1. Instalar Node.js

Codex CLI y las herramientas del proyecto requieren Node.js.

Verifica la instalacion:

```bash
node --version
npm --version
```

### 2. Instalar Codex CLI

Instala Codex CLI globalmente:

```bash
npm install -g @openai/codex
```

Verifica que el comando exista:

```bash
codex --version
```

### 3. Autenticarse

Ejecuta:

```bash
codex
```

Sigue las instrucciones de autenticacion que aparezcan en la terminal.

### 4. Entrar al proyecto

```bash
cd /ruta/a/hola_mundo
```

Ejemplo:

```bash
cd /mnt/c/Users/USER/Documents/codex/projects/hola_mundo
```

### 5. Instalar dependencias del proyecto

```bash
pnpm install
```

Si no tienes `pnpm`:

```bash
npm install -g pnpm
pnpm install
```

### 6. Ejecutar pruebas

```bash
pnpm test
```

Revision previa al commit humano:

```bash
bash scripts/review-before-commit.sh
```

## Como ejecutar Codex en CLI dentro del proyecto

Desde la raiz del repo:

```bash
codex
```

Codex deberia detectar `AGENTS.md` y usar las instrucciones del proyecto.

## Prompt para ejecutar solo la tarea pendiente

Usa un prompt como este:

```text
Continua con la siguiente tarea pendiente del plan activo.

Restricciones:
- Lee AGENTS.md y respeta el flujo obligatorio.
- Identifica la primera tarea con Estado: pendiente en docs/exce-plans/0001-build-hello-todo.md.
- Ejecuta solo esa tarea.
- No implementes tareas futuras.
- Usa los subagentes del repositorio cuando corresponda.
- Actualiza docs/progress/progress.md.
- Actualiza docs/quality/acceptance-criteria.json solo si hay evidencia.
- Ejecuta pnpm test y bash scripts/review-before-commit.sh.
- No hagas commit automatico.
```

## Como se ve la orquestacion durante la ejecucion

```text
[Humano]
  │
  │  Prompt:
  │  "Continua con la siguiente tarea pendiente"
  ▼
[Codex principal]
  │
  │  1. Lee AGENTS.md
  │  2. Lee ARCHITECTURE.md
  │  3. Lee docs/product/hello-todo.md
  │  4. Lee docs/quality/acceptance-criteria.json
  │  5. Lee docs/progress/progress.md
  │  6. Lee docs/exce-plans/0001-build-hello-todo.md
  ▼
[Planner]
  │
  │  Detecta:
  │  - primera tarea pendiente
  │  - criterios asociados
  │  - archivos probables
  │  - riesgos
  ▼
[Codex principal]
  │
  │  Decide el alcance exacto de la iteracion
  ▼
[Generator]
  │
  │  Modifica app/ segun la tarea
  │  No toca criterios para hacerlos pasar artificialmente
  ▼
[Evaluator]
  │
  │  Agrega pruebas en tests/
  │  Ejecuta pnpm test si es posible
  ▼
[Codex principal]
  │
  │  Integra resultados
  │  Ejecuta validaciones
  │  Actualiza progress.md
  │  Actualiza acceptance-criteria.json si corresponde
  ▼
[Reviewer]
  │
  │  Revisa diff, criterios, pruebas y progreso
  │  Emite decision:
  │  - aprobado_para_revision_humana
  │  - requiere_cambios
  ▼
[Humano]
  │
  │  Revisa cambios
  │  Ejecuta pruebas si quiere
  │  Hace commit manualmente
```

## Reglas importantes del proyecto

```text
- No usar frameworks.
- No usar backend.
- No usar base de datos.
- No usar librerias externas de UI.
- Implementar una tarea por iteracion.
- No hacer commit automatico.
- El humano revisa primero.
```

## Comandos utiles

Ver estado del repo:

```bash
git status --short
```

Ver cambios:

```bash
git diff
```

Ejecutar pruebas:

```bash
pnpm test
```

Ejecutar revision previa:

```bash
bash scripts/review-before-commit.sh
```

