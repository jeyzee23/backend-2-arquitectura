# MeetOps — Semana 8 (COMPLETA)

Arquitectura profesional: **DAO + DTO + Repository**.

## Flujo

```
Route → Controller → Service → Repository → DAO → Model
                              ↘ DTO (salida HTTP)
```

## Cómo levantar

```bash
cp .env.example .env
npm install
# Mongo Atlas vía MONGO_URL en .env
npm run start
# otra terminal:
npm run smoke
```

## Endpoints

| Método | Ruta | Auth | Notas |
| --- | --- | --- | --- |
| GET | `/api/health` | — | Health |
| POST | `/api/sessions/register` | — | Hash bcrypt |
| POST | `/api/sessions/login` | — | JWT + cookie |
| GET | `/api/sessions/current` | JWT | UserDTO (sin password) |
| POST | `/api/sessions/logout` | JWT | Limpia cookie |
| GET | `/api/events` | — | EventDTO |
| GET | `/api/events/:id` | — | |
| POST | `/api/events` | JWT + role organizer/admin | |
| POST | `/api/tickets/events/:eventId` | JWT | Inscripción |
| GET | `/api/tickets/mine` | JWT | |

## Capas clave (para mostrar en clase)

- `src/dao/*` — acceso a Mongo
- `src/repositories/*` — orquestación de persistencia
- `src/dto/*` — forma segura de la respuesta
- `src/services/*` — reglas de negocio
