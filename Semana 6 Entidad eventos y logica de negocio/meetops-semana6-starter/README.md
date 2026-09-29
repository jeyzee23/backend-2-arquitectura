# MeetOps — Semana 6

Eventos con fecha, cupo, precio y estado. Los pasos para completar las reglas están en `LAB.md`. La versión terminada está en `../meetops-semana6-completa`.

```bash
copy .env.example .env
npm install
npm start
```

| Método | Ruta | Quién |
| --- | --- | --- |
| GET | `/api/events` | Público. Por defecto, solo `published` |
| GET | `/api/events/:id` | Público |
| POST | `/api/events` | `organizer` o `admin` |
| PUT | `/api/events/:id` | El dueño o un `admin` |
| PATCH | `/api/events/:id/status` | El dueño o un `admin` |
