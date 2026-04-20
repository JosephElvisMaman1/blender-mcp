import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../common/supabase.module';
import { ValidateLicenseDto, CreateLicenseDto, ActivateLicenseDto } from './dto/validate-license.schema';

export interface LicenseValidationResult {
  valid: boolean;
  plan?: string;
  expiresAt?: string | null;
  message: string;
}

@Injectable()
export class LicensesService {
  private readonly logger = new Logger(LicensesService.name);

  constructor(private readonly supabase: SupabaseService) {}

  // ── Validate ─────────────────────────────────────────────
  async validate(dto: ValidateLicenseDto): Promise<LicenseValidationResult> {
    const { data, error } = await this.supabase.client
      .from('licenses')
      .select('plan, expires_at, status, hardware_id')
      .eq('hardware_id', dto.hardwareId)
      .eq('status', 'active')
      .maybeSingle();

    if (error) {
      this.logger.error(`Supabase error validating ${dto.hardwareId.slice(0, 8)}…`, error);
      // Fail-open: si la BD falla no castigamos al usuario
      return { valid: true, plan: 'unknown', expiresAt: null, message: 'offline-mode' };
    }

    if (!data) {
      return { valid: false, message: 'No se encontró licencia activa para este hardware.' };
    }

    // Verificar expiración
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return { valid: false, message: 'Tu licencia ha expirado. Renuévala en blendermcp.gumroad.com' };
    }

    // Loguear actividad (fire-and-forget)
    void this._logActivity(dto.hardwareId, 'validate', dto.version);

    return {
      valid: true,
      plan: data.plan,
      expiresAt: data.expires_at ?? null,
      message: 'Licencia válida',
    };
  }

  // ── Activate ─────────────────────────────────────────────
  async activate(dto: ActivateLicenseDto): Promise<LicenseValidationResult> {
    // Verificar que la license key existe y no está vinculada a otro hardware
    const { data: license, error } = await this.supabase.client
      .from('licenses')
      .select('id, hardware_id, plan, expires_at, status')
      .eq('license_key', dto.licenseKey)
      .maybeSingle();

    if (error || !license) {
      return { valid: false, message: 'License key inválida. Verifica tu recibo de Gumroad.' };
    }

    if (license.status !== 'pending' && license.hardware_id && license.hardware_id !== dto.hardwareId) {
      return { valid: false, message: 'Esta license key ya está activada en otro equipo.' };
    }

    // Vincular hardware ID
    await this.supabase.client
      .from('licenses')
      .update({ hardware_id: dto.hardwareId, status: 'active', activated_at: new Date().toISOString() })
      .eq('id', license.id);

    return {
      valid: true,
      plan: license.plan,
      expiresAt: license.expires_at ?? null,
      message: '✓ Licencia activada exitosamente.',
    };
  }

  // ── Create (interno) ─────────────────────────────────────
  async create(dto: CreateLicenseDto): Promise<{ licenseKey: string }> {
    const licenseKey = this._generateLicenseKey();
    await this.supabase.client.from('licenses').insert({
      license_key: licenseKey,
      email: dto.email,
      plan: dto.plan,
      gumroad_order_id: dto.gumroadOrderId,
      expires_at: dto.expiresAt,
      status: 'pending',
    });
    this.logger.log(`License creada para ${dto.email} plan=${dto.plan}`);
    return { licenseKey };
  }

  // ── Helpers privados ──────────────────────────────────────
  private _generateLicenseKey(): string {
    const seg = () =>
      Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${seg()}-${seg()}-${seg()}-${seg()}`;
  }

  private async _logActivity(hardwareId: string, action: string, version: string): Promise<void> {
    try {
      await this.supabase.client.from('activity_logs').insert({
        hardware_id: hardwareId.slice(0, 8),  // solo prefijo por privacidad
        action,
        version,
      });
    } catch {
      // Silencioso — log de actividad no debe bloquear
    }
  }
}
