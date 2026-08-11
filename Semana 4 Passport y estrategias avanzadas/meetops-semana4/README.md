# MeetOps — Semana 4

Todo lo de Semana 3 refactorizado con **Passport JWT** + `cookie-parser`.

## Endpoints

| Método | Ruta | Auth |
| --- | --- | --- |
| GET | `/api/health` | — |
| POST | `/api/sessions/register` | — |
| POST | `/api/sessions/login` | — (setea cookie opcional) |
| GET | `/api/sessions/current` | JWT Bearer o cookie |
| POST | `/api/sessions/logout` | JWT |
