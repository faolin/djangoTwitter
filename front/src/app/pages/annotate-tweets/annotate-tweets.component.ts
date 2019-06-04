import { Component, OnInit } from '@angular/core';
import { DjangoService } from './../../services/django.service';
import { UserService } from '../../services/user.service';
import { VisualizationService } from '../../services/visualization.service';

@Component({
  selector: 'app-annotate-tweets',
  templateUrl: './annotate-tweets.component.html',
  styleUrls: ['./annotate-tweets.component.scss']
})
export class AnnotateTweetsComponent implements OnInit {
  // id du tweet que l'on affiche
  tweetId: any = null;
  // liste des keywords actifs
  public activeKeywords = [];
  // text dans l'input d'ajout de keyword
  keywordTyped: string = null;
  // affichage ou non de la fenetre de confirmation d'ajout de keywords
  public showModal = false;
  // affichage ou non de la fenetre pour rentrer le nom du modéle
  public showModalSaveModel = false;
  public nbrTweetsAnnoted = 0;
  // affichage ou non du message indiquant qu'aucun tweets n'a été trouvés pour le moment
  public noTweetFound = false;
  // permet de savoir quand est ce que l'icone du refresh tourne ou non
  public refreshingTweet = false;

  public accuracy = 0;
  public precision = 0;
  public recall = 0;
  public emailUser: String;
  // nom du modéle choisi par l'utilisateur
  public nameOfTheModel: String;
  constructor(
    private djangoService: DjangoService,
    private userService: UserService,
    private visualizationService: VisualizationService
  ) {
    this.emailUser = this.userService.getUser().email.toString();
  }

  ngOnInit() {
    this.getLastTweet();
    this.getNumberTweetsAnnoted();
    // on récupére les mots clés actifs de l'utilisateur enregistrés sur la base
    this.djangoService.getAllActiveKeywords(this.emailUser).subscribe(
      data => {
        if (data.keywords.length > 0) {
          this.activeKeywords = data.keywords;
          // si il y a des mots clés actifs, l'on stoppe au cas ou il ya déja un stream actif et on lance un nouveau stream
          this.stopAndStartStream();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * @description appel le service django pour récupérer le nombre de tweets annotés par l'utilisateur
   */
  getNumberTweetsAnnoted() {
    this.djangoService.getNbrTweetsAnnoted(this.emailUser).subscribe(
      data => {
        this.nbrTweetsAnnoted = data.nbrTweetsAnnoted;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * @description permet de récupérer les scores de recall, precision et accuracy
   */
  calculateScores() {
    this.djangoService.calculateApprentissage(this.emailUser).subscribe(
      data => {
        console.log(data);
        this.accuracy = Math.round(data.accuracy);
        this.precision = Math.round(data.precision * 100);
        this.recall = Math.round(data.recall * 100);
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * @description permet de stopper et de redémarrer le stream (lancer au chargement de la page)
   */
  stopAndStartStream() {
    this.djangoService
      .stopAndStartStream(this.activeKeywords, this.emailUser, null)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
  /**
   * @description permet de stopper le stream, supprimer la base de tweets et redémarrer un novueau stream
   *  avec des mots clés choisis par l'utilisateur
   */
  stopDeleteDbTweetsStartStreamDjango() {
    this.tweetId = null;
    this.noTweetFound = true;
    // une fois que l'utilisateur a cliqué sur confirmer on enléve la fenetre de suppression et on démarre le stream
    this.showModal = false;
    this.djangoService
      .stopDeleteDbTweetsAndStartStream(
        this.activeKeywords,
        this.emailUser,
        null
      )
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
  /**
   * @description permet d'animer l'icone de rafraichissement du dernier tweet
   */
  animateRefreshIcone() {
    this.refreshingTweet = true;
    setTimeout(() => this.refreshingTweet = false, 2000);
  }
  /**
   * @description permet de récupérer le dernier tweet non annotés de la base de données du serveur django
   */
  getLastTweet() {
    this.djangoService.getLastTweet(this.emailUser).subscribe(
      data => {
        this.noTweetFound = false;
        this.tweetId = data.tweet_id;
        this.refreshingTweet = false;
        this.getNumberTweetsAnnoted();
      },
      error => {
        console.log(error);
        // si le serveur nous renvoie un 404 on sait que c'est parcequ'il n'a pas trouvé de tweets non annotés
        if (error.status === 404) {
          this.noTweetFound = true;
          this.tweetId = null;
        }
      }
    );
  }
  /**
   * @description permet d'annoter un tweet et d'envoyer l'annotation au serveur django qu'il l'enregistre sur la base
   * @param annotation
   */
  annotateTweet(annotation) {
    console.log(this.tweetId);
    this.djangoService.annotateTweet(this.tweetId, annotation).subscribe(
      data => {
        this.tweetId = null;
        this.getLastTweet();
        console.log(data);
      },
      error => {
        console.log(error);
        /*si le serveur nous renvoie un 404 on sait que c'est parceque le stream a redémarré, la base a été supprimé
        et l'utilisateur essaye d'annoter un tweet qui n'existe plus dans la base */
        if (error.status === 404) {
          this.noTweetFound = true;
          this.tweetId = null;
        }
      }
    );
  }
  /**
   * @description Fonction lancée lorsque l'on clique sur le bouton "cancel" ou sur la croix en haut du modal
   */
  public closeModal() {
    this.showModal = false;
    this.showModalSaveModel = false;
    document.body.classList.remove('modal-active');
  }
  /**
   * @description permet de rajouter un keyword a la liste des keywords actifs
   */
  public addKeyword() {
    if (this.keywordTyped !== null) {
      // on rajoute le mot clé a la liste des keyword actifs
      this.activeKeywords.push(this.keywordTyped);
      // l'on supprime ce que viens de taper l'utilisateur
      this.keywordTyped = null;
    }
  }

  /**
   * Supprime un Keyword actif de l'affichage
   * @param event Évènement déclenché par le bouton "x" d'un Keyword actif
   */
  public activeKeywordDelete(event) {
    // Récupère le label du Keyword à supprimer dans la vue
    const toDelete = event.target.parentElement.querySelector(
      '.active-keyword-label'
    ).innerHTML;

    // Parcourt tous les Keyword actifs et supprime celui dont le label est égal à celui récupéré
    for (let i = 0; i < this.activeKeywords.length; i++) {
      if (this.activeKeywords[i] === toDelete) {
        this.activeKeywords.splice(i, 1);
      }
    }
  }
  /**
   * @description appel au service pour sauvegarder le modéle d'apprentissage de l'utilisateur
   */
  public saveModel() {
    this.showModalSaveModel = false;
    this.djangoService.saveModel(this.nameOfTheModel, this.emailUser).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
        if (error.status === 409) {
          this.visualizationService.openToastr(
            'Name already used',
            'Error',
            'error');
        }
      }
    );
  }
}
