import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly serializerClass: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const { data, message, status } = response;
        const transformedObj = plainToInstance(this.serializerClass, data, {
          excludeExtraneousValues: true,
        });
        return {
          status: status || true,
          message: message || 'Success',
          data: transformedObj,
        };
      }),
    );
  }
}
