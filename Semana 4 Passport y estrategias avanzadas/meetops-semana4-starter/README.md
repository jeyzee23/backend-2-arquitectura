# MeetOps — Semana 4

El registro y el login de la semana 3, para completar con Passport. El token puede ir en el header o en una cookie. Logout limpia la cookie.

Los pasos están en `LAB.md`. La versión terminada está en `../meetops-semana4-completa`.

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
```
