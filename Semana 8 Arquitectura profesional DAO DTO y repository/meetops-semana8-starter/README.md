# MeetOps — Semana 8

La API de eventos y tickets, para separar en capas. Las rutas, los controllers, los services y la autenticación ya están. Faltan `dao/`, `repositories/` y `dto/`. Los pasos están en `LAB.md`. La versión terminada está en `../meetops-semana8-completa`.

`MONGO_URL` apunta a Mongo Atlas.

```bash
copy .env.example .env
npm install
npm start
```

`GET /api/health` responde. Registro y login empiezan a funcionar cuando los DAO están completos.
