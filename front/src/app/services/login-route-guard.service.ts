import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { LocalStorageService } from 'angular-2-local-storage';


@Injectable({
  providedIn: 'root'
})
export class LoginRouteGuardService implements CanActivate {

  constructor(private loginService: UserService,  private router: Router, private localStorageService: LocalStorageService) {
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const role = this.loginService.getRoles();
      const subscriptions = this.loginService.getSubscriptions();
      const url = state.url;
      // handle any redirects if a user isn't authenticated
      if (this.loginService.isSessionExpired()) {
        // redirect the user
        this.router.navigate(['/login']);
        return false;
      }
      if (!this.hasAccess(role, subscriptions, url)) {
        window.location.href =
          'https://platform.sinay.fr/platform/pages/home';
        return false;
      }

      return true;
  }
  /**
   * Vérifie si l'utilisateur à le droit d'accéder à la page cible
   * @param role Rôle de l'utilisateur
   * @param subscriptions Abonnements de l'utilisateur
   * @param url URL de la page cible
   */
  private hasAccess(role, subscriptions, url): boolean {
    // Prend en charge toutes les redirections selon le rôle et les abonnements de l'utilisateur
    if (role) {
      for (let i = 0; i < role.length; i++) {
        if (role[i].authority === 'ROLE_ADMIN') {
          return true;
        }
        if (role[i].authority === 'ROLE_SINAY') {
          return true;
        }
        if (role[i].authority === 'ROLE_CUSTOMER') {
          for (let y = 0; y < subscriptions.length; y++) {
            if (subscriptions[y].application.name === 'APPLICATION_NEWS_CATCHER') {
              return true;
            }
          }
          // vérifie les accès de l'utilisateur et le renvoi sur la page home ou non en fonction
          return false;
        }
      }
    }
  }
}
