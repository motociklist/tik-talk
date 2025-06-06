import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
import { Router } from "@angular/router"

export const canActivateAuth = () => {
  const isLoggdIn = inject(AuthService).isAuth;

  if(isLoggdIn){
    return true
  }

  return inject(Router).createUrlTree(['/login'])
}