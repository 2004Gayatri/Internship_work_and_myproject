import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HCILHttpInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
    const isLoginApi =  req.url.includes('login');
    if(isLoginApi) {
      return next.handle(req);
    }
    
    const token = sessionStorage.getItem('currentToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    const reqWithAuth = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return token ? next.handle(reqWithAuth) : next.handle(req);
  }
}