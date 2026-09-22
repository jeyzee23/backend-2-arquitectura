# Semana 6 — El evento y su lógica

Un evento no es solo una fila en la base. Es la pieza central de MeetOps: ahí vive qué se guarda y qué se puede hacer con eso.

---

## Lógica de negocio

Una regla de negocio es una decisión de la plataforma, no una limitación de Mongo.

> Si un turno está ocupado, no se puede reasignar. Sí se puede si ese turno se canceló.

Mongo aceptaría las dos cosas. La regla la escribimos nosotros, en el service.

Tres preguntas para abrir la clase:

1. ¿Qué es la lógica de negocio?
2. ¿Por qué el modelo de Event es el centro del sistema?
3. ¿Qué significa conocer el dominio? Conocerlo es saber cómo funciona un evento de verdad: cupo, fecha, si es pago, si se puede cancelar.

---

## Un mismo molde, dos workshops

| | Clase cerrada de Backend II | Clase abierta de introducción |
| --- | --- | --- |
| ¿Se paga? | Arancelada | Gratuita |
| Cupo | Limitado | Ilimitado |
| Speakers | 2 profesores | 1 |
| Modalidad | Online | Híbrida (online y presencial) |

Son eventos distintos y comparten la misma forma:

| Idea de la pizarra | En el modelo |
| --- | --- |
| ¿Es pago o gratis? | `price`. `0` es gratis. Un número mayor es arancelado. |
| ¿Cupo limitado? | `capacity`. Tiene que ser mayor a 0. |
| ¿Cuántos speakers? | No lo guardamos en esta versión. Alcanza con saber que es un número. |
| ¿Online, presencial o híbrido? | `location`, un texto: `Online`, `Buenos Aires`, `Híbrido`. |

---

## Estructura simple y estructura compleja

La simple es un objeto plano. Se recorre fácil. No tiene cajas adentro de cajas.

```js
{
  title: String,
  description: String,
  category: ObjectId,   // la cédula de una categoría
  date: Date,
  location: String,     // "Online", "Buenos Aires", "Híbrido"
  capacity: Number,
  price: Number,
  status: String,       // uno de los estados de abajo
  organizer: ObjectId   // la cédula del usuario que lo creó
}
```

La compleja mete subniveles. Tiene más detalle y es más flexible, y también es más difícil de leer: cada dato pide su propio recorrido.

```js
{
  title: String,
  description: String,
  category: ObjectId,
  date: Date,
  location: ObjectId,   // o una lista: online | presencial | híbrido
  capacity: Number,
  price: Number,
  status: ObjectId,     // el estado vive en otro documento
  organizer: ObjectId
}
```

Hoy usamos la simple. `location` y `status` son texto. `category` y `organizer` son ObjectId.

### Qué es un ObjectId

Mongo le asigna a cada documento una cédula. Esa cédula se llama **ObjectId** y se ve así: `6ab170fee0a10169c05f5185`.

`organizer` guarda solo esa cédula, no el usuario entero. Si pegáramos el usuario adentro del evento, copiaríamos el mail y la contraseña en cada evento. Si Ada cambia el mail, el evento seguiría mostrando el viejo.

El usuario vive una sola vez, en `users`. Cuando hace falta el nombre, `populate("organizer")` dice: andá a buscar el usuario con esta cédula. Pedimos nombre, apellido, email y rol. La contraseña no se pide.

---

## Estados

En el código y en la pre-entrega los estados son estos:

| Estado | Qué significa |
| --- | --- |
| `draft` | Borrador. Existe, y el listado público no lo muestra. |
| `published` | Publicado. Se puede ver. |
| `cancelled` | Cancelado. El documento sigue en la base. |
| `finished` | Ya ocurrió. |

En la pizarra también aparecieron `ongoing` (en curso) y `attempted` (se intentó y no se llegó a hacer). Son ideas válidas. La entrega pide `finished`, así que el laboratorio usa esa lista de cuatro.

Cancelar no borra. Cambia `status` a `cancelled`. Si hace falta explicar por qué, el motivo es un texto: `se cancela por lluvia`.

Un evento futuro puede estar cancelado. Por eso no alcanza con mirar la fecha: hace falta el estado.

---

## Filtros

Pensá en una página de autos con 10.000 Chevrolet Tracker iguales. Sin filtro, la respuesta no sirve.

Los filtros viajan en la URL, después del `?`. No armamos una ruta nueva por cada búsqueda.

```
GET /api/events?status=published&category=backend&location=aires&page=1&limit=10&sort=date
```

El camino es siempre el mismo:

1. Leemos los query params (`request.query`).
2. Armamos un objeto `filter` solo con lo que vino.
3. Buscamos en Mongo y hacemos `populate` del organizador.
4. Devolvemos los eventos y los datos de la página.

Si no mandan `status`, el listado público muestra solo `published`.

### Fechas: `$gte` y `$lte`

| Operador | Se lee | Significa |
| --- | --- | --- |
| `$gte` | *greater than or equal* | Mayor o igual |
| `$lte` | *less than or equal* | Menor o igual |

```
GET /api/events?dateFrom=2027-06-01&dateTo=2027-06-30
```

`dateFrom` usa `$gte`. `dateTo` usa `$lte`. Así queda el rango del mes.

### Texto: `senta` y `sentadilla`

Si buscás el texto exacto `senta`, no aparece `sentadilla`.

Una expresión regular busca un pedazo, no la palabra entera. Con `$regex: "senta"` sí aparece `sentadilla`. `$options: "i"` ignora mayúsculas, así `aires` encuentra `Buenos Aires`.

Eso se usa en `location`, `category` y en `search` (título o descripción).

---

## Paginación

No devolvemos los 10.000 de una. Devolvemos una página y le contamos al frontend cuántas hay.

En el ejemplo de la pizarra, la página trae 10:

| Página | Qué hace | `skip` |
| --- | --- | --- |
| 1 | Trae del 0 al 9 | 0 |
| 2 | Saltea los primeros 10 y trae del 10 al 19 | 10 |
| 3 | Saltea los primeros 20 y trae del 20 al 29 | 20 |

La cuenta es `skip = (page - 1) * limit`.

La respuesta incluye la metadata:

| Campo | Qué es |
| --- | --- |
| `data` | Los eventos de esta página |
| `page` | En qué página estás |
| `limit` | Cuántos pediste por página |
| `total` | Cuántos hay con ese filtro |
| `totalPages` | Cuántas páginas salen |

En la API el default es 10. Si piden 100.000, el tope es 50: alcanza para un listado y no tira abajo el servidor.
