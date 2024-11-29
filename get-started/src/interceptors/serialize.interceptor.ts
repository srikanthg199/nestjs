import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((response: any) => {
        const { data, ...rest } = response;
        console.log(/data/, data);
        const serializedData = plainToInstance(this.dto, data, {
          excludeExtraneousValues: true, // Exclude properties not decorated with @Expose()
        });
        return { data: serializedData, ...rest };
      }),
    );
  }
}
