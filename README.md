# Backend II — Diseño y Arquitectura Backend

Material docente para clases en vivo. Producto demo: **MeetOps**.

## Organización

```
backend-2-arquitectura/
  Semana N <título>/
    Semana-N-Backend-II.pptx
    meetops-semanaN/          # proyecto de la semana
```

Sin carpeta `Clase 1`: PPT + proyecto van directo en cada semana.

## Estado

| Semana | Tema | Proyecto | PPT | Smoke |
| --- | --- | --- | --- | --- |
| 1 | Introducción y repaso arquitectónico | `meetops-semana1` | — | OK |
| 2 | Usuarios, registro y seguridad | `meetops-semana2` | OK | OK |
| 3 | Login, JWT y sesión | `meetops-semana3` | OK | OK |
| 4 | Passport y estrategias | `meetops-semana4` | OK | OK |
| 5 | Roles y autorización | `meetops-semana5` | OK | OK |
| 6 | Entidad eventos | `meetops-semana6` | OK | OK |
| 7 | Tickets e inscripciones | `meetops-semana7` | OK | OK |
| **8** | **DAO · DTO · Repository** | **starter + completa** | **OK** | **OK** |
| 9 | Capstone | `meetops-semana9` | OK | OK |

## Semana 8 (prioridad clase — mañana)

```
Semana 8 Arquitectura profesional DAO DTO y repository/
  Semana-8-Backend-II.pptx
  meetops-semana8-starter/     ← desarrollar en vivo (LAB.md)
  meetops-semana8-completa/    ← solución + npm run smoke
  README.md
```

```bash
cd "Semana 8 Arquitectura profesional DAO DTO y repository/meetops-semana8-completa"
npm install && npm run start
# otra terminal
npm run smoke
```

Requisito Semana 8: Mongo Atlas en `MONGO_URL` (ver `.env` / `.env.example` del proyecto).
