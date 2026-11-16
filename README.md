# Palco · Proyecto Integrador

Aplicación web para la gestión de eventos y reservas de entradas, con tres perfiles de usuario (cliente, agente y administrador). El frontend está hecho en Angular y consume una API REST en Node.js con base de datos PostgreSQL.

## Tecnologías

- Frontend: Angular 20, TypeScript, HTML5, SCSS y Bootstrap 5
- Backend: Node.js, Express 5 y TypeScript
- Base de datos: PostgreSQL 15 con Docker y pgAdmin

## Estructura del repositorio

```
/                  Frontend (proyecto Angular)
├── src/app/
│   ├── config/        URL de la API
│   ├── guards/        Guard que protege las rutas por perfil
│   ├── models/        Interfaces de los datos
│   ├── services/      Servicios que consumen la API con HttpClient
│   ├── shared/        Navbar y etiqueta de estado
│   ├── pages/         auth, cliente, agente y admin
│   └── utils/         Mensajes de error
└── backend/       API REST
    ├── docker-compose.yml
    └── src/
        ├── config/        Variables de entorno y conexión a PostgreSQL
        ├── database/      init.sql (tablas) y seed.sql (datos de prueba)
        ├── models/        Interfaces de los datos
        ├── errors/        Manejo de errores
        ├── scripts/       Scripts para crear tablas y cargar datos
        └── presentation/
            ├── server.ts, routes.ts
            └── modules/   localizacion, auth, clientes, agentes, administradores
                           (cada módulo tiene routes, controllers y services)
```

## Requisitos

- Node.js 20 o superior
- Docker Desktop
- Angular CLI (`npm install -g @angular/cli`)

## Ejecutar el backend

Desde la carpeta `backend`:

```bash
cd backend
docker compose up -d
npm install
npm run db:init
npm run db:seed
npm start
```

- `docker compose up -d` levanta PostgreSQL (puerto 5433) y pgAdmin (http://localhost:8081, usuario `user@google.com`, contraseña `123456`).
- `npm run db:init` crea las tablas y `npm run db:seed` carga los datos de prueba (se puede repetir para reiniciar los datos).
- La API queda en http://localhost:3000/api.
- Las variables de conexión están en `backend/.env`.

Para conectar pgAdmin con la base de datos, crea un servidor con host `myDB`, puerto `5432`, base `proyecto-integrador-db`, usuario `user` y contraseña `123456`.

## Ejecutar el frontend

Desde la raíz del repositorio, con el backend ya corriendo:

```bash
npm install
ng serve
```

Luego abre http://localhost:4200.

## Páginas

| Módulo | Página | Ruta |
|---|---|---|
| Auth | Inicio de sesión | `/auth/login` |
| Auth | Registro | `/auth/registro` |
| Cliente | Eventos disponibles | `/cliente/eventos` |
| Cliente | Reservar un evento | `/cliente/reservar/:codigo` |
| Cliente | Mis reservas | `/cliente/mis-reservas` |
| Agente | Registrar evento | `/agente/registrar-evento` |
| Agente | Editar evento | `/agente/editar-evento/:codigo` |
| Agente | Mis eventos | `/agente/eventos` |
| Agente | Administrar reservas | `/agente/reservas` |
| Administrador | Reportes (dashboard) | `/admin/dashboard` |

## Usuarios de prueba

Todos tienen la contraseña `123456`.

| Perfil | Correo |
|---|---|
| Cliente | laura.gomez@correo.com |
| Cliente | andres.ruiz@correo.com |
| Agente | camila.torres@palco.com |
| Agente | felipe.rojas@palco.com |
| Administrador | monica.herrera@palco.com |

## Endpoints de la API

Todas las rutas empiezan por `/api`. Cada entidad tiene las cinco operaciones del CRUD: `GET /` (todos), `GET /:id` (uno), `POST /` (crear), `PUT /:id` (actualizar) y `DELETE /:id` (eliminar).

| Módulo | Ruta base | Notas |
|---|---|---|
| Localización | `/paises`, `/departamentos`, `/ciudades` | `/departamentos?id_pais=1` y `/ciudades?id_departamento=1` filtran |
| Auth | `/auth/login`, `/auth/registro` | `POST` con correo y contraseña / datos de la persona |
| Auth | `/personas` | `/personas?rol=cliente` filtra por rol |
| Clientes | `/clientes` | El `:id` es la identificación |
| Clientes | `/reservas` | También `/reservas/cliente/:id` y `/reservas/agente/:id` |
| Agentes | `/agentes` | El `:id` es la identificación |
| Agentes | `/eventos` | También `/eventos/disponibles` y `/eventos/agente/:id` |
| Administradores | `/administradores` | El `:id` es la identificación |
| Administradores | `/reportes/...` | `resumen`, `ingresos-por-agente`, `ingresos-por-cliente`, `ingresos-por-mes`, `reservas-por-evento-mes`, `eventos-por-agente-ciudad`, `eventos-por-ubicacion`, `historial-reservas`, `reservas-canceladas`, `eventos-cancelados` |

Las respuestas usan los códigos `200` (consulta y actualización), `201` (creación), `400` (datos inválidos), `401` (credenciales incorrectas), `404` (no encontrado), `409` (dato repetido o registro con datos relacionados) y `500` (error del servidor). Los errores llegan como `{ "error": "mensaje" }`.

## Reglas de negocio

- Una reserva solo se puede crear en eventos Programados, En Boletería o En Vivo, y no puede superar la capacidad del evento.
- El valor total de la reserva se calcula en el backend (precio del evento por número de entradas).
- Al cancelar un evento se cancelan todas sus reservas con la causa «Evento cancelado por el organizador».
- Las contraseñas se guardan en texto plano porque es un proyecto académico; en un sistema real deben cifrarse.

## Integrantes

- Jose Daniel Rivas Tenorio (230232009)
- Johan Eliu Salgado Castro (230232033)

Docente: Jesús David Mejía Vergara · Unidad Central del Valle del Cauca (UCEVA)

## Estándar de commits

Los mensajes siguen el formato `tipo: descripción en minúscula`:

- `feat:` nueva funcionalidad o página (ej. `feat: crear página principal`)
- `fix:` corrección de errores (ej. `fix: corregir enlaces del menú`)
- `docs:` cambios en documentación (ej. `docs: actualizar README`)
