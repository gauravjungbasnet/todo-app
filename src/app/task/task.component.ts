import { Component, Input, OnInit } from '@angular/core';
import { TaskStatusEnum } from '../shared/enums/tasktype.enum';
import { TaskModel } from '../shared/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() taskType: TaskStatusEnum | undefined;
  @Input() tasks: TaskModel[] = [];

  constructor() { }

  ngOnInit() {
  }

}
