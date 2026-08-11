# MeetOps — Semana 5

Roles `admin|organizer|user` + `authorizeRoles`. `POST /api/events` solo organizer/admin.

| Método | Ruta | Auth |
| --- | --- | --- |
| GET | `/api/events` | — (público) |
| POST | `/api/events` | JWT + organizer/admin |
