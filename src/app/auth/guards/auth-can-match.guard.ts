import { CanMatchFn, Route, Router, UrlSegment } from "@angular/router";
import { inject } from "@angular/core";

import { Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

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

export const authCanMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]): boolean | Observable<boolean> => { //Tipado CanMatchFN

  // console.log('CanMatch');

  // console.log({ route, segments });

  return checkAuthStatus();

};
