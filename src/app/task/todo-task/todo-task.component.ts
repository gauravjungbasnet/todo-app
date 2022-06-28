import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TaskStatusEnum } from 'src/app/shared/enums/tasktype.enum';
import { TaskModel } from 'src/app/shared/models/task.model';
import { DropService } from 'src/app/shared/services/drop.service';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss']
})
export class TodoTaskComponent implements OnInit {

  @ViewChild('todoList', { static: true }) todoList: CdkDropList = <CdkDropList>{};

  @Input() taskType: TaskStatusEnum | undefined;
  @Input() tasks: TaskModel[] = [];

  connectedParent: CdkDropList[] = [];

  constructor(public dropService: DropService) { }

  ngOnInit() {
    this.dropService.setToDoDropList(this.todoList);
    this.connectedParent = [this.dropService.inProgressConnector, this.dropService.completedConnector];
  }

  onDrop(event: any) {
    this.dropService.drop(event);
  }

}
