# Palco · Avance Proyecto Integrador (Web 1)

Frontend en Angular de **Palco**, una aplicación web para la gestión de eventos y reservas de entradas. Esta primera entrega construye la estructura visual y la navegación de la aplicación; toda la información proviene de **datos mockeados**, por lo que todavía no hay backend, autenticación real ni persistencia.

## Tecnologías

- Angular 20 (componentes standalone)
- TypeScript
- HTML5
- SCSS
- Bootstrap 5

## Cómo ejecutar el proyecto

Requisitos: Node.js 20 o superior y Angular CLI (`npm install -g @angular/cli`).

```bash
npm install
ng serve
```

Luego abre `http://localhost:4200`. En la pantalla de inicio de sesión elige el perfil (Cliente, Agente o Administrador). La barra de navegación tiene los enlaces de los tres perfiles para recorrer todas las páginas.

## Páginas

| Módulo | Página | Ruta |
|---|---|---|
| Auth | Inicio de sesión | `/auth/login` |
| Auth | Registro | `/auth/registro` |
| Cliente | Eventos disponibles | `/cliente/eventos` |
| Cliente | Reservar un evento | `/cliente/reservar/:codigo` |
| Cliente | Mis reservas | `/cliente/mis-reservas` |
| Agente | Registrar evento | `/agente/registrar-evento` |
| Agente | Mis eventos | `/agente/eventos` |
| Agente | Administrar reservas | `/agente/reservas` |
| Administrador | Reportes (dashboard) | `/admin/dashboard` |

## Estructura del proyecto

```
src/app/
├── models/        Interfaces: Usuario, Evento, Reserva
├── mocks/         Datos simulados (usuarios, eventos, reservas, ingresos)
├── services/      Servicios que entregan los datos mock
│   ├── usuario.service.ts
│   ├── evento.service.ts
│   ├── reserva.service.ts
│   └── reporte.service.ts
├── shared/        Navbar y etiqueta de estado (se usan en varias páginas)
├── pages/
│   ├── auth/      login, registro
│   ├── cliente/   eventos-cliente, reservar-evento, mis-reservas
│   ├── agente/    registrar-evento, eventos-agente, reservas-agente
│   └── admin/     dashboard
├── app.routes.ts  Rutas de la aplicación
├── app.config.ts  Configuración global (rutas e idioma es-CO)
└── app.component.ts  Componente raíz
```

Cada página tiene su propio componente con archivos `.component.ts`, `.component.html` y `.component.scss`.

## Datos mockeados

Los datos de ejemplo están en `src/app/mocks/mock-data.ts`. Los servicios (`src/app/services/`) los entregan a los componentes. Cuando exista el backend, solo se cambia el contenido de los métodos de cada servicio por llamadas con `HttpClient`.

En esta etapa, el cliente de ejemplo es Laura Gómez (id 1) y la agente de ejemplo es Camila Torres (id 3); sus datos se muestran en las páginas de cada perfil.

## Alcance de esta entrega

Incluido: páginas, componentes, rutas, navegación, HTML estructurado, estilos con SCSS, Bootstrap, diseño responsive y renderizado con mocks.

Pendiente para las siguientes etapas: backend y base de datos, consumo de APIs reales, autenticación, registro real de usuarios, creación de reservas y actualización real de estados, y persistencia de datos.

## Integrantes

- Jose Daniel Rivas Tenorio (230232009)
- Johan Eliu Salgado Castro (230232033)

Docente: Jesús David Mejía Vergara · Unidad Central del Valle del Cauca (UCEVA)

## Estándar de commits

Los mensajes siguen el formato `tipo: descripción en minúscula`:

- `feat:` nueva funcionalidad o página (ej. `feat: crear página principal`)
- `fix:` corrección de errores (ej. `fix: corregir enlaces del menú`)
- `docs:` cambios en documentación (ej. `docs: actualizar README`)
