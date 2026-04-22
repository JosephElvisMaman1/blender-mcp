import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // ── CORS ────────────────────────────────────────────────────
  // FRONTEND_URL se configura como variable de entorno en Railway.
  // Acepta múltiples orígenes separados por coma:
  // ej: https://blendermcp.vercel.app,http://localhost:3000
  const allowedOrigins = (process.env.FRONTEND_URL ?? 'http://localhost:3000')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (Postman, binario compilado, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS bloqueado para origin: ${origin}`));
    },
    credentials: true,
  });

  // ── Global pipes / filters / interceptors ───────────────────
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  // ── Swagger ─────────────────────────────────────────────────
  patchNestJsSwagger();
  const config = new DocumentBuilder()
    .setTitle('Blender MCP API')
    .setDescription('License validation and user management for Blender MCP SaaS')
    .setVersion('1.0.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'api-key')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Railway asigna el puerto dinámicamente via process.env.PORT.
  // El host 0.0.0.0 es obligatorio en Railway/contenedores (no solo localhost).
  const port = parseInt(process.env.PORT ?? '3001', 10);
  await app.listen(port, '0.0.0.0');
  console.log(`[BlenderMCP API] Listening on 0.0.0.0:${port}`);
}
bootstrap();
