import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { HorizontalNavbarModule } from '../layout/navbar/horizontal-navbar/horizontal-navbar.module';
import { MatButtonModule } from '@angular/material/button';
import { TaskModule } from '../task/task.module';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HorizontalNavbarModule,
    MatButtonModule,
    TaskModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
