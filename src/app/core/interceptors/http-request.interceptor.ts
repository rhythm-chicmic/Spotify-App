import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import  Swal from 'sweetalert2'

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {



  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
 
  
    return next.handle(request).pipe(
      tap((event:HttpEvent<any>)=>{
        if(event instanceof HttpResponse && event.status===401){
            Swal.fire({
              icon:'error'
            })
        }
      })
    )
  }
}
