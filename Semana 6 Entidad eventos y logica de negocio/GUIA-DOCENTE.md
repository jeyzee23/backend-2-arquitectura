# Guía para dictar la Semana 6

Los chicos ya se registran, entran con JWT y tienen roles: `user`, `organizer`, `admin`. Hoy el evento deja de ser un alta con tres campos.

Para proyectar o para pasarles, usá [APUNTES.md](APUNTES.md). Esta guía es el orden de la clase y las trampas.

---

## La frase de la clase

> Si un turno está ocupado, no se reasigna. Sí se puede si ese turno se canceló.

Mongo guarda las dos cosas. El service decide cuál tiene sentido. Esa decisión es la lógica de negocio, y va en `events.service.js`. El controller solo traduce el pedido y la respuesta.

---

## Cómo contarlo (2 horas)

### 1. El ejemplo de los dos workshops — 15 min

Dibujá las dos filas de [APUNTES.md](APUNTES.md):

- Backend II: pago, cupo limitado, 2 speakers, online.
- Intro a la programación: gratis, cupo ilimitado, 1 speaker, híbrida.

Preguntá qué tienen en común. De ahí salen precio, cupo y modalidad. En el modelo eso es `price`, `capacity` y `location`.

### 2. Simple contra compleja — 10 min

Mostrá los dos objetos. Hoy nos quedamos con el plano.

`organizer` es un ObjectId: la cédula del usuario, no el usuario copiado adentro del evento. Si lo embebemos, el mail viejo queda congelado y la contraseña se duplica. `populate("organizer")` va a buscar el nombre cuando hace falta.

`category` también es ObjectId. `location` y `status` quedan como texto para no anidar.

### 3. Estados — 10 min

Los cuatro de la entrega:

`draft` → `published` → `cancelled` o `finished`.

En la pizarra pueden aparecer `ongoing` y `attempted`. Está bien mencionarlos. El laboratorio y la pre-entrega usan `finished`.

Cancelar cambia el estado. El documento queda. El motivo de ejemplo es `se cancela por lluvia`.

Gancho: con el starter, creá un evento con fecha 2020. Entra. Preguntá si eso debería existir.

### 4. Laboratorio — 50 min

Orden del [LAB.md](meetops-semana6-starter/LAB.md):

1. Reglas al crear: fecha futura, cupo mayor a 0, precio 0 o más, `organizer` desde `req.user`.
2. Listado con filtros y página.

Con eso la clase ya sirvió. Si sobra tiempo: editar (solo el dueño o un admin) y cambiar el estado.

### 5. Filtros y página — 15 min, en la pizarra

El ejemplo de los 10.000 Chevrolet Tracker. Sin filtro no hay listado usable.

Después la página de 10:

- Página 1 trae del 0 al 9.
- Página 2 saltea 10 y trae del 10 al 19.
- Página 3 saltea 20.

`skip = (page - 1) * limit`.

Fechas: `$gte` es *greater than or equal* (mayor o igual). `$lte` es *less than or equal* (menor o igual). En la pizarra quedó escrito “greather” y “lower”: corregilo al pasarlos.

Texto: buscar `senta` exacto no encuentra `sentadilla`. Con `$regex` sí, porque busca un pedazo de la palabra.

### 6. Cierre — 10 min

Abrí la completa y corré `npm run smoke`. Leé los casos de la pre-entrega. La semana que viene son las inscripciones, encima de este evento.

Si se atrasa el lab, mostrá editar y cancelar desde la completa.

---

## Rutas

| Método | Ruta | Quién |
| --- | --- | --- |
| GET | `/api/events` | Cualquiera. Si no dicen estado, solo `published`. |
| GET | `/api/events/:id` | Cualquiera. `:id` es el ObjectId del evento. |
| POST | `/api/events` | `organizer` o `admin`. Nace en `draft`. |
| PUT | `/api/events/:id` | El dueño o un `admin`. |
| PATCH | `/api/events/:id/status` | El dueño o un `admin`. |

Sin token: **401** (no sé quién sos). Con token y sin permiso: **403** (sé quién sos y esto no te toca). Dato mal: **400**. No existe: **404**.

El id del organizador sale de `request.user._id`. Si viene en el body, el cliente puede mentir y asignarse el evento de otro.

Para comparar dos ObjectId usá `.toString()` en los dos lados. Con `===` “el mismo id” da falso.

---

## Qué no abrir hoy

- Una colección aparte para categorías. `category` como ObjectId alcanza; en el lab puede ser texto si no hay colección `categories`.
- Tickets, mails y “¿quedan lugares?”. El cupo de hoy es el máximo, nadie se inscribe todavía.
- DAO, Repository y DTO. Eso es la semana 8.
- Pasar solos los eventos viejos a `finished`. Se menciona, no se codea.

---

## Cuando se traben

1. La regla de la fecha está en la ruta. Movela al service.
2. Quieren un `DELETE`. El programa pide cancelar. El historial se conserva.
3. Devuelven todos los eventos. El tope de `limit` es 50.
4. Dejan ordenar por cualquier campo. Lista cerrada: `date`, `-date`, `title`, `price`.
5. Lo crean ya publicado. El recorrido es: nace `draft`, el GET público no lo muestra, lo publicás, aparece.
6. En su proyecto el campo se llama `starts_at`. Es el mismo dato que acá se llama `date`. No los hagas renombrar en clase.

---

## Qué trae cada carpeta

**Starter.** Login, roles y el schema ya andan. `POST /events` crea un `draft` y todavía acepta la fecha 2020: es el gancho. `PUT` y `PATCH` responden 501 hasta que completen el service.

**Completa.** La misma API terminada. No la abras al empezar. Sirve para proyectar el final o para destrabar un grupo.

```bash
cd "Semana 6 Entidad eventos y logica de negocio/meetops-semana6-starter"
cp .env.example .env
npm install
npm start
```

Hace falta Node y Mongo local. La URL está en `.env.example`.

Postman: `meetops-semana6-completa/postman/MeetOps-Semana6.postman_collection.json`.

```bash
cd "../meetops-semana6-completa"
npm start
npm run smoke
```

Tiene que imprimir: `SMOKE OK — health, roles, fecha, capacity, create draft, publish, filtros, owner, admin, cancel`.

La carpeta `meetops-semana6/` es una versión anterior, más corta. Hoy no la uses.

---

## Pre-entrega, para leer al final

No la hagan en clase. Sí tienen que poder nombrar los casos:

- Campos: `title`, `description`, `category`, `date`, `location`, `capacity`, `price`, `status`, `organizer`.
- `organizer` es el ObjectId del usuario logueado.
- Las cinco rutas de la tabla.
- Reglas en el service.
- Filtros, página y orden.
- `user` recibe 403. Fecha pasada recibe 400. Cupo 0 recibe 400. El dueño edita. Otro organizer recibe 403. El admin edita. Un cancelado no se toca. Un id que no existe recibe 404.
