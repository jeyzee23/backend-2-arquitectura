# MeetOps — Semana 6

Un evento tiene fecha futura, capacidad mayor a cero y precio cero o positivo. Nace en `draft`. Solo quien lo creó, o un admin, puede editarlo. Un evento `cancelled` o `finished` no se modifica. Cancelar cambia el estado: el documento no se borra.

| Método | Ruta | Quién |
| --- | --- | --- |
| GET | `/api/events` | Público. Sin filtro de estado, solo `published` |
| GET | `/api/events/:id` | Público |
| POST | `/api/events` | `organizer` o `admin` |
| PUT | `/api/events/:id` | El dueño o un `admin` |
| PATCH | `/api/events/:id/status` | El dueño o un `admin` |

El listado acepta `status`, `category`, `location`, `dateFrom`, `dateTo`, `search`, `page`, `limit` y `sort`.

```bash
copy .env.example .env
npm install
npm start
npm run smoke
```

Postman: `postman/MeetOps-Semana6.postman_collection.json`.
