# Blender MCP Sentinel

> **Control Blender 3D with AI in real time** — MCP server compatible with Claude, GPT, and Cursor.

[![Railway](https://img.shields.io/badge/Backend-Railway-blueviolet?logo=railway)](https://railway.app)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://vercel.com)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Docker](https://img.shields.io/badge/Docker-multi--stage-2496ED?logo=docker)](https://docker.com)
[![License: Commercial](https://img.shields.io/badge/License-Commercial-orange)](https://blendermcp.gumroad.com)

---

## What is this?

Blender MCP Sentinel exposes Blender 3D as an MCP (Model Context Protocol) server, letting AI assistants like Claude and GPT control the 3D environment programmatically — creating objects, applying materials, setting cameras, and rendering scenes.

```
Claude / GPT / Cursor  ──stdio──►  MCP Server  ──TCP:9876──►  Blender 3D
```

The distributed binary contains proprietary logic compiled with Nuitka (Python → C → machine code). This public repository contains only the licensing infrastructure and frontend.

---

## Architecture

```
blender-mcp/
├── public-repo/                  ← This repository (GitHub public)
│   ├── server-api/               ← NestJS — license validation API
│   │   ├── src/
│   │   │   ├── auth/             ← ApiKeyGuard + @Public() decorator
│   │   │   ├── common/           ← LoggingInterceptor, TransformInterceptor
│   │   │   ├── licenses/         ← Zod DTOs, service, controller
│   │   │   ├── health/           ← /api/health with Supabase ping
│   │   │   └── main.ts           ← Bootstrap: CORS, throttling, Swagger
│   │   ├── supabase/schema.sql   ← PostgreSQL schema with RLS
│   │   ├── Dockerfile            ← Multi-stage, non-root user
│   │   └── vercel.json
│   ├── web/                      ← Next.js 14 — landing + dashboard
│   └── docker-compose.yml
│
├── core-private/                 ← NOT in Git (proprietary logic)
└── dist/                         ← NOT in Git (compiled binaries)
```

---

## Tech Stack

### Backend — `server-api/`

| Technology | Purpose |
|---|---|
| **NestJS 10** | REST API framework with modular architecture |
| **Zod + nestjs-zod** | Strict DTO validation with TypeScript inference |
| **@nestjs/throttler** | Rate limiting — 10 req/min on license endpoints |
| **Supabase JS** | PostgreSQL client for license management |
| **Swagger** | Auto-generated API docs at `/api/docs` |
| **Docker multi-stage** | Minimal production image, non-root container |

#### Key patterns implemented:
- **Guard pattern** — `ApiKeyGuard` protects internal endpoints; `@Public()` decorator bypasses for public routes
- **Interceptor pattern** — `LoggingInterceptor` logs method + URL + status + latency per request; `TransformInterceptor` wraps all responses in `{ success, data, timestamp }`
- **Filter pattern** — `AllExceptionsFilter` catches all unhandled exceptions, logs only 5xx errors
- **Fail-open licensing** — if license server is unreachable, the binary continues (never punish users for your infrastructure failing)

### Frontend — `web/`

| Technology | Purpose |
|---|---|
| **Next.js 14** | App Router with Server Components |
| **Tailwind CSS** | Utility-first styling, dark cyberpunk theme |
| **TypeScript** | Strict typing across all components |

### Infrastructure

| Service | Role |
|---|---|
| **Railway** | NestJS backend — persistent Node.js process |
| **Vercel** | Next.js frontend — edge-optimized CDN |
| **Supabase** | PostgreSQL + auth + Row Level Security |
| **GitHub Actions** | CI/CD — test → build → deploy on push to main |
| **GitHub Releases** | Distribution of compiled binaries |

---

## Database Schema

Three tables with Row Level Security enabled:

```sql
-- License lifecycle: pending → active → revoked/expired
licenses (id, license_key, email, hardware_id, plan, status,
          gumroad_order_id, expires_at, activated_at)

-- One user can hold multiple licenses
users (id, email, created_at)

-- Anonymized activity (only 8-char prefix of hardware hash)
activity_logs (id, hardware_id, action, version, created_at)
```

RLS is configured manually — not with Supabase's "automatic RLS" which can generate conflicting policies.

---

## API Endpoints

| Method | Endpoint | Auth | Rate Limit | Description |
|---|---|---|---|---|
| `GET` | `/api/health` | Public | — | Health + Supabase connectivity |
| `POST` | `/api/licenses/validate` | Public | 10/min | Validate by hardware ID |
| `POST` | `/api/licenses/activate` | Public | 5/min | Bind license key to hardware |
| `POST` | `/api/licenses/create` | API Key | — | Create license (post-purchase) |
| `GET` | `/api/docs` | Public | — | Swagger UI |

**Health response example:**
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "uptime": 3600,
    "services": {
      "api": { "status": "ok" },
      "database": { "status": "ok", "latencyMs": 43, "message": "Connected" }
    }
  }
}
```

---

## Security Model

**IP protection:** Core Blender logic lives in `core-private/` — excluded from Git. Distributed only as a Nuitka-compiled binary (Python → C → machine code). No bytecode. No `*.pyc`. No decompilable intermediate.

**License enforcement:**
- Hardware ID = `SHA-256(MAC address)[:32]` — one-way hash, raw MAC never transmitted
- Binary has `BLENDER_MCP_REQUIRE_LICENSE=1` baked in at compile time
- Fail-open on network errors — user is never blocked by server downtime

**API security:**
- Internal endpoints protected by `x-api-key` header
- License endpoints rate-limited (10 req/min per IP via `ThrottlerGuard`)
- CORS validates against allowlist from `FRONTEND_URL` env var
- Supabase RLS: frontend has zero direct database access

---

## Local Development

```bash
# Backend
cd public-repo/server-api
cp .env.example .env   # fill in Supabase credentials
npm install
npm run start:dev      # http://localhost:3001/api/health

# Frontend
cd public-repo/web
npm install
npm run dev            # http://localhost:3000

# Both via Docker
cd public-repo
docker compose up
```

---

## Deployment

| Service | Configuration |
|---|---|
| **Railway (backend)** | Root: `public-repo/server-api` · Start: `node dist/main` |
| **Vercel (frontend)** | Root: `public-repo/web` · Framework: Next.js |

Required environment variables — see `server-api/.env.example`.

---

## About

Built by a 9th-semester Systems Engineering student as a commercial SaaS product. Demonstrates production patterns including:

- Clean Architecture with NestJS modules
- Type-safe validation with Zod
- Docker multi-stage builds with non-root containers
- GitHub Actions CI/CD pipeline
- Row Level Security in PostgreSQL
- Hardware-based license validation with fail-open design
- Python-to-binary compilation with Nuitka for IP protection

---

**Get the compiled binary** → [blendermcp.gumroad.com](https://blendermcp.gumroad.com)  
**Community version** → clone this repo and run `src/server.py` directly (no license required)
