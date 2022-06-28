import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DropService } from '../shared/services/drop.service';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { InprogressTaskComponent } from './inprogress-task/inprogress-task.component';
import { CompletedTaskComponent } from './completed-task/completed-task.component';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    DragDropModule
  ],
  declarations: [
    TodoTaskComponent,
    InprogressTaskComponent,
    CompletedTaskComponent
  ],
  exports: [
    TodoTaskComponent,
    InprogressTaskComponent,
    CompletedTaskComponent
  ],
  providers: [DropService]
})
export class TaskModule { }
