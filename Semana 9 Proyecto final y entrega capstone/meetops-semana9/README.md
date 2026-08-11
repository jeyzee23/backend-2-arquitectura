# MeetOps — Semana 9 (Capstone)

Proyecto final de entrega. Arquitectura profesional **DAO + DTO + Repository** (misma base madura que Semana 8).

## Flujo

```
Route → Controller → Service → Repository → DAO → Model
                              ↘ DTO (salida HTTP)
```

## Levantar

```bash
cp .env.example .env
npm install
# Mongo en mongodb://127.0.0.1:27017
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

## Entrega capstone

1. Fork/clonar este repo y configurar `.env`.
2. Ejecutar `npm run smoke` con el server levantado.
3. Documentar decisiones de arquitectura en el README del equipo.
