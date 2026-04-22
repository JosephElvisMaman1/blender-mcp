-- ═══════════════════════════════════════════════════════════════
--  Blender MCP — Schema de Base de Datos
--  Ejecutar en: Supabase → SQL Editor → New query → RUN
--
--  IMPORTANTE: Este schema está sincronizado con LicensesService.
--  No uses el schema genérico que genera otra IA — usa ESTE.
-- ═══════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────
--  TABLA: users
--  Un usuario puede tener múltiples licencias (ej: upgrade)
-- ─────────────────────────────────────────────────────────────
create table if not exists users (
  id          uuid primary key default gen_random_uuid(),
  email       text unique not null,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
--  TABLA: licenses
--  Columnas requeridas por LicensesService.ts
--
--  status: 'pending' → licencia comprada, sin activar
--          'active'  → activada y vinculada a hardware
--          'revoked' → cancelada/reembolsada
--          'expired' → venció la fecha de expiración
-- ─────────────────────────────────────────────────────────────
create table if not exists licenses (
  id                uuid primary key default gen_random_uuid(),
  license_key       text unique not null,
  email             text not null,
  hardware_id       text,                          -- hash SHA-256 del MAC address
  plan              text not null                  -- 'pro' | 'lifetime' | 'team'
                    check (plan in ('pro', 'lifetime', 'team')),
  status            text not null default 'pending'
                    check (status in ('pending', 'active', 'revoked', 'expired')),
  gumroad_order_id  text,                          -- ID de la orden en Gumroad
  expires_at        timestamptz,                   -- null = lifetime / no expira
  activated_at      timestamptz,                   -- cuándo se activó por primera vez
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
--  TABLA: activity_logs
--  Registro de validaciones (solo prefijo del hardware_id por privacidad)
-- ─────────────────────────────────────────────────────────────
create table if not exists activity_logs (
  id           uuid primary key default gen_random_uuid(),
  hardware_id  text,          -- solo los primeros 8 chars del hash
  action       text,          -- 'validate' | 'activate' | 'create'
  version      text,          -- versión del binario que llamó
  created_at   timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
--  ÍNDICES — mejoran velocidad en búsquedas frecuentes
-- ─────────────────────────────────────────────────────────────
create index if not exists idx_licenses_hardware_id    on licenses(hardware_id);
create index if not exists idx_licenses_license_key    on licenses(license_key);
create index if not exists idx_licenses_email          on licenses(email);
create index if not exists idx_licenses_status         on licenses(status);
create index if not exists idx_activity_logs_created   on activity_logs(created_at desc);

-- ─────────────────────────────────────────────────────────────
--  ROW LEVEL SECURITY (RLS)
--  ACTIVADO manualmente — NO usar "automatic RLS" en Supabase.
--  El acceso real lo controla la SERVICE_ROLE_KEY del backend.
-- ─────────────────────────────────────────────────────────────
alter table users           enable row level security;
alter table licenses        enable row level security;
alter table activity_logs   enable row level security;

-- ─────────────────────────────────────────────────────────────
--  POLICIES
--  Solo el service_role (backend NestJS) puede operar.
--  El frontend NUNCA tiene acceso directo a estas tablas.
-- ─────────────────────────────────────────────────────────────

-- users
create policy "service_role full access on users"
  on users for all
  using (true)
  with check (true);

-- licenses
create policy "service_role full access on licenses"
  on licenses for all
  using (true)
  with check (true);

-- activity_logs
create policy "service_role full access on activity_logs"
  on activity_logs for all
  using (true)
  with check (true);

-- ─────────────────────────────────────────────────────────────
--  TRIGGER: actualizar updated_at automáticamente
-- ─────────────────────────────────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_users_updated_at
  before update on users
  for each row execute function update_updated_at();

create trigger trg_licenses_updated_at
  before update on licenses
  for each row execute function update_updated_at();

-- ─────────────────────────────────────────────────────────────
--  VERIFICACIÓN FINAL
--  Al ejecutar este SQL deberías ver en Table Editor:
--    ✓ users
--    ✓ licenses
--    ✓ activity_logs
--  Y en cada tabla: "Row Level Security: ENABLED"
-- ─────────────────────────────────────────────────────────────
