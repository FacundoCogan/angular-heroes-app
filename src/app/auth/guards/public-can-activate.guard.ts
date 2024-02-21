import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

const checkAuthStatus = (): boolean | Observable<boolean> => {

  //se inyectan el AuthService y el Router

  const authService: AuthService = inject( AuthService );

  const router: Router = inject( Router );

  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => {
        if ( isAuthenticated ) {
          router.navigate(['./']);
        }
      }),
      map( isAuthenticated => !isAuthenticated )
    );
};

export const publicCanActivateGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean | Observable<boolean> => {

  return checkAuthStatus();
};
