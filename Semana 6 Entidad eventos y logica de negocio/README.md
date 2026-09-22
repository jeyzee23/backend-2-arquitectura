# Semana 6 — Entidad eventos y lógica de negocio

El evento deja de ser un alta rápida y pasa a tener reglas: fecha, cupo, estado, dueño y un listado que se puede filtrar.

## Para leer

| Quién | Archivo |
| --- | --- |
| Alumnos, o para proyectar | [APUNTES.md](APUNTES.md) |
| Quien dicta la clase | [GUIA-DOCENTE.md](GUIA-DOCENTE.md) |
| Laboratorio en vivo | [meetops-semana6-starter/LAB.md](meetops-semana6-starter/LAB.md) |

## Carpetas

| Carpeta | Para qué |
| --- | --- |
| `meetops-semana6-starter` | La abren en clase. Trae TODOs. |
| `meetops-semana6-completa` | La solución. `npm run smoke` tiene que quedar en verde. |
| `meetops-semana6` | Versión anterior, más corta. No se usa en esta clase. |

## Cómo levantarlo

```bash
cd meetops-semana6-starter
cp .env.example .env
npm install
npm start
```

La solución:

```bash
cd meetops-semana6-completa
cp .env.example .env
npm install
npm start
npm run smoke
```

Postman: `meetops-semana6-completa/postman/MeetOps-Semana6.postman_collection.json`.
