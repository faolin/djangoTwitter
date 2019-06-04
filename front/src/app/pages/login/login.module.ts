import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { SpinnerModule } from '../../theme/components/spinner/spinner.module';
import { SafePipe2 } from '../login/login.component';

export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SpinnerModule,
  ],
  declarations: [LoginComponent, SafePipe2]
})

export class LoginModule { }
