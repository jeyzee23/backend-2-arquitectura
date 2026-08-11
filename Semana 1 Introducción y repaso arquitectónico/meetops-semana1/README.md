# MeetOps — Semana 1: Introducción y repaso arquitectónico

Base del curso **Backend II**. API para meetups y workshops tech.

## Finalidad de la clase

Dejar armado el servidor Express con estructura inicial, endpoints base y documentación, listos para crecer en las siguientes entregas.

## Cómo levantar

```bash
cd meetops-semana1
cp .env.example .env
npm install
npm run dev
```

`http://localhost:8080`

```bash
curl http://localhost:8080/api/health
curl http://localhost:8080/api/events
curl http://localhost:8080/api/sessions
```

Postman: `postman/MeetOps-Semana1.postman_collection.json` (`baseUrl` = `http://localhost:8080`).

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `PORT` | Puerto del servidor |
| `NODE_ENV` | Entorno |
| `MONGO_URL` | URI Mongo (configuración inicial) |
| `JWT_SECRET` | Placeholder de configuración inicial |

## Estructura

```
src/
  app.js
  server.js
  config/
  routes/
  controllers/
  models/
  middlewares/
  utils/
  services/        # vacía (pre-entrega)
  repositories/    # vacía (pre-entrega)
  dao/             # vacía (pre-entrega)
```

## Rutas

| Método | Ruta | Respuesta |
| --- | --- | --- |
| GET | `/api/health` | Servidor activo |
| GET | `/api/events` | Lista vacía |
| GET | `/api/sessions` | Stub sin auth |

## Stack

Node.js 20+ · Express (ESM) · Mongoose (schemas base) · dotenv
