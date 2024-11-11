import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorResponseDto, SuccessResponseDto } from './dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponseDto<T> | ErrorResponseDto> {
    return next.handle().pipe(
      map((data) => {
        return {
          success: true,
          result: data,
        };
      }),
      catchError((error) => {
        const response = context.switchToHttp().getResponse();
        const errorMessage =
          error.response?.message || error.message || 'Internal server error';

        response.status(error.status || 500);
        return [
          {
            success: false,
            result: { error: errorMessage },
          } as ErrorResponseDto,
        ];
      }),
    );
  }
}
