import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = JSON.parse(localStorage.getItem('user')!).stsTokenManager.accessToken;
    const jwt_string = "Bearer ".concat(jwt.toString());
    return next.handle(httpRequest.clone({ setHeaders: {jwt_string}}));
  }
}
