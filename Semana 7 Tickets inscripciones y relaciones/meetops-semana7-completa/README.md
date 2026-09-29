# MeetOps — Semana 7

Una persona se anota a un evento. El ticket es el comprobante de esa inscripción: quién se anotó, a qué evento, cuántos lugares pidió y si sigue vigente.

El ticket no guarda el usuario ni el evento adentro. Guarda dos referencias (`user` y `event`).

## Cómo correrlo

Hace falta MongoDB en `mongodb://127.0.0.1:27017`.

```bash
cd meetops-semana7-completa
npm install
copy .env.example .env
npm run dev
```

La API queda en `http://localhost:8080`.

`npm run smoke` recorre el flujo: crear evento, anotarse, cupo, duplicado y cancelar.

En Postman importá `postman/MeetOps.postman_collection.json` y corré los requests de arriba hacia abajo.

## Rutas

Todas cuelgan de `/api`.

| Método | Ruta | Quién |
| --- | --- | --- |
| POST | `/sessions/register` | Público |
| POST | `/sessions/login` | Público. Devuelve el token |
| GET | `/sessions/current` | Logueado |
| GET | `/events` | Público. Solo eventos `published` |
| GET | `/events/:id` | Público |
| POST | `/events` | `organizer` o `admin` |
| POST | `/events/:eid/tickets` | Logueado. Body opcional: `{ "quantity": 1 }` |
| GET | `/events/:eid/tickets` | El organizador de ese evento, o un `admin` |
| GET | `/tickets/my-tickets` | Logueado. Solo sus tickets |
| PATCH | `/tickets/:tid/cancel` | El dueño del ticket, o un `admin` |

El token va en `Authorization: Bearer <token>`.

## Reglas

Al crear un evento, la fecha tiene que ser futura y la capacidad mayor a cero. El organizador sale del token.

Para anotarse:

1. La cantidad es un número mayor a cero.
2. El evento existe.
3. El evento está `published`.
4. La fecha del evento todavía no pasó.
5. Esa persona no tiene ya un ticket `confirmed` o `pending` en ese evento. Si lo tiene, responde 409.
6. Hay cupo. Se suman las `quantity` de los tickets `confirmed` y `pending`. Los `cancelled` no suman. Si no alcanza, responde 400.

Cancelar cambia el estado a `cancelled` y guarda `cancelledAt`. El documento no se borra. El lugar queda libre porque ese ticket deja de sumar.

## Mail

Las claves van en el `.env`: `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS`, `MAIL_FROM`.

Si no hay host o clave, el mail se imprime en la consola del servidor. La inscripción queda igual, aunque el envío falle.

Para Gmail, `MAIL_HOST` es `smtp.gmail.com` y `MAIL_PASS` es una contraseña de aplicación, no la clave de la cuenta.
