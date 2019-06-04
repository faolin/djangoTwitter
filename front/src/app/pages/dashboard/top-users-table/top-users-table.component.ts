import { Component, Input, OnChanges } from '@angular/core';
import { ElasticsearchConsumerService } from '../../../services/elasticsearch-consumer.service';

@Component({
  selector: 'app-top-users-table',
  templateUrl: './top-users-table.component.html',
  styleUrls: ['./top-users-table.component.scss']
})
export class TopUsersTableComponent implements OnChanges {
  top10: any = null;
  @Input() modelActif: any;
  constructor(
    private elasticsearchConsumerService: ElasticsearchConsumerService
  ) {}

  /* a chaque changement du model on recalcule le top 10 des utilisateurs */
  ngOnChanges() {
    if (this.modelActif) {
      // on remet a 0 le top10
      this.top10 = null;
      // on le recalcule pour la nouvelle catégorie
      this.get_user_number(this.modelActif);
    }
  }
  /**
   * @description récupération des tweets par catégorie de la semaine passée afin de récupérer le nom des users et le nombre de fois
   * qu'ils apparaissent
   * @param model
   */
  public get_user_number(model) {
    this.elasticsearchConsumerService
      .get_tweets_last_week_by_model(model)
      .subscribe(
        data => {
          const users = [];
          // on rempli une liste des noms des utilisateurs et des autres propriétés
          for (const tweet of data['hits']['hits']) {
            users.push({
              name: JSON.parse(tweet['_source']['source']).user.name,
              screen_name: JSON.parse(tweet['_source']['source']).user
                .screen_name,
              profile_image_url: JSON.parse(tweet['_source']['source']).user
                .profile_image_url
            });
          }
          // on compte combien de fois apparait le méme nom d'utilisateur
          const count_users = this.count_users(users);
          // on supprime les doublons de la liste des utilisateurs
          const users_without_doublons = users.filter(this.onlyUnique);
          const dataUsersName = [];
          // on crée un objet json avec pour chaque utilisateur son nom et le nombre de fois qu'il est apparu
          for (const user of users_without_doublons) {
            dataUsersName.push({
              name: user['name'],
              weight: count_users[user['name']],
              screen_name: user['screen_name'],
              profile_image_url: user['profile_image_url']
            });
          }
          this.createTop10User(dataUsersName);
        },
        error => {
          console.error('statusObserver error ...');
          console.error(error);
        }
      );
  }
  /**
   * @description a partir du nombre de fois qu'ils sont apparus retourne la liste des 10 utilisateurs les plus actifs
   * @param dataUsers
   */
  createTop10User(dataUsers) {
    const top10 = [];
    for (const dataUser of dataUsers) {
      if (top10.length < 10) {
        top10.push(dataUser);
      } else {
        if (dataUser['weight'] > top10[this.indexOfMin(top10)]['weight']) {
          top10[this.indexOfMin(top10)] = dataUser;
        }
      }
    }
    // on réorganise de plus grand au plus petit nombre le top 10
    this.top10 = top10.sort(function(a, b) {
      return b['weight'] - a['weight'];
    });
  }
  /**
   * @description trouve l'index de la plus petite valeur d'une liste
   * @param array
   */
  public indexOfMin(array) {
    if (array.length === 0) {
      return -1;
    }
    let min = array[0]['weight'];
    let minIndex = 0;
    for (let i = 1; i < array.length; i++) {
      if (array[i]['weight'] < min) {
        minIndex = i;
        min = array[i]['weight'];
      }
    }
    return minIndex;
  }

  /**
   * @description compte le nombre de même user name dans une liste
   * @param array
   */
  public count_users(array) {
    const counts = {};
    for (let i = 0; i < array.length; i++) {
      const num = array[i]['name'];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts;
  }
  /**
   * @description retourne les valeurs uniques d'user
   * @param value
   * @param index
   * @param self
   */
  public onlyUnique(value, index, self) {
    self.find(function(item, i) {
      if (item.name === value.name) {
        index = i;
        return i;
      }
    });
    return self.indexOf(value) === index;
  }
}
