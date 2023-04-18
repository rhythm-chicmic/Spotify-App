import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,

} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import  Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { PATHS } from 'src/app/common/constants';

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
      catchError((error: any) => {
        
        if (error.status === 401 || error.status === 0) {
          this.Toast.fire({
            icon: 'error',
            title: 'Session Expired'
          })
          this.router.navigate([PATHS.AUTH.LOGIN])
        } 
        return of(error)
      }),
    )
  }
}
