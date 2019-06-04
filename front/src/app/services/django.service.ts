import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DjangoService {
  constructor(private http: HttpClient) {}

  /**
   * @description envoie des mots clés et l'adresse de l'utisateur (peut également envoyer le nom d'un modéle qu'il souhaite utiliser
   * a un serveur django pour que celui ci
   * démarre un stream connecté a twitter recupérant des tweets
   * contenant ces mots clés
   * @param keywords
   * @param emailUser
   * @param nameOfTheModel
   */
  public startStream(keywords, emailUser, nameOfTheModel): Observable<any> {
    const data = {
      keywords: keywords,
      user: emailUser,
      nameOfTheModel: nameOfTheModel
    };
    const url = environment.urlDjango + 'startStream';
    return this.http.post(url, data);
  }
  /**
   * @description envoie une requête au serveur django pour arréter le stream en cours
   */
  public stopStream(): Observable<any> {
    const url = environment.urlDjango + 'stopStream';
    return this.http.get(url);
  }
  /**
   * @description supprime les tweets de la base de données
   */
  public deleteDbTweets(emailUser): Observable<any> {
    const data = {
      user: emailUser
    };
    const url = environment.urlDjango + 'deleteTweets';
    return this.http.post(url, data);
  }
  /**
   * @description permet de lancer la requête permettant de stop le stream avant celle permettant de le démarrer
   * @param keywords
   * @param emailUser
   * @param nameOfTheModel
   */
  stopAndStartStream(
    keywords,
    emailUser,
    nameOfTheModel
  ): Observable<Response> {
    return this.stopStream().pipe(
      mergeMap(() => {
        return this.startStream(keywords, emailUser, nameOfTheModel);
      })
    );
  }
  /**
   * @description permet de lancer la requête permettant de stop le stream, supprimer les tweets de la base
   *  puis relancer le stream
   * @param keywords
   * @param emailUser
   * @param nameOfTheModel
   */
  stopDeleteDbTweetsAndStartStream(
    keywords,
    emailUser,
    nameOfTheModel
  ): Observable<Response> {
    return this.stopStream().pipe(
      mergeMap(() => {
        return this.deleteDbTweets(emailUser).pipe(
          mergeMap(() => {
            return this.startStream(keywords, emailUser, nameOfTheModel);
          })
        );
      })
    );
  }
  /**
   * @description envoie une requête au serveur django avec l'email de l'utilisateur pour récupérer sa liste de mots clés actifs
   */
  public getAllActiveKeywords(emailUser): Observable<any> {
    const data = {
      user: emailUser
    };
    const url = environment.urlDjango + 'getActiveKeywords';
    return this.http.post(url, data);
  }
  /**
   * @description envoie une requête au serveur django pour récupérer le dernier tweet non annoté
   */
  public getLastTweet(emailUser): Observable<any> {
    const data = {
      user: emailUser
    };
    const url = environment.urlDjango + 'getLastTweet';
    return this.http.post(url, data);
  }
  /**
   * @description envoie une requête au serveur django avec l'id et l'annotation donnée par l'utilisateur d'un tweet
   * @param id
   * @param annotation
   */
  public annotateTweet(id, annotation): Observable<any> {
    const data = {
      id: id,
      interesting: annotation
    };
    const url = environment.urlDjango + 'annotateTweet';
    return this.http.post(url, data);
  }
  /**
   * @description récupére le nombre de tweets annotés par l'utilisateur
   */
  public getNbrTweetsAnnoted(emailUser): Observable<any> {
    const data = {
      user: emailUser
    };
    const url = environment.urlDjango + 'getNbrTweetsAnnoted';
    return this.http.post(url, data);
  }
  /**
   * @description récupére les scores de l'accuracy, precision et rappel, calculés sur les tweets qu'a annoté l'utilisateur
   */
  public calculateApprentissage(emailUser): Observable<any> {
    const data = {
      user: emailUser
    };
    const url = environment.urlDjango + 'calculateApprentissage';
    return this.http.post(url, data);
  }
  /**
   * @description save le model d'apprentissage
   */
  public saveModel(nameOfTheModel, userEmail): Observable<any> {
    const data = {
      name: nameOfTheModel,
      user: userEmail
    };
    const url = environment.urlDjango + 'saveModel';
    return this.http.post(url, data);
  }
  /**
   * @description get les model d'apprentissage d'un utilisateur grâce a son email
   */
  public getModels(userEmail): Observable<any> {
    const data = {
      user: userEmail
    };
    const url = environment.urlDjango + 'getModels';
    return this.http.post(url, data);
  }
  /**
   * @description get le model d'apprentissage actif d'un utilisateur grâce a son email
   */
  public getActifModel(userEmail): Observable<any> {
    const data = {
      user: userEmail
    };
    const url = environment.urlDjango + 'getActifModel';
    return this.http.post(url, data);
  }
  /**
   * @description change le modéle actif d'un utilisateur grâce a son email
   * @param userEmail
   * @param nameOfTheModel
   */
  public changeActifModel(userEmail, nameOfTheModel): Observable<any> {
    const data = {
      user: userEmail,
      nameOfTheModel: nameOfTheModel
    };
    const url = environment.urlDjango + 'changeActifModel';
    return this.http.post(url, data);
  }
}
