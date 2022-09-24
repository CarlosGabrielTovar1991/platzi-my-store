import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const CHECK_TIME = new HttpContextToken<boolean>(()=> false);

export const checkTime = () => (new HttpContext().set(CHECK_TIME, true));

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TIME)) {
      const start = performance.now();
      return next
        .handle(request)
        .pipe(
          tap(() => {
            const time = `${(performance.now() - start)} ms`;
            console.group('- Time interceptor -');
            console.log(`Request URL: ${request.url}`);
            console.log(`Response time: ${time}`);
            console.groupEnd();
          })
        );
    }
    return next.handle(request);
  }
}


