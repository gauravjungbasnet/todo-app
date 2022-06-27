import { Component, Input, OnInit } from '@angular/core';
import { TaskTypeEnum } from '../shared/enums/tasktype.enum';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() taskType: TaskTypeEnum | undefined;

  constructor() { }

  ngOnInit() {
  }

}
