import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { forkJoin, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchConsumerService {
  URL_nbr_total_tweet =
    environment.elasticSearchServer + '_search?source={"query":{"bool":{"must_not":[{"match":' +
    '{"categorie":4}}]}}}&source_content_type=application/json'; // on enleve la catégorie 4 puisqu'elle n'est pas affiché dans le dashboard

  constructor(public http: HttpClient) { }

  /**
   * @description récupére tout les tweets de la journée pour une page donnée
   * @param from_page
   */
  get_total_number_tweet_today(from_page): Observable<any> {
    const URL_tweet_today =
      environment.elasticSearchServer + '_search?source={"query": { "bool": { "must": [ { "range": { "date": { "gt": "' +
      this.format_date_today().date_today_minuit +
      '","lt":"' +
      this.format_date_today().date_today_now +
      '"}}}]}}}&source_content_type=application/json&from=' +
      from_page;
    return this.http.get(encodeURI(`${URL_tweet_today}`));
  }

  /**
   * @description récupére tout les tweets du mois passé pour un model
   */
  get_total_number_tweet_last_month(model): Observable<any> {
    const URL_tweet_last_month =
      environment.elasticSearchServer + model + '/_search?source={"query": { "bool": { "must": [ { "range": { "date": { "gt": "' +
      this.format_last_month().last_month_debut +
      '","lt":"' +
      this.format_last_month().last_month_fin +
      '"}}}]}}}&source_content_type=application/json';
    return this.http.get(encodeURI(`${URL_tweet_last_month}`));
  }
  /**
   * @description récupére tout les tweets de la semaine passée pour un model
   */
  get_total_number_tweet_last_weekModel(model): Observable<any> {
    const URL_tweet_last_month =
      environment.elasticSearchServer + model + '/_search?source={"query": { "bool": { "must": [ { "range": { "date": { "gt": "' +
      this.format_last_week().date_week_debut +
      '","lt":"' +
      this.format_last_week().date_week_fin +
      '"}}}]}}}&source_content_type=application/json';
    return this.http.get(encodeURI(`${URL_tweet_last_month}`));
  }
  /**
   *
   * @param from_page récupére tout les tweets de la semaine pour une page donnée
   */
  get_total_number_tweet_last_week(from_page): Observable<any> {
    const URL_tweet_last_week =
      environment.elasticSearchServer + '_search?source={"query": { "bool": { "must": [ { "range": { "date": { "gt": "' +
      this.format_last_week().date_week_debut +
      '","lt":"' +
      this.format_last_week().date_week_fin +
      '"}}}]}}}&source_content_type=application/json&from=' +
      from_page;
    return this.http.get(encodeURI(`${URL_tweet_last_week}`));
  }

  /**
   * @description récupére tout les tweets de la semaine pour un model et une page donnée
   */
  get_number_tweet_last_week_by_model_and_page(
    model,
    from_page
  ): Observable<any> {
    const URL_tweet_last_week_by_categorie =
      environment.elasticSearchServer + model + '/_search?source={"query": { "bool": { "must": [{ "range": { "date": { "gt": "' +
      this.format_last_week().date_week_debut +
      '","lt":"' +
      this.format_last_week().date_week_fin +
      '"}}}]}}}&from=' +
      from_page +
      '&source_content_type=application/json';
    return this.http.get(encodeURI(`${URL_tweet_last_week_by_categorie}`));
  }
   /**
   * @description fais d'abord appel a la fonction get_number_tweet_last_week_by_model_and_page afin de récupérer
   * le nombre de tweets de la semaine passée et ensuite récupére ces tweets.
   * @param model
   */
  get_tweets_last_week_by_model(model): Observable<Response> {
    return this.get_number_tweet_last_week_by_model_and_page(model, 0).pipe(
      mergeMap(responseNbrtweets => {
        const request = environment.elasticSearchServer + model +
          '/_search?source={"query": { "bool": { "must": [{ "range": { "date": { "gt": "' +
          this.format_last_week().date_week_debut +
          '","lt":"' +
          this.format_last_week().date_week_fin +
          '"}}}]}}}&source_content_type=application/json&size=' + responseNbrtweets['hits']['total'];
        return this.http.get<Response>(
          encodeURI(request)
        );
      })
    );
  }
  /**
   * @description récupére tout les tweets d'un model sur elasticsearch
   */
  get_total_number_tweetByModel(model): Observable<any> {
    const url = environment.elasticSearchServer + model + '/_search';
    return this.http.get(encodeURI(`${url}`));
  }


  /**
   * @description récupére 10 tweets de maintenant au début de la journée minuit pour une catégorie donnée
   * @param categorie
   */
  getAllTweetToday(categorie): Observable<any> {
    // on remet les bons numéros de catégorie pour elasticsearch
    if (categorie === 4) {
      categorie = 5;
    }
    const URL_SERVE_tweet_compte_today =
      environment.elasticSearchServer + '_search?source=' +
      '{"query": { "bool": { "must": [  {"match" : {"categorie" : ' +
      categorie +
      '}},{ "range": { "date": { "gt": "' +
      this.format_date_today().date_today_minuit +
      '","lt":"' +
      this.format_date_today().date_today_now +
      '"}}}]}}}&source_content_type=application/json&size=10';
    return this.http.get(encodeURI(`${URL_SERVE_tweet_compte_today}`));
  }

  /**
   * @description récupére 10 tweets de la veille pour une catégorie donnée
   */
  getAllTweetYesterday(categorie): Observable<any> {
    // on remet les bons numéros de catégorie pour elasticsearch
    if (categorie === 4) {
      categorie = 5;
    }
    const URL_SERVE_tweet_compte_yesterday =
      environment.elasticSearchServer + '_search?source=' +
      '{"query": { "bool": { "must": [  {"match" : {"categorie" : ' +
      categorie +
      '}},{ "range": { "date": { "gt": "' +
      this.format_date_before(1).date_yesteday_debut +
      '","lt":"' +
      this.format_date_before(1).date_yesterday_fin +
      '"}}}]}}}&source_content_type=application/json&size=10';
    return this.http.get(encodeURI(`${URL_SERVE_tweet_compte_yesterday}`));
  }
  /**
   * @description récupére les tweets par model et par nombre de jours a enlever par rapport a aujoud'hui
   */
  get_tweet_number_with_model_by_day(model, nombre_de_jours_a_enlever_a_ajd): Observable<any> {
    const URL_SERVE_tweet_compte_yesterday =
      environment.elasticSearchServer + model + '/_search?source=' +
      '{"query": { "bool": { "must": [{ "range": { "date": { "gt": "' +
      this.format_date_before(nombre_de_jours_a_enlever_a_ajd)
        .date_yesteday_debut +
      '","lt":"' +
      this.format_date_before(nombre_de_jours_a_enlever_a_ajd)
        .date_yesterday_fin +
      '"}}}]}}}&source_content_type=application/json';
    return this.http.get(encodeURI(`${URL_SERVE_tweet_compte_yesterday}`));
  }
  /**
   * @description a partir d'une liste de chiffres de type [0, 1, 2] => [today, hier, avant-hier],
   * lance plusieurs fois la requete get_tweet_number_with_model_by_day, map les resultats
   * et attends que toutes les réponses soient arrivés avant de renvoyer un tableau contenant le nombre de tweet par jours demandés
   * @param CompanyNames
   */
  getTweetsNumberFromListOfDays(model, days): Observable<Response[]> {
    const observableBatch = [];
    days.forEach((day) => {
      observableBatch.push(this.get_tweet_number_with_model_by_day(model, day).map((data) => data.hits.total));
    });
    return forkJoin(observableBatch);
  }
  /**
   * @description récupére les valeurs du nombre de tweets totaux, le mois dernier et la semaine derniére
   * @param model
   */
  getTotalSavedTweets(model): Observable<Response[]> {
    const observableBatch = [];
    observableBatch.push(this.get_total_number_tweetByModel(model).map((data) => data.hits.total));
    observableBatch.push(this.get_total_number_tweet_last_month(model).map((data) => data.hits.total));
    observableBatch.push(this.get_total_number_tweet_last_weekModel(model).map((data) => data.hits.total));
    return forkJoin(observableBatch);
  }

  /**
   * @description returne la date et l'heure actuelle formatée ainsi que la date d'aujourd'hui a minuit formatée
   */
  format_date_today(): any {
    const today_date_now = new Date();
    const hours = today_date_now.getHours();
    today_date_now.setUTCHours(hours); // on rajoute utc afin d'avoir le temps français et d'elasticsearch
    const split = today_date_now.toISOString().split('.');
    const date_today_now = split[0];
    const today_date_minuit = new Date();
    today_date_minuit.setUTCHours(0, 0, 0); // on rajoute utc afin d'avoir le temps français et d'elasticsearch
    const split2 = today_date_minuit.toISOString().split('.'); // convertit au format ISO
    const date_today_minuit = split2[0];
    return {
      date_today_now: date_today_now,
      date_today_minuit: date_today_minuit
    };
  }

  /**
   * @description retourne pour un nombre de jour en moins par rapport a aujourd'hui la date de début et de fin de la journée
   * @param nombre_de_jours_en_moins_par_rapport_a_ajd
   */
  format_date_before(nombre_de_jours_en_moins_par_rapport_a_ajd): any {
    const yesterday_date = new Date();
    const today = yesterday_date.getDate();
    const yesterday = today - nombre_de_jours_en_moins_par_rapport_a_ajd;
    yesterday_date.setUTCDate(yesterday);

    yesterday_date.setUTCHours(0, 0, 0); // on rajoute utc afin d'avoir le temps français
    const split2 = yesterday_date.toISOString().split('.');
    const date_yesterday_debut = split2[0];

    yesterday_date.setUTCHours(23, 59, 59);
    const split3 = yesterday_date.toISOString().split('.');
    const date_yesterday_fin = split3[0];
    return {
      date_yesteday_debut: date_yesterday_debut,
      date_yesterday_fin: date_yesterday_fin
    };
  }

  /**
   * @description retourne la date de début et de fin du mois dernier
   */
  format_last_month(): any {
    const date = new Date();
    const month = date.getMonth();
    date.setMonth(month - 1);
    date.setDate(1);
    date.setUTCHours(0, 0, 0);
    const split2 = date.toISOString().split('.');
    const last_month_debut = split2[0];

    const date2 = new Date();
    const month2 = date2.getMonth();
    date2.setMonth(month2 - 1);
    date2.setDate(30);
    date2.setUTCHours(23, 59, 59);
    const split3 = date2.toISOString().split('.');
    const last_month_fin = split3[0];

    return {
      last_month_debut: last_month_debut,
      last_month_fin: last_month_fin
    };
  }

  /**
   * @description retourne la date de début et de fin de la semaine dérniére
   */
  format_last_week(): any {
    const date = new Date();
    let week = date.getDate();
    const month = date.getMonth();
    if (week < 8) {
      week = week + 30;
      date.setMonth(month - 1);
    }
    date.setDate(week - 7);
    const last_week_debut = date;
    const split3 = last_week_debut.toISOString().split('.');
    const date_week_debut = split3[0];
    const last_week_fin = new Date();
    const split = last_week_fin.toISOString().split('.');
    const date_week_fin = split[0];
    return { date_week_debut: date_week_debut, date_week_fin: date_week_fin };
  }

  /**
   * Exécute la requête sur la BDD Elastic Search avec les filtres reçus depuis le catalogue
   * @param keywords Mots-clés issus de la page catalogue
   * @param model nom du modéle d'apprentissage que l'on souhaite utiliser, qui est le nom de l'index d'elasticsearch
   * @param publisher Éditeurs des datasets, issues de la page catalogue
   * @param geoShape Zone rectangulaire tracée dans la page catalogue
   * @param fromDatasetNumber Index de départ de la recherche
   * @param nbrDatasetAfficher Nombre de résultats de la requête
   * geoShape doit étre de la forme que l'on peut voir dans le champs coordinates ci-dessus
   */
  public getDataWithFilters(
    keywords: any,
    model: any,
    rangeDates: any[], // format ['begin date', 'end date']
    fromDatasetNumber: any,
    nbrDatasetAfficher: any
  ): Observable<any> {
    // Formalise la requête pour quelle soit lancée sur Elastic Search
    const query = {
      sort: [{ date: { order: 'desc' } }],
      query: {
        bool: {
          must: [
            { multi_match: { query: 'keyword', operator: 'and' } },
            {
              range: {
                date: { gte: 'beginDate', lte: 'endDate' }
              }
            }
          ]
        }
      }
    };

    if (keywords === null) {
      query.query.bool.must[0] = null;
    } else {
      query.query.bool.must[0].multi_match.query = keywords;
    }
    if (rangeDates === null) {
      query.query.bool.must[1] = null;
    } else {
      query.query.bool.must[1].range.date.gte = rangeDates[0];
      query.query.bool.must[1].range.date.lte = rangeDates[1];
    }

    query.query.bool.must = query.query.bool.must.filter(function (x) {
      return x !== null;
    });

    const url =
      environment.elasticSearchServer + model +  '/_search?source=' +
      JSON.stringify(query) +
      '&from=' +
      fromDatasetNumber +
      '&size=' +
      nbrDatasetAfficher +
      '&source_content_type=application/json';
    return this.http.get(encodeURI(url));
  }
}
