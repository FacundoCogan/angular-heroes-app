import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

import { authCanActivateGuard } from './auth/guards/auth-can-activate.guard';
import { authCanMatchGuard } from './auth/guards/auth-can-match.guard';
import { publicCanActivateGuard } from './auth/guards/public-can-activate.guard';
import { publicCanMatchGuard } from './auth/guards/public-can-match.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
    canActivate: [ publicCanActivateGuard ],
    canMatch: [ publicCanMatchGuard ],
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule),
    canActivate: [ authCanActivateGuard ],
    canMatch: [ authCanMatchGuard ]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
