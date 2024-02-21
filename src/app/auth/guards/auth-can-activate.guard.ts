//Se importa esta librería para poder inyectar dependencias sin constructor de clase
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): boolean | Observable<boolean> => {

  //se inyectan el AuthService y el Router

  const authService: AuthService = inject( AuthService );

  const router: Router = inject( Router );

  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => {
        if ( !isAuthenticated ) {
          router.navigate(['/auth/login']);
        }
      })
    );
};

export const authCanActivateGuard: CanActivateFn = ( route: ActivatedRouteSnapshot,state: RouterStateSnapshot ): boolean | Observable<boolean> => { //Hay que tener en cuenta el tipado CanActiveFn

  // console.log('CanActivate');

  // console.log({ route, state });

  return checkAuthStatus();

};
