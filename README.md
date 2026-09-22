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
| 4 | Passport y estrategias | `starter` + `completa` | OK | OK |
| 5 | Roles y autorización | `meetops-semana5` | OK | OK |
| **6** | **Entidad eventos** | **starter + completa** | OK | OK |
| 7 | Tickets e inscripciones | `meetops-semana7` | OK | OK |
| **8** | **DAO · DTO · Repository** | **starter + completa** | **OK** | **OK** |
| 9 | Capstone | `meetops-semana9` | OK | OK |

## Semana 4 (Passport — starter + completa)

```
Semana 4 Passport y estrategias avanzadas/
  Semana-4-Backend-II.pptx
  GUIA-DOCENTE.md              ← contexto para dictar la clase
  meetops-semana4-starter/     ← lab en vivo (LAB.md)
  meetops-semana4-completa/    ← solución + npm run smoke
  README.md
```

```bash
cd "Semana 4 Passport y estrategias avanzadas/meetops-semana4-starter"
cp .env.example .env
npm install && npm run start
```

## Semana 6 (Eventos — starter + completa)

```
Semana 6 Entidad eventos y logica de negocio/
  APUNTES.md                   ← para proyectar o pasar a los alumnos
  GUIA-DOCENTE.md              ← orden de la clase
  meetops-semana6-starter/     ← lab en vivo (LAB.md)
  meetops-semana6-completa/    ← solución + npm run smoke
  README.md
```

```bash
cd "Semana 6 Entidad eventos y logica de negocio/meetops-semana6-starter"
cp .env.example .env
npm install && npm run start
```

## Semana 8 (DAO · DTO · Repository)

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
