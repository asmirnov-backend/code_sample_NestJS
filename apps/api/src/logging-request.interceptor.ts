import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

const IGNORED_PATHS = ['/health'];

@Injectable()
export class LoggingRequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    if (IGNORED_PATHS.includes(request.url)) {
      return next.handle();
    }

    console.log('Requested URL: ', request.url);
    console.log('Method: ', request.method);
    console.log('Params: ', request.params);
    console.log('Query: ', request.query);
    console.log('Body: ', request.body);

    return next.handle();
  }
}
