import { Component, Input, OnChanges } from '@angular/core';
import { CloudData } from 'angular-tag-cloud-module';
import { ElasticsearchConsumerService } from '../../../services/elasticsearch-consumer.service';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  providers: [ElasticsearchConsumerService],
  styleUrls: ['./cloud.component.scss']
})
export class CloudComponent implements OnChanges {
  requete_tweet_last_week: any = null;
  from_page: any = 0;
  all_tweets: any = [];
  @Input() modelActif: any;

  data: CloudData[] = [];
  constructor(
    private elasticsearchConsumerService: ElasticsearchConsumerService
  ) {}

  // a chaque changement de modéle on redessine le nuage de mots
  ngOnChanges() {
    if (this.modelActif !== null) {
      console.log(this.modelActif);
      this.requete_tweet_last_week = null;
      this.from_page = 0;
      this.all_tweets = [];
      this.data = [];
      this.show_cloud(this.modelActif);
    }
  }
  /**
   * @description récupération des tweets par model de la semaine passée a partir d'une page
   * @param model
   * @param from_page
   */
  public get_hastags_number(model, from_page) {
    this.elasticsearchConsumerService
      .get_number_tweet_last_week_by_model_and_page(model, from_page)
      .subscribe(
        data => {
          this.requete_tweet_last_week = data;
          this.process_data(model);
        },
        error => {
          console.error('statusObserver error ...');
          console.error(error);
        }
      );
  }
  /**
   * @description compte le nombre de même hashtags dans une liste
   * @param array
   */
  public count_hashtags(array) {
    const counts = {};

    for (let i = 0; i < array.length; i++) {
      const num = array[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts;
  }
  /**
   * @description retourne les valeurs uniques d'hashtags
   * @param value
   * @param index
   * @param self
   */
  public onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  /**
   * @description alimente la liste des tweets en augmentant de 10 le nombre de tweet a chaque fois jusqu'a ce que tout les tweets aient été
   * récupérés
   * @param model
   */
  public process_data(model) {
    if (this.requete_tweet_last_week == null) {
      return;
    }
    const total_arrondi =
      Math.ceil(this.requete_tweet_last_week.hits.total / 10) * 10;

    for (const tweet in this.requete_tweet_last_week.hits.hits) {
      if (this.requete_tweet_last_week.hits.hits.hasOwnProperty(tweet)) {
        this.all_tweets.push(this.requete_tweet_last_week.hits.hits[tweet]);
      }
    }
    if (this.from_page < total_arrondi) {
      this.from_page = this.from_page + 10;
      this.show_cloud(model);
    }
    return total_arrondi;
  }
  /**
   * @description récupére la structure json de la requête elasticsearch et renvoie la liste des hashtags
   * @param result
   */
  public get_structure_json(result) {
    const structurejson = JSON.parse(result._source.source);
    let hashtags;
    try {
      hashtags = structurejson.extended_tweet.entities.hashtags;
    } catch (error) {
      hashtags = structurejson.entities.hashtags;
    }
    return hashtags;
  }

  /**
   * @description affiche le nuage de mots
   * @param model
   */
  public show_cloud(model) {
    const all_hashtags = new Array();
    if (this.all_tweets.length > 100) {
      return 'limite de hashtags reçus dépassée';
    }
    this.get_hastags_number(model, this.from_page);
    if (this.all_tweets.length === 0) {
      jQuery('#alert').removeClass('hidden');
    } else {
      jQuery('#alert').addClass('hidden');
      for (const tweets of this.all_tweets) {
        const hashtags = this.get_structure_json(tweets);
        if (hashtags.length !== 0) {
          for (const hashtag of hashtags) {
            all_hashtags.push(hashtag.text.toLowerCase());
          }
        }
      }

      const count_hashtags = this.count_hashtags(all_hashtags);
      const hashtags_without_doublons = all_hashtags.filter(this.onlyUnique);
      this.data = [];
      for (const hashtag of hashtags_without_doublons) {
        this.data.push({ text: hashtag, weight: count_hashtags[hashtag] });
      }
    }
  }
}
