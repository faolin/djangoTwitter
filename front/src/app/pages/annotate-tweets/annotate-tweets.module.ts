import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnnotateTweetsComponent } from './annotate-tweets.component';
import { NgxTweetModule } from 'ngx-tweet';
import { SpinnerModule } from '../../theme/components/spinner/spinner.module';
export const routes = [
  { path: '', component: AnnotateTweetsComponent, data: { breadcrumb: 'Annotate tweets' } },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxTweetModule,
    SpinnerModule,
  ],
  declarations: [
    AnnotateTweetsComponent,
  ]
})
export class AnnotateTweetModule { }
