# ═══════════════════════════════════════════════════════════════
#  Blender MCP API — Multi-stage Dockerfile
#  ┌──────────┐   ┌──────────┐
#  │ builder  │──►│  runner  │  ← imagen mínima, non-root
#  └──────────┘   └──────────┘
#  Attack surface: ~0 herramientas de build en producción
# ═══════════════════════════════════════════════════════════════

# ── Stage 1: Dependencias + Build ────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
# Copiar solo manifests primero (mejor cache de capas)
COPY package*.json ./
RUN npm ci --only=production && cp -R node_modules /tmp/prod_modules
RUN npm ci

FROM deps AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
# Eliminar devDependencies del output
RUN npm prune --production


# ── Stage 2: Runner mínimo ────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Deshabilitar telemetría de Node (opcional pero limpio)
ENV NODE_OPTIONS="--max-old-space-size=512"

# Seguridad: usuario sin privilegios
RUN addgroup --system --gid 1001 appgroup && \
    adduser  --system --uid 1001 --ingroup appgroup appuser

# Solo los artefactos necesarios para producción
COPY --from=builder --chown=appuser:appgroup /app/dist         ./dist
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/package.json ./package.json

USER appuser

EXPOSE 3001

# Healthcheck nativo de Docker
HEALTHCHECK \
  --interval=30s \
  --timeout=5s \
  --start-period=15s \
  --retries=3 \
  CMD wget -qO- http://localhost:3001/api/health || exit 1

CMD ["node", "dist/main"]
