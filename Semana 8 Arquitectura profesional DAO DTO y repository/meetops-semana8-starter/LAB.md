# Laboratorio Semana 8 — Starter

Objetivo: implementar las capas **DAO → Repository → DTO** sin tocar controllers.

## Orden sugerido en clase (~90 min)

1. **UserDAO + UserRepository + UserDTO** (register / login / current)
2. **EventDAO + EventRepository + EventDTO** (list / create)
3. **TicketDAO + TicketRepository + TicketDTO** (inscripción)

## Checklist

- [ ] `UserDAO` habla solo con `UserModel`
- [ ] `UserRepository` no importa mongoose
- [ ] `UserDTO` nunca incluye `password`
- [ ] `GET /api/sessions/current` responde con DTO
- [ ] Events y tickets pasan por las mismas capas
- [ ] `npm run smoke` en verde (cuando terminen)

## Referencia

Solución lista en la carpeta hermana `meetops-semana8-completa`.
