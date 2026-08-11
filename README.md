# Backend II — MeetOps

API de eventos e inscripciones. Cada carpeta es una semana y el proyecto de esa semana se corre solo.

Cuando una semana tiene dos carpetas:

- `starter`: el proyecto para completar. Los pasos están en `LAB.md`.
- `completa`: el mismo proyecto ya terminado. `npm run smoke` recorre el flujo.

## Cómo correr un proyecto

Hace falta Node y MongoDB. En la carpeta del proyecto:

```bash
copy .env.example .env
npm install
npm run dev
```

Si no existe `dev`, usá `npm start`. El puerto está en `.env` (en general `8080`). No subas el archivo `.env`.

## Semanas

| Semana | Tema | Proyecto |
| --- | --- | --- |
| 1 | Repaso de arquitectura y servidor Express | `meetops-semana1` |
| 2 | Registro de usuarios y hash de la contraseña | `meetops-semana2` |
| 3 | Login con JWT | `meetops-semana3` |
| 4 | Passport, cookie y logout | `meetops-semana4-starter` y `meetops-semana4-completa` |
| 5 | Roles y autorización | `meetops-semana5` |
| 6 | Eventos, estados y reglas de negocio | `meetops-semana6-starter` y `meetops-semana6-completa` |
| 7 | Tickets, cupos y cancelación | `meetops-semana7-starter` y `meetops-semana7-completa` |
| 8 | DAO, DTO y Repository | `meetops-semana8-starter` y `meetops-semana8-completa` |
| 9 | Proyecto final, con la misma arquitectura | `meetops-semana9` |

El detalle de rutas y reglas está en el `README.md` de cada proyecto.
