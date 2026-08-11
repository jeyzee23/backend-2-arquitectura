# MeetOps — Semana 2

Registro de usuarios con **bcrypt**. Sin JWT todavía.

## Levantar

```bash
cp .env.example .env
npm install
npm run start
# otra terminal:
npm run smoke
```

## Endpoints

| Método | Ruta | Notas |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| POST | `/api/sessions/register` | Hash bcrypt, password nunca en respuesta |
