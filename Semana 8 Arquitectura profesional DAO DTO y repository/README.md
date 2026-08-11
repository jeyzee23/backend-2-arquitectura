# Semana 8 — Arquitectura profesional (DAO · DTO · Repository)

Clase en vivo (prioridad).

## Entregables

| Item | Path |
| --- | --- |
| PPT | `Semana-8-Backend-II.pptx` |
| **Starter (para clase)** | `meetops-semana8-starter/` |
| **Completa (solución)** | `meetops-semana8-completa/` |

## Ritmo sugerido (2 h)

1. PPT: problema → DAO → Repository → DTO (30–40 min)
2. Laboratorio con **starter** siguiendo `LAB.md` (60–70 min)
3. Comparar con **completa** + `npm run smoke` (15 min)

## Setup rápida (completa)

```bash
cd meetops-semana8-completa
cp .env.example .env   # si hace falta
npm install
# Mongo Atlas vía MONGO_URL en .env (no local)
npm run start
# otra terminal
npm run smoke
```

## Postman

Importar: `meetops-semana8-completa/postman/MeetOps-Semana8.postman_collection.json`  
(mismo archivo en el starter). Variables: `baseUrl`, `email`, `token`, `eventId`.
