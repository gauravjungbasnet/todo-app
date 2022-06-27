import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TaskStatusEnum } from '../shared/enums/tasktype.enum';
import { TaskModel } from '../shared/models/task.model';
import { DummyDataService } from '../shared/services/dummy-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  taskTypeVal = TaskStatusEnum;

  tasks: TaskModel[] = [];
  todoTask: TaskModel[] = [];
  inProgressTask: TaskModel[] = [];
  completedTask: TaskModel[] = [];

  private unsubscribe$: Subject<void>;

  constructor(private ds: DummyDataService) {
    this.unsubscribe$ = new Subject();
  }

  ngOnInit() {
    this.initTasks();
  }

  initTasks() {
    this.ds.fetchDummyData$<TaskModel[]>()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(((res: TaskModel[]) => {
        this.tasks = res;
        this.todoTask = this.tasks.filter((x: TaskModel) => x.status === TaskStatusEnum.TODO);
        this.inProgressTask = this.tasks.filter((x: TaskModel) => x.status === TaskStatusEnum.INPROGRESS);
        this.completedTask = this.tasks.filter((x: TaskModel) => x.status === TaskStatusEnum.COMPLETED);
      }))
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
