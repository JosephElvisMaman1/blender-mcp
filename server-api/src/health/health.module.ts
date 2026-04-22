import { Module, Controller, Get, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { Public } from '../auth/decorators/public.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

// ── Health Service — verifica conectividad real con Supabase ──
@Injectable()
export class HealthService {
  constructor(private readonly config: ConfigService) {}

  async check(): Promise<HealthResult> {
    const start = Date.now();
    const dbStatus = await this._pingSupabase();
    const latencyMs = Date.now() - start;

    return {
      status: dbStatus.ok ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version ?? '1.0.0',
      uptime: Math.floor(process.uptime()),
      services: {
        api: { status: 'ok' },
        database: {
          status: dbStatus.ok ? 'ok' : 'error',
          latencyMs,
          message: dbStatus.message,
        },
      },
    };
  }

  private async _pingSupabase(): Promise<{ ok: boolean; message: string }> {
    try {
      const url = this.config.get<string>('SUPABASE_URL');
      const key = this.config.get<string>('SUPABASE_SERVICE_KEY');

      if (!url || !key) {
        return { ok: false, message: 'Variables de Supabase no configuradas' };
      }

      const client = createClient(url, key, { auth: { persistSession: false } });

      // Ping mínimo: solo count, no expone datos reales
      const { error } = await client
        .from('activity_logs')
        .select('id', { count: 'exact', head: true });

      if (error) {
        return { ok: false, message: `DB error: ${error.message}` };
      }

      return { ok: true, message: 'Connected' };
    } catch (err) {
      return { ok: false, message: `Unreachable: ${(err as Error).message}` };
    }
  }
}

// ── Health Controller ─────────────────────────────────────────
@ApiTags('Health')
@Controller('api')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Public()
  @Get('health')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Health check con verificación de Supabase',
    description: 'Verifica API + base de datos. Retorna status "ok" o "degraded".',
  })
  check(): Promise<HealthResult> {
    return this.healthService.check();
  }
}

// ── Module ────────────────────────────────────────────────────
@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}

// ── Interface ─────────────────────────────────────────────────
interface HealthResult {
  status: 'ok' | 'degraded';
  timestamp: string;
  version: string;
  uptime: number;
  services: {
    api: { status: string };
    database: { status: string; latencyMs: number; message: string };
  };
}
