import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sideBarItems = [
    {
      label: 'List',
      icon: 'label',
      url: './list'
    },
    {
      label: 'Add',
      icon: 'add',
      url: './new-hero'
    },
    {
      label: 'Search',
      icon: 'search',
      url: './search'
    },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ){}

  get user():User|undefined{
    return this.authService.currentUser;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
