import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AppState } from '../../../app.state';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-navbar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [  ]
})

export class NavbarComponent implements OnInit {
    public isMenuCollapsed = false;
    public email = '';

    constructor(private _state: AppState, private router: Router, private userService: UserService) {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    ngOnInit(): void {
        if (!this.userService.isSessionExpired()) {
            this.email = this.userService.getUser().email.toString();
          }
    }

    public closeSubMenus() {
       /* when using <az-sidebar> instead of <az-menu> uncomment this line */
      // this._sidebarService.closeAllSubMenus();
    }

    public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);

    }

    public logout() {
        localStorage.removeItem('sinay-app-twitter-user');
        this.router.navigate(['/login']);
    }
}
