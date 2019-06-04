import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static token: string = null;
  static user: User = null;
  static roles: any[] = [];
  static subscriptions = [];

  constructor(private localStorageService: LocalStorageService) {
    if (UserService.token === null || UserService.user === null) {
      UserService.user = this.localStorageService.get<User>('user');
      UserService.token = this.localStorageService.get<string>('token');
      UserService.roles = this.localStorageService.get<string[]>('roles');
      UserService.subscriptions = this.localStorageService.get<string[]>(
        'subscriptions'
      );
    }
  }

  /**
   * @description on envoie la classe utilisateur au webservice pour qu'il mette ses informations a jour
   * @param user
   */
  updateUser(user: User): boolean {
    UserService.user = user;

    const saveUser = this.localStorageService.set('user', user);

    return saveUser !== null;
  }

  /**
   * @description l'on envoie la classe utilisateur, les roles et le token de l'utilisateur a un webservice pour qu'il sauvegarde
   * ses informations
   * @param user
   * @param token
   * @param roles
   * @param subscriptions
   */
  saveUser(user: User, token: string, roles: string[], subscriptions: any[]
    ): boolean {
    UserService.token = token;
    UserService.user = user;
    UserService.roles = roles;
    UserService.subscriptions = subscriptions;

    const saveToken = this.localStorageService.set('token', token);
    const saveUser = this.localStorageService.set('user', user);
    const saveRoles = this.localStorageService.set('roles', roles);
    const saveSubscriptions = this.localStorageService.set(
      'subscriptions',
      subscriptions);

    return saveToken && saveUser && saveRoles && saveSubscriptions ;
  }

  /**
   * @description remove l'utilisateur dans la mémoire locale
   */
  removeUser(): boolean {
    UserService.user = null;
    UserService.token = null;
    UserService.roles = null;
    UserService.subscriptions = null;

    const removeUser = this.localStorageService.remove('user');
    const removeToken = this.localStorageService.remove('token');
    const removeRoles = this.localStorageService.remove('roles');
    const removesubscriptions = this.localStorageService.remove(
      'subscriptions'
    );
    return removeToken && removeUser && removeRoles && removesubscriptions;
  }

  /**
   * @description vérifie que le token dans la mémoire locale est toujours actif
   */
  isSessionExpired(): boolean {
    try {
      if (UserService.token === null || UserService.user === null) {
        return true;
      }

      const jwtHelper: JwtHelperService = new JwtHelperService();

      if (jwtHelper.isTokenExpired(UserService.token.toString())) {
        return true;
      }
      return false;
    } catch (ex) {
      return true;
    }
  }

  /**
   * @description récupére le token de l'utilisateur dans la mémoire locale
   */
  getToken(): String {
    return UserService.token;
  }

  /**
   * @description récupére les infos de l'utilisateur dans la mémoire locale
   */
  getUser(): User {
    return UserService.user;
  }

  /**
   * @description récupére les roles de l'utilisateur dans la mémoire locale
   */
  getRoles(): any[] {
    return UserService.roles;
  }
   /**
   * Renvoie les abonnements de l'utilisateur
   */
  public getSubscriptions() {
    return UserService.subscriptions;
  }

  /**
   * @description vérifie que l'utilisateur a bien un role donnée en paramtéres
   * @param roleIn
   */
  hasRole(roleIn: string): boolean {
    if (!roleIn) {
      return false;
    }
    if (UserService.roles === null) {
      return false;
    }
    if (roleIn === 'ROLE_ANY') {
      return true;
    }
    if (UserService === null || UserService.roles === null) {
      return false;
    }
    for (const role of UserService.roles) {
      if (roleIn === role['authority']) {
        return true;
      }
    }
    return false;
  }

  /**
   * @description renvoie a la page d'acceuil
   */
  getDefaultPath() {
    return '/pages';
  }
}
