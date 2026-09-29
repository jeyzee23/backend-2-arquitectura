# Semana 8 — DAO, DTO y Repository

La misma API de eventos y tickets, separada en capas. El controller no habla con Mongo. El service aplica las reglas. El repository ordena el acceso. El DAO hace la consulta. El DTO decide qué datos salen en la respuesta.

| Carpeta | Qué es |
| --- | --- |
| `meetops-semana8-starter` | Para completar. Los pasos están en `LAB.md`. |
| `meetops-semana8-completa` | El mismo proyecto terminado. |

`MONGO_URL` apunta a Mongo Atlas, no a una base local. Está en `.env.example`.

```bash
cd meetops-semana8-completa
copy .env.example .env
npm install
npm start
npm run smoke
```

Postman: `meetops-semana8-completa/postman/MeetOps-Semana8.postman_collection.json`.
