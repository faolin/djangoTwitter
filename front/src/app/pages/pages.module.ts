import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';
import { PagesComponent } from './pages.component';
import { NavbarComponent } from '../theme/components/navbar/navbar.component';


@NgModule({
  imports: [
    CommonModule,
    routing,
  ],
  declarations: [
    PagesComponent,
    NavbarComponent,
  ],
  providers: []
})
export class PagesModule { }
