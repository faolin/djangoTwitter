import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ElasticsearchConsumerService } from '../../../services/elasticsearch-consumer.service';
import { IMyDrpOptions } from 'mydaterangepicker';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-social-feed',
  templateUrl: './social-feed.component.html',
  styleUrls: ['./social-feed.component.scss'],
  providers: []
})
export class SocialFeedComponent implements OnInit, OnChanges {
  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy'
  };
  // Initialized to specific date (09.10.2018).
  public model: any = { date: { year: 2018, month: 10, day: 9 } };
  // Trois possibilités du menu déroulant permettant de changer le nombre de tweet par page
  public tweetNumberByPage = [
    { id: 0, number: 10 },
    { id: 1, number: 20 },
    { id: 2, number: 30 }
  ];
  public linkNumberPagination = 7; // Minimum 3
  public tweetNumberShown = 12;
  public keyword = null; // mot clé entré par l'utilisateur
  public dateRange = null; // range date choisies par l'utilisateur

  // tweets
  public tweets: any[] = [];
  public page = 1;
  public total = 0;

  public tweetsLoaded = false;
  public notweetsFound = false;
  public emailUser: String;

  // le modéle d'apprentissage utilisé
  @Input() modelActif: any;


  constructor(private elasticsearchService: ElasticsearchConsumerService, private userService: UserService) {
    this.emailUser = this.userService.getUser().email.toString();
  }

  ngOnInit() {
  }
   /* a chaque arrivée d'input (donc du modéle actif) l'on relance la fonction getElasticSearchData pour récupérer les tweets
   du modéle spécifié par l'utilisateur*/
  ngOnChanges() {
    this.tweetsLoaded = false;
    if (this.modelActif != null) {
    this.getElasticSearchData(this.modelActif);
    }
   }


  /**
   *
   * Récupère les données elastic search avec la valeur des filtres, les pages choisies et le nombre de tweet par page et le nom du model
   * Modifie l'affichage du logo si le tweet est dans la liste de souhait
   *
   * @param nameOfTheModel
   * @param keyword
   * @param dateRange
   */
  public getElasticSearchData(nameOfTheModel) {
    const indexStart = this.tweetNumberShown * (this.page - 1);
    this.elasticsearchService
      .getDataWithFilters(
        this.keyword,
        nameOfTheModel,
        this.dateRange,
        indexStart,
        this.tweetNumberShown
      )
      .subscribe(
        data => {
          this.total = data.hits.total;
          this.tweets = data.hits.hits;
          this.tweetsLoaded = true;
          if (this.total === 0) {
            this.notweetsFound = true;
          } else {
            this.notweetsFound = false;
          }
        },
        error => {
          console.log(error);
          this.tweetsLoaded = true;
          this.notweetsFound = true;
        }
      );
  }
  /**
   * @description récupére les métadonnées d'un tweet et renvoie son id
   * @param tweetMetaData
   */
  parseTweet(tweetMetaData) {
    const idTweet = JSON.parse(tweetMetaData).id_str;
    return idTweet;
  }


  /**
   * @description permet de faire une recherche par mots clés sur la base elasticsearch par catégorie de tweets
   * @param event evenement lorsque l'utilisateur rentre un mot clé
   */
  searchKeyword(event) {
    this.tweetsLoaded = false;
    // on récupére la valeur du mot clé entré par l'utilisateur
    this.keyword = event.srcElement.value;
    // cette boucle permet de réafficher tout les tweets de la catégorie si l'input de recherche est vide
    if (this.keyword === '') {
      this.keyword = null;
    }
    // on envoie la requête a elasticsearch qui nous renvoie les tweets concernés
    this.getElasticSearchData(this.modelActif);
  }

  /**
   * @description permet d'effectuer une recherche sur elasticsearch par date avec les 2 dates choisies par l'utilisateur
   * @param event
   */
  onDateRangeChanged(event) {
    this.tweetsLoaded = false;
    if (event.beginJsDate === null) {
      this.dateRange = null;
      // on envoie la requête a elasticsearch qui nous renvoie les tweets concernés
      this.getElasticSearchData(this.modelActif);
    } else {
      const beginDateSplit = event.formatted.split('-')[0].split('.');
      const beginDate =
        beginDateSplit[2].replace(/ /g, '') +
        '-' +
        beginDateSplit[1] +
        '-' +
        beginDateSplit[0];
      const endDateSplit = event.formatted.split('-')[1].split('.');
      const endDate =
        endDateSplit[2] +
        '-' +
        endDateSplit[1] +
        '-' +
        endDateSplit[0].replace(/ /g, '');

      // on assinge les dates choisies par l'utilisateur
      this.dateRange = [beginDate, endDate];
      // on envoie la requête a elasticsearch qui nous renvoie les tweets concernés
      this.getElasticSearchData(this.modelActif);
    }
  }
}
