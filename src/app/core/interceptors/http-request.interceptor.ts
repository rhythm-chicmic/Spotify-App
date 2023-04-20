import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,

} from '@angular/common/http';
import { Observable,  tap } from 'rxjs';
import  Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Injectable({
  providedIn:'root'
})
export class HttpRequestInterceptor implements HttpInterceptor {
   Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  constructor(private router:Router){}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    

    return next.handle(request).pipe(
      tap((event:HttpEvent<any>)=>{
        if(event instanceof HttpResponse && event.status===401){
            Swal.fire({
              icon:'error',
              title:'Session Expired'
            })
        }
      })
    )
  }
}
