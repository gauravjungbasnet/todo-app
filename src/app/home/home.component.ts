import { Component, OnInit } from '@angular/core';
import { TaskTypeEnum } from '../shared/enums/tasktype.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  taskTypeVal = TaskTypeEnum;

  constructor() { }

  ngOnInit() {
  }

}
