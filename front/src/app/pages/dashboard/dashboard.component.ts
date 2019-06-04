import { Component, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DjangoService } from '../../services/django.service';
import { ElasticsearchConsumerService } from '../../services/elasticsearch-consumer.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // modéle d'apprentissage choisi par l'utilisateur
  @Output() modelActif = null;
  // adresse email de l'utilisateur
  emailUser: string;
  Requete_nbr_tweet_today: any = 'N/A';
  Requete_nbr_tweet_yesterday: any = 'N/A';
  nbrTweetTotal: any = 'N/A';
  nbrTweetLastMonth: any = 'N/A';
  nbrTweetLastWeek: any = 'N/A';

  allModels = null;

  constructor(
    private userService: UserService,
    private djangoService: DjangoService,
    private elasticsearchConsumerService: ElasticsearchConsumerService
  ) {
    this.emailUser = this.userService.getUser().email.toString();
  }

  ngOnInit() {
    // on récupére le modéle actif de l'utilisateur ainsi que tout ses modéles
    this.djangoService.getActifModel(this.emailUser).subscribe(
      data => {
        this.modelActif = data.modelActif;
        this.calculateDataWithNewModel();
      },
      error => {
        console.log(error);
      }
    );
    this.djangoService.getModels(this.emailUser).subscribe(
      data => {
        this.allModels = data.models;
      },
      error => {
        console.log(error);
      }
    );
  }
  /**
   * @description fonction lancée des que l'on change de modéle pour mettre a jour les indicateurs
   */
  calculateDataWithNewModel() {
    this.calculateTweetNumberTodayYesterday();
    this.calculateNumberTweetTotalIndicator();
    this.changeActifModel();
    this.startStream();
  }

  /**
   * @description démarre le stream avec le modéle choisi par l'utilisateur
   */
  public startStream() {
    if (this.modelActif !== null) {
      // on envoie une liste de mot clé vides puisque django va récupérer les mots clés associés a notre modéle directement
      this.djangoService.stopAndStartStream([], this.emailUser, this.modelActif).subscribe(
        data => {
          console.log(data);
        }, error => {
          console.log(error);
        }
      );
    }
  }
  /**
   * @description change de le modéle actif dans la base afin que quand l'utilisateur raffraichisse la page il arrive sur son modéle actif
   */
  public changeActifModel() {
    if (this.modelActif !== null) {
      this.djangoService
        .changeActifModel(this.emailUser, this.modelActif)
        .subscribe(
          data => {
          },
          error => {
            console.log(error);
          }
        );
    }
  }
  /**
   * @description récupére le nbr de tweets total, du mois dernier et de la semaine derniére
   */
  calculateNumberTweetTotalIndicator() {
    if (this.modelActif !== null) {
      this.elasticsearchConsumerService
        .getTotalSavedTweets(this.modelActif)
        .subscribe(
          data => {
            this.nbrTweetTotal = data[0];
            this.nbrTweetLastMonth = data[1];
            this.nbrTweetLastWeek = data[2];
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.nbrTweetTotal = 'N/A';
      this.nbrTweetLastMonth = 'N/A';
      this.nbrTweetLastWeek = 'N/A';
    }
  }
  /**
   * @description permet de calculer le nombre de tweets récupérés aujourd'hui et hier pour un modéle
   */
  calculateTweetNumberTodayYesterday() {
    if (this.modelActif !== null) {
      this.elasticsearchConsumerService
        .getTweetsNumberFromListOfDays(this.modelActif, [0, 1])
        .subscribe(
          data => {
            this.Requete_nbr_tweet_today = data[0];
            this.Requete_nbr_tweet_yesterday = data[1];
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.Requete_nbr_tweet_today = 'N/A';
      this.Requete_nbr_tweet_yesterday = 'N/A';
    }
  }
}
