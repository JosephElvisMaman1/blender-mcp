import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * Guard de API Key para proteger endpoints del backend.
 * Valida el header `x-api-key` contra el valor en env.
 *
 * Uso:
 *   @UseGuards(ApiKeyGuard)          → en controller/ruta específica
 *   { provide: APP_GUARD, ... }      → globalmente (recomendado en producción)
 *
 * Para marcar un endpoint como público (sin key):
 *   @Public()
 */
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // Rutas marcadas con @Public() pasan sin validación
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const providedKey = request.headers['x-api-key'];
    const validKey    = this.config.get<string>('INTERNAL_API_KEY');

    if (!validKey || !providedKey || providedKey !== validKey) {
      throw new UnauthorizedException('API key inválida o ausente');
    }
    return true;
  }
}
