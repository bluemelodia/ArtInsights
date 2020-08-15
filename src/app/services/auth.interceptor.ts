import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenKey } from '../app.consts';

@Injectable() 
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /* Retrieve the token from local storage. */
        const idToken = localStorage.getItem(AuthTokenKey);
        console.log("Auth Interceptor - ID token: ", idToken);

        if (idToken) {
            /* Clone the HTTP headers, and add an extra Authorization header containing the token. */
            const cloned = req.clone({
                headers: req.headers.set("Authorization", idToken)
            });
            return next.handle(cloned);
        }
        else {
            /* If the token is not present, the request goes through to the server unmodified. */
            return next.handle(req);
        }
    }
}