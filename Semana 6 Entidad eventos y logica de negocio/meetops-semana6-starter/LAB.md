# Laboratorio Semana 6 — Starter

Objetivo: convertir Event en una **entidad de negocio real**. Hoy no alcanza con un CRUD: hay que validar fechas, estados, cupo, dueño y armar un listado con filtros.

> Las reglas van en `events.service.js`. El controller solo traduce request/response. Las rutas no contienen `if` de negocio.

## Orden sugerido (~90 min)

1. **Modelo** (`event.model.js`) — leer campos y estados. Pregunta: ¿el schema impide crear un evento en 2020?
2. **Reglas al crear** (`events.service.js` TODO 2) — fecha futura, capacity > 0, price >= 0, organizer desde `req.user`
3. **Filtros** (`list` TODO 3) — `status`, `category`, `location`, `dateFrom`/`dateTo`, `page`, `limit`, `sort`
4. **Update + dueño** (TODO 4 y TODO 6) — organizer edita lo suyo, admin edita todo, cancelled no se toca
5. **Estados** (TODO 5) — `PATCH /:id/status`. Cancelar = cambiar status, no borrar

## Checklist

- [ ] Un evento nace como `draft`
- [ ] `GET /api/events` público lista `published` por defecto
- [ ] Fecha pasada → 400
- [ ] `capacity: 0` → 400
- [ ] Rol `user` no puede crear → 403
- [ ] Organizer no edita eventos ajenos → 403
- [ ] Admin sí puede editar eventos ajenos
- [ ] Cancelar cambia `status` a `cancelled` (el documento sigue existiendo)
- [ ] Un cancelado no se vuelve a publicar
- [ ] El listado responde `data`, `page`, `limit`, `total`, `totalPages`
- [ ] `npm run smoke` en **completa** queda en verde

## Archivos a completar

| Archivo | Qué hacer |
| --- | --- |
| `src/models/event.model.js` | Recorrerlo. Ya está el schema. |
| `src/services/events.service.js` | TODOs 2, 3, 4 y 5 |
| `src/middlewares/auth.middleware.js` | TODO 6 `authorizeEventOwnerOrAdmin` |
| `src/routes/events.routes.js` | Ya cableadas. PUT/PATCH llegan al service y hoy responden 501 |

## Referencia

Solución lista en la carpeta hermana `meetops-semana6-completa`.
