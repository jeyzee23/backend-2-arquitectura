# MeetOps — Semana 7

Inscripciones a un evento. Los pasos están en `LAB.md`. La versión terminada, con las rutas y las reglas, está en `../meetops-semana7-completa`.

```bash
copy .env.example .env
npm install
npm run dev
```

| Método | Ruta | Quién |
| --- | --- | --- |
| POST | `/api/events/:eid/tickets` | Logueado. Body opcional: `{ "quantity": 1 }` |
| GET | `/api/tickets/my-tickets` | Logueado |
| GET | `/api/events/:eid/tickets` | El organizador de ese evento, o un `admin` |
| PATCH | `/api/tickets/:tid/cancel` | El dueño del ticket, o un `admin` |
