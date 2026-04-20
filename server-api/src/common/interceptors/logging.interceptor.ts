import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req    = context.switchToHttp().getRequest();
    const method = req.method;
    const url    = req.url;
    const ip     = req.ip ?? req.headers['x-forwarded-for'] ?? 'unknown';
    const start  = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const ms   = Date.now() - start;
          const code = context.switchToHttp().getResponse().statusCode;
          this.logger.log(`${method} ${url} ${code} — ${ms}ms  [${ip}]`);
        },
        error: (err) => {
          const ms = Date.now() - start;
          this.logger.warn(`${method} ${url} ERROR — ${ms}ms  [${ip}]  ${err?.message}`);
        },
      }),
    );
  }
}
