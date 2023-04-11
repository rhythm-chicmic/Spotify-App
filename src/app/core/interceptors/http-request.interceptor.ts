import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { STORAGE_KEYS } from 'src/app/common/constants';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {



  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return next.handle(request);
  }
}
