import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card'

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule
  ],
  declarations: [TaskComponent],
  exports: [TaskComponent]
})
export class TaskModule { }
