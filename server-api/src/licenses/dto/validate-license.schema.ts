import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

// ── Validate ──────────────────────────────────────────────────
export const ValidateLicenseSchema = z.object({
  hardwareId: z
    .string()
    .min(8,  'hardwareId demasiado corto')
    .max(64, 'hardwareId demasiado largo')
    .regex(/^[a-f0-9]+$/, 'hardwareId debe ser hexadecimal'),
  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/, 'version debe seguir semver (ej: 1.0.0)')
    .default('1.0.0'),
});
export class ValidateLicenseDto extends createZodDto(ValidateLicenseSchema) {}

// ── Activate (bind hardware ID a una license key) ─────────────
export const ActivateLicenseSchema = z.object({
  licenseKey: z
    .string()
    .min(10, 'License key inválida')
    .max(64, 'License key demasiado larga'),
  hardwareId: z
    .string()
    .min(8)
    .max(64)
    .regex(/^[a-f0-9]+$/),
  email: z
    .string()
    .email('Email inválido'),
});
export class ActivateLicenseDto extends createZodDto(ActivateLicenseSchema) {}

// ── Create (uso interno, solo con API key) ────────────────────
export const CreateLicenseSchema = z.object({
  email: z.string().email(),
  plan: z.enum(['pro', 'lifetime', 'team']),
  gumroadOrderId: z.string().min(1),
  expiresAt: z.string().datetime().nullable().default(null),
});
export class CreateLicenseDto extends createZodDto(CreateLicenseSchema) {}
