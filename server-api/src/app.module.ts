import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LicensesModule } from './licenses/licenses.module';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { SupabaseModule } from './common/supabase.module';

@Module({
  imports: [
    // ── Config global ──────────────────────────────────────
    ConfigModule.forRoot({ isGlobal: true }),

    // ── Rate limiting global (100 req / 60s por IP) ────────
    ThrottlerModule.forRoot([
      { name: 'global', ttl: 60_000, limit: 100 },
      { name: 'license', ttl: 60_000, limit: 10 },  // más estricto en licencias
    ]),

    // ── Módulos de dominio ─────────────────────────────────
    SupabaseModule,
    LicensesModule,
    UsersModule,
    HealthModule,
  ],
  providers: [
    // Throttler aplicado globalmente
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
