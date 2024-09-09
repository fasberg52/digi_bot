import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { classToPlain } from 'class-transformer';

@Injectable()
export class ClassTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object') {
          return classToPlain(data, { strategy: 'exposeAll' });
        }
        return data;
      }),
    );
  }
}
