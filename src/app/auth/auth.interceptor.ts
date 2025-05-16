import { HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, switchMap, throwError } from "rxjs";


export const authTokenInterceptor: HttpInterceptorFn = (req , next) => {
    const authService = inject(AuthService);
    const token = authService.token;

    if(!token) return next(req);

    const addToken = (req: HttpRequest<any>, token: string) => {
        return req.clone({
        setHeaders:{
            Authorization: `Bearer ${token}`
        }
    })
    }

     const refreshAndProcced = (
        authService:AuthService,
        req:HttpRequest<any>, 
        next:HttpHandlerFn) => {
            return authService.refreshAuthToken()
            .pipe(
                switchMap((res) => {
                   return next(addToken(req, res.access_token))
                })
            )
    }
  
    return next(addToken(req, token))
        .pipe(
            catchError((error) => {
                if(error.status === 403){
                    return refreshAndProcced(authService, req, next)
                }
                return throwError(error)
        })
    )

   

}