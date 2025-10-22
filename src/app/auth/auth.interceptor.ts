import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly refreshUrl = `${environment.apiUrl}/auth/refresh`;
  constructor(private authService: AuthService, private http: HttpClient) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();

    let clonedRequest = req;
    if (token) {
      clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const refreshToken = this.authService.getRefreshToken();
          if (refreshToken) {
            return this.http
              .post<{ accessToken: string }>(this.refreshUrl, {
                refresh_token: refreshToken,
              })
              .pipe(
                switchMap((res) => {
                  localStorage.setItem('access_token', res.accessToken);
                  const retryReq = req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${res.accessToken}`,
                    },
                  });
                  return next.handle(retryReq);
                }),
                catchError((err) => {
                  this.authService.logout();
                  return throwError(() => err);
                })
              );
          } else {
            this.authService.logout();
          }
        }
        return throwError(() => error);
      })
    );
  }
}
