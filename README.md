# Backend Task Manager

## Descripción general

Backend Task Manager es una API REST desarrollada con Node.js y Express.js para gestionar usuarios y tareas. El proyecto está organizado con arquitectura por capas y está preparado para crecer en futuras fases, como conexión a base de datos, autenticación, autorización por roles, frontend y pruebas automatizadas.

Actualmente usa almacenamiento temporal en memoria mediante `src/data/database.js`.

## Tecnologías usadas

- Node.js
- Express.js
- Nodemon
- JavaScript
- Git

## Estructura del proyecto

```txt
src/
├── app.js
├── controllers/
│   ├── dashboard.controller.js
│   ├── tasks.controller.js
│   └── users.controller.js
├── data/
│   └── database.js
├── models/
│   ├── tasks.model.js
│   └── users.model.js
└── routes/
    ├── dashboard.routes.js
    ├── tasks.routes.js
    └── users.routes.js
```

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev
```

`npm run dev` se usa durante desarrollo porque reinicia el servidor automáticamente cuando detecta cambios.

```bash
npm start
```

`npm start` ejecuta el servidor normalmente.

## URL base

```txt
http://localhost:3000/api
```

## Endpoints de usuarios

- `POST /api/users`
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `PATCH /api/users/:id/status`
- `GET /api/users/:userId/tasks`

## Endpoints de tareas

- `POST /api/tasks`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `PATCH /api/tasks/:id/status`

## Endpoints de asignación

- `POST /api/tasks/:taskId/assign`
- `GET /api/tasks/:taskId/users`
- `DELETE /api/tasks/:taskId/users/:userId`

## Endpoint de filtros

- `GET /api/tasks/filter?userId=1`
- `GET /api/tasks/filter?status=pendiente`
- `GET /api/tasks/filter?priority=alta`
- `GET /api/tasks/filter?userId=1&status=pendiente&priority=alta`

## Endpoint de dashboard

- `GET /api/dashboard`

## Ejemplos con curl

### Crear usuario

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Pérez","email":"juan@example.com","role":"usuario"}'
```

### Crear tarea

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Crear módulo de usuarios","description":"Implementar CRUD de usuarios","status":"pendiente","priority":"alta"}'
```

### Asignar usuarios a una tarea

```bash
curl -X POST http://localhost:3000/api/tasks/1/assign \
  -H "Content-Type: application/json" \
  -d '{"userIds":[1,2]}'
```

### Filtrar tareas

```bash
curl "http://localhost:3000/api/tasks/filter?userId=1&status=pendiente&priority=alta"
```

### Consultar dashboard

```bash
curl http://localhost:3000/api/dashboard
```

## Modelo de usuario

```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "role": "usuario",
  "active": true
}
```

## Modelo de tarea

```json
{
  "id": 1,
  "title": "Crear módulo de usuarios",
  "description": "Implementar CRUD de usuarios",
  "status": "pendiente",
  "priority": "alta",
  "assignedUsers": [1, 2],
  "createdAt": "2026-07-07"
}
```

## Validaciones principales

- `name` es obligatorio.
- `email` es obligatorio y único.
- `role` solo puede ser `admin` o `usuario`.
- `title` es obligatorio.
- `status` solo puede ser `pendiente`, `en_progreso` o `completada`.
- `priority` solo puede ser `baja`, `media` o `alta`.
- `userIds` debe ser un arreglo sin duplicados.
- Se validan usuarios y tareas inexistentes.

## Nota sobre almacenamiento

Los datos se guardan temporalmente en memoria usando `src/data/database.js`. Esto significa que los usuarios, tareas y asignaciones se pierden al reiniciar el servidor.

## Estado actual

El backend está listo para esta fase académica. Incluye administración de usuarios, CRUD de tareas, asignación de tareas a múltiples usuarios, visualización de tareas por usuario, finalización de tareas, filtros y dashboard administrativo.

## Próximas mejoras

- Conexión a base de datos.
- Autenticación.
- Autorización por roles.
- Frontend.
- Tests automatizados.
- Validaciones más avanzadas.

## Autor

Jhon Poveda
