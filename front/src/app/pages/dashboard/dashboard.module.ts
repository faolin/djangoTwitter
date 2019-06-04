import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { NgxTweetModule } from 'ngx-tweet';
import { SpinnerModule } from '../../theme/components/spinner/spinner.module';
import { SocialFeedComponent } from './social-feed/social-feed.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartsModule } from 'ng2-charts';
import { DynamicChartComponent } from './dynamic-chart/dynamic-chart.component';
import {CloudComponent} from './cloud/cloud.component';
import 'chart.js/dist/Chart.js';
import { TagCloudModule } from 'angular-tag-cloud-module';
import {TopUsersTableComponent} from './top-users-table/top-users-table.component';

export const routes = [
  { path: '', component: DashboardComponent, data: { breadcrumb: 'Your model' } },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxTweetModule,
    SpinnerModule,
    MyDateRangePickerModule,
    NgxPaginationModule,
    NgSelectModule,
    ChartsModule,
    TagCloudModule
  ],
  declarations: [
    DashboardComponent, SocialFeedComponent, DynamicChartComponent, CloudComponent, TopUsersTableComponent
  ]
})
export class DashboardModule { }
