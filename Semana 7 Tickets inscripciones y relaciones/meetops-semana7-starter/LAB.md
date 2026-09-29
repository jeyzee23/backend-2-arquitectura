# Laboratorio Semana 7 — Starter

Objetivo: que un usuario se anote a un evento, que el cupo no se pase, y que cancelar devuelva el lugar. El ticket es la relación entre un usuario y un evento. No guardes el usuario entero adentro.

Las reglas van en `tickets.service.js`.

## Orden (~90 min)

1. Leer `ticket.model.js`. `user` y `event` son ObjectId. El índice único es parcial: solo cuenta si el ticket está `confirmed` o `pending`.
2. **TODO 1** `register`: evento publicado, fecha futura, sin duplicado activo, cupo, código `TCK-...`, mail.
3. **TODO 2** ya lista los tickets propios con el evento. Recorrerlo.
4. **TODO 3** el organizador de ese evento (o un admin) ve quién se anotó.
5. **TODO 4** cancelar cambia el estado. No se borra. El cupo se libera porque los `cancelled` no se suman.
6. **TODO 5** el mail. Sin SMTP, imprimirlo en consola alcanza para probar el flujo.

## Checklist

- [ ] Sin token, inscribirse responde 401
- [ ] Evento que no existe responde 404
- [ ] Evento viejo o cancelado responde 400
- [ ] `quantity` 0 responde 400
- [ ] Dos inscripciones activas del mismo usuario responden 409
- [ ] Si no hay cupo, 409
- [ ] Cancelar el propio ticket deja `cancelled` y `cancelledAt`
- [ ] Después de cancelar, otra persona puede ocupar ese lugar
- [ ] Un user no ve la lista de inscriptos. Otro organizer tampoco
- [ ] La respuesta no trae `password`

## Referencia

La solución está en `meetops-semana7-completa`.
