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
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const hardcodedtoken = '1d38d128-0671-4121-8084-f6332a992a40'; 
      let header = request.clone({
      setHeaders: {
        'token' :hardcodedtoken,
      }
    });

    return next.handle(header);
  }
}
