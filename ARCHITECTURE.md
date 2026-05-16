# ARCHITECTURE.md

## Objetivo tecnico

Crear una app TODO con HTML, CSS y JavaScript puro.

## Estructura de app

app/
├── index.html
├── styles.css
└── main.js

## Responsabilidades

### index.html

Define la estructura visual inicial:

- titulo;
- input de nueva tarea;
- boton para agregar;
- lista de tareas;
- contador de tareas pendientes.

### styles.css

Define presentacion visual:

- layout centrado;
- estilos del formulario;
- estilos para tareas completadas;
- responsive basico.

### main.js

Contiene la logica:

- crear tarea;
- validar tarea vacia;
- marcar tarea como completada;
- eliminar tarea;
- actualizar contador;
- guardar y cargar desde localStorage.

## Restricciones

- No usar frameworks.
- No usar backend.
- No usar base de datos.
- No usar librerias externas de UI.
- Exportar funciones puras cuando sea posible para facilitar pruebas con Jest.
