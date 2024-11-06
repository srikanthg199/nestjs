import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`Request to ${request.url} took ${Date.now() - now}ms`),
        ),
      );
  }
}
