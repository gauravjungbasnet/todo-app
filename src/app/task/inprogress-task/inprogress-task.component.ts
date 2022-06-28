import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TaskStatusEnum } from 'src/app/shared/enums/tasktype.enum';
import { TaskModel } from 'src/app/shared/models/task.model';
import { DropService } from 'src/app/shared/services/drop.service';

@Component({
  selector: 'app-inprogress-task',
  templateUrl: './inprogress-task.component.html',
  styleUrls: ['./inprogress-task.component.scss']
})
export class InprogressTaskComponent implements OnInit {

  @ViewChild('inProgressList', { static: true }) inProgressListRef: CdkDropList = <CdkDropList>{};

  @Input() taskType: TaskStatusEnum | undefined;
  @Input() tasks: TaskModel[] = [];
  connectedParent: CdkDropList[] = [];


  constructor(public dropService: DropService) { }

  ngOnInit() {
    this.dropService.setInProgressDropList(this.inProgressListRef);
    this.connectedParent = [this.dropService.completedConnector, this.dropService.toDoConnector];
  }

  onDrop(event: any) {
    this.dropService.drop(event);
  }

}
