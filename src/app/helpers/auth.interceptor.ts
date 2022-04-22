import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let apiReq = request.clone({ url: `http://localhost:3000/${request.url}` });
    apiReq = apiReq.clone({
      setHeaders: { 'Content-Type': 'application/json' }
    });
    return next.handle(apiReq);
  }
}
