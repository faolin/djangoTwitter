import { Injectable } from '@angular/core';
import { ToastrService, GlobalConfig } from 'ngx-toastr';

/**
 * Service contenant des fonctions d'affichage communes à plusieurs composants
 */
@Injectable({
  providedIn: 'root'
})
export class VisualizationService {
  private options: GlobalConfig;
  /**
   * @constructor
   * @param toastrService Service permettant de créer les messages colorés en haut à droite
   */
  constructor(public toastrService: ToastrService) {
    this.options = this.toastrService.toastrConfig;
  }

  /**
   * Fonction executée lors d'un clic en dehors des inputs avec la directive "platformClickOutside",
   * si l'input est vide, retire la classe "active" de tous les labels de ces inputs
   */
  public platformClickedOutside(isClickedOutside: any): boolean {
    if (!isClickedOutside) {
      const inputs = document.querySelectorAll('.input-material');

      [].forEach.call(inputs, function (input) {
        if (input.value === '') {
          input.parentElement
            .querySelector('.label-material')
            .classList.remove('active');
        }
      });
      return true;
    }
    return false;
  }

  /**
   * Ajoute la class "active" au label de l'input cliqué.
   * @param event Evénement déclenché lors d'un clic sur un des inputs
   */
  public textInputClick(inputEvent: any): boolean {
    inputEvent.stopPropagation();
    document
      .getElementById(inputEvent.target.id)
      .parentElement.querySelector('.label-material')
      .classList.add('active');
    return false;
  }

  /**
   * Ajoute la class "active" au label de l'input qui a subit un changement.
   * @param event Evénement déclenché lors d'un changement sur un des inputs
   */
  public textInputChange(inputEvent: any) {
    document
      .getElementById(inputEvent.target.id)
      .parentElement.querySelector('.label-material')
      .classList.add('active');
  }

  /**
   * Vérifie si une case à cocher est coché ou non
   * @param checkboxID Identifiant de la case à vérifier
   * @returns true si coché, false sinon
   */
  public checkBoxActiveOrNot(checkboxID) {
    if (jQuery('#' + checkboxID).prop('checked') === true) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Crée le Toastr (message coloré en haut à droite) après avoir soumis le formulaire de création du client
   * @param message Message qui sera affiché dans le Toastr
   * @param title Titre du Toastr
   * @param type Type du Toastr définissant la couleur; "warning" : orange, "error" : rouge, "success" : vert
   */
  public openToastr(
    message: string,
    title: string,
    type: string
  ): ToastrService {
    const m = message;
    const t = title;
    const opt = JSON.parse(JSON.stringify(this.options));
    const inserted = this.toastrService[type](m, t, opt);
    return inserted;
  }
}
