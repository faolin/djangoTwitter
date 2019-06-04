import {
  Component,
  ViewEncapsulation,
  OnInit,
  Input,
  OnChanges
} from '@angular/core';
import { ElasticsearchConsumerService } from '../../../services/elasticsearch-consumer.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'az-dynamic-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dynamic-chart.component.html',
  styleUrls: ['./dynamic-chart.component.scss'],
  providers: [ElasticsearchConsumerService]
})
export class DynamicChartComponent implements OnInit, OnChanges {
  public charte_diponible = false;
  @Input() modelActif: any;
  chartOptions = {
    responsive: false,
    maintainAspectRatio: true
  };
  chartData: Array<any>;
  chartLabels = ['J', 'J-1', 'J-2', 'J-3', 'J-4', 'J-5', 'J-6'];

  // nombre de tweets de la semaine dérniére mais aussi de hier et aujourd'hui
  requete_compte_tweet_last_week: any = null;

  constructor(
    private elasticsearchConsumerService: ElasticsearchConsumerService
  ) {}

  /* a chaque arrivée d'input (donc du modéle actif) l'on relance la fonction getTweetNumberLastWeek pour redissner la charte avec
  les nouvelles données*/
  ngOnChanges() {
    this.charte_diponible = false;
    this.getTweetNumberLastWeek();
  }

  ngOnInit() {
    this.getTweetNumberLastWeek();
  }
  /**
   * @description lance la fonction du service elasticsearch pour chaque catégorie et pour j-2, j-3 ... j-6 afin de connaitre le nombre de
   * tweets par catégorie pour chaque jour pendant 7 a partir d'ajourd'hui.
   */
  getTweetNumberLastWeek() {
    if (this.modelActif !== null) {
      this.elasticsearchConsumerService
        .getTweetsNumberFromListOfDays(this.modelActif, [0, 1, 2, 3, 4, 5, 6])
        .subscribe(
          data => {
            this.chartData = [
              { data: data, label: 'Number Of tweets per day' }
            ];
            this.charte_diponible = true;
          },
          error => {
            console.error('statusObserver error ...');
            console.error(error);
          }
        );
    } else {
      this.chartData = [
        { data: [], label: 'Number Of tweets per day' }
      ];
      this.charte_diponible = true;
    }
  }
}
