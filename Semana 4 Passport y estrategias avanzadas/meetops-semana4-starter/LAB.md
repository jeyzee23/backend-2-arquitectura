# Laboratorio Semana 4 — Starter

Objetivo: reemplazar el middleware Bearer manual de Semana 3 por **Passport JWT**, y sumar **cookie httpOnly** + **logout**.

> No tocar `sessions.service.js`. Passport cambia *cómo se valida* el token, no *cómo se genera* en el login.

## Orden sugerido (~90 min)

1. **Wiring** (`app.js`) — `cookieParser` → `initPassport` → `passport.initialize`
2. **Estrategia** (`passport.config.js`) — `JwtStrategy` + extractor Bearer (después cookie)
3. **Middleware** (`auth.middleware.js`) — `authenticateJwt` con `{ session: false }` + callback
4. **Probar** `GET /current` con Bearer (Postman / smoke parcial)
5. **Cookie en login** (`sessions.controller.js`) — `response.cookie(...)`
6. **Logout** — `clearCookie` + ruta `POST /logout`

## Checklist

- [ ] `app.js` monta cookie-parser + Passport en el orden correcto
- [ ] Existe estrategia llamada `"jwt"`
- [ ] `authenticateJwt` deja el user en `request.user`
- [ ] `GET /api/sessions/current` funciona con `Authorization: Bearer <token>`
- [ ] Login setea cookie `meetopsToken` (httpOnly)
- [ ] El extractor también acepta token por cookie
- [ ] `POST /api/sessions/logout` limpia la cookie
- [ ] `npm run smoke` en verde

## Archivos a completar

| Archivo | Qué hacer |
| --- | --- |
| `src/app.js` | Descomentar / cablear Passport |
| `src/config/passport.config.js` | Implementar `initPassport` |
| `src/middlewares/auth.middleware.js` | Implementar `authenticateJwt` |
| `src/controllers/sessions.controller.js` | Cookie en login + logout |
| `src/routes/sessions.routes.js` | Descomentar ruta logout |

## Referencia

Solución lista en la carpeta hermana `meetops-semana4-completa`.
