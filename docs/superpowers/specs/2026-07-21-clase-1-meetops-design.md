# Design: Backend II — Clase 1 (MeetOps)

## Contexto

Curso **Programación Backend II: Diseño y Arquitectura Backend**.  
Material docente en `/chouse/backend-2-arquitectura`, estilo A (compacto Backend II + ritmo de `ai-automation-avanzada`).

## Decisiones cerradas

| Decisión | Valor |
| --- | --- |
| Clases | 1 por módulo (9 total) |
| Temática | Tech meetups / workshops → **MeetOps** |
| Proyectos | Incrementales |
| Duración en vivo | ~2 h |
| Enfoque PPT | Estilo A (~13 slides) |

## Entregables Clase 1

1. `Semana-1-Backend-II.pptx`
2. Proyecto `meetops-semana1` (Pre-entrega 1)
3. Collection Postman
4. README (resumen de clase + cómo levantar)

## Alcance proyecto

- ESM, `app.js` + `server.js`, `GET /api/health`
- Estructura inicial: config, routes, controllers, models, middlewares, utils
- `services/`, `repositories/`, `dao/` vacías (criterio pre-entrega)
- `GET /api/events` lista vacía · stub `sessions`
- Models User/Event mínimos · sin `database.js` ni helpers futuros

## Fuera de alcance (eliminado del material de Semana 1)

- Service / Repository / DAO / DTO implementados
- Seed de events, cupos, status, organizer
- Auth (hashing, JWT, Passport, roles)
- Narrativa de arquitectura de cierre de cursada en PPT/código
