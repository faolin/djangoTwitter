import { Component, OnInit, Input } from '@angular/core';

/**
 * Composant graphique permettant de matérialiser l'attente avec un cercle qui tourne
 */
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() height: number;
  @Input() width: number;
  @Input() color;

  public margin: string;
  public heightString: string;
  public widthString: string;
  public border: string;

  constructor() {}

  /**
   * Génère le spinner en fonction des trois paramètres en Input : la hauteur, la largeur et la couleur
   */
  ngOnInit() {
    // Permet de centrer le spinner
    this.margin = -(this.height / 2) + 'px';

    // Permet de garder toujours le même aspect peu importe la largeur et la hauteur
    this.border = this.height / 10 + 'px solid ' + this.color;

    // Permet de mettre les variables input utilisable dans le CSS
    this.heightString = this.height + 'px';
    this.widthString = this.width + 'px';
  }
}
