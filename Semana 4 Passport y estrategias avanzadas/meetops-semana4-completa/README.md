# MeetOps — Semana 4

Login con Passport. El token viaja en `Authorization: Bearer` o en una cookie. Logout borra la cookie.

| Método | Ruta | Auth |
| --- | --- | --- |
| GET | `/api/health` | — |
| POST | `/api/sessions/register` | — |
| POST | `/api/sessions/login` | — |
| GET | `/api/sessions/current` | JWT en el header o en la cookie |
| POST | `/api/sessions/logout` | JWT |

```bash
copy .env.example .env
npm install
npm start
npm run smoke
```
