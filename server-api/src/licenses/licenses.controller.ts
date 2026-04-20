import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity, ApiOkResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { LicensesService } from './licenses.service';
import { ValidateLicenseDto, ActivateLicenseDto, CreateLicenseDto } from './dto/validate-license.schema';
import { ApiKeyGuard } from '../auth/guards/api-key.guard';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Licenses')
@Controller('api/licenses')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  /**
   * Endpoint llamado por el binario compilado al iniciar.
   * Es público (sin API key) — el binario no tiene secrets.
   * Rate limit estricto: 10 req/min por IP para prevenir fuerza bruta.
   */
  @Public()
  @Post('validate')
  @HttpCode(HttpStatus.OK)
  @Throttle({ license: { ttl: 60_000, limit: 10 } })
  @ApiOperation({ summary: 'Valida licencia por hardware ID' })
  @ApiOkResponse({ description: '{ valid: bool, plan, expiresAt, message }' })
  validate(@Body() dto: ValidateLicenseDto) {
    return this.licensesService.validate(dto);
  }

  /**
   * Activación desde el dashboard web.
   * También público — el usuario pega su license key manualmente.
   */
  @Public()
  @Post('activate')
  @HttpCode(HttpStatus.OK)
  @Throttle({ license: { ttl: 60_000, limit: 5 } })
  @ApiOperation({ summary: 'Activa license key y vincula hardware ID' })
  activate(@Body() dto: ActivateLicenseDto) {
    return this.licensesService.activate(dto);
  }

  /**
   * Creación de licencias (webhook de Gumroad o uso manual).
   * PROTEGIDO con API key de servidor.
   */
  @UseGuards(ApiKeyGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiSecurity('api-key')
  @ApiOperation({ summary: '[INTERNO] Crear nueva licencia tras compra' })
  create(@Body() dto: CreateLicenseDto) {
    return this.licensesService.create(dto);
  }
}
