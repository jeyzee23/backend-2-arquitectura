# MeetOps — Semana 6

**EventsService** con list/get/create, capacity, status published y organizer ref. Controllers delgados.

| Método | Ruta | Auth |
| --- | --- | --- |
| GET | `/api/events` | — |
| GET | `/api/events/:id` | — |
| POST | `/api/events` | JWT + organizer/admin |
