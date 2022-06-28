import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  /**
   * Component reference for todoList drop list.
   */
  @ViewChild('todoList')
  todoListRef: CdkDropList = <CdkDropList>{};

  /**
   * Component reference for inProgressList drop list.
   */
  @ViewChild('inProgressList')
  inProgressListRef: CdkDropList = <CdkDropList>{};

  /**
   * Component reference for completedList drop list.
   */
  @ViewChild('completedList')
  completedListRef: CdkDropList = <CdkDropList>{};

  @ViewChild('addTaskTemplate')
  addTaskTemplateRef: TemplateRef<any> = <TemplateRef<any>>{};

  taskTypeVal = TaskStatusEnum;

  tasks: TaskModel[] = [];
  todoTask: TaskModel[] = [];
  inProgressTask: TaskModel[] = [];
  completedTask: TaskModel[] = [];

  taskForm: FormGroup = {} as FormGroup;

  private unsubscribe$: Subject<void>;

  constructor(
    private ds: DummyDataService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.unsubscribe$ = new Subject();
    (<any>window)['that'] = this;
  }

  ngOnInit() {
    this.initTasks();
    this.initForm();
  }

  /*** initialize task list and filter task as per status */
  initTasks() {
    const tasks: TaskModel[] = this.ds.getLocalStorage('tasks');
    // load local storage data if state is available
    if (tasks?.length) {
      this.tasks = tasks;
      this.arrangeTask();
    } else {
      this.ds.fetchDummyData$<TaskModel[]>()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(((res: TaskModel[]) => {
          this.tasks = res;
          this.arrangeTask();
        }))
    }
  }

  // filter task as per status
  arrangeTask() {
    this.todoTask = this.tasks.filter((x: TaskModel) => x.status === TaskStatusEnum.TODO);
    this.inProgressTask = this.tasks.filter((x: TaskModel) => x.status === TaskStatusEnum.INPROGRESS);
    this.completedTask = this.tasks.filter((x: TaskModel) => x.status === TaskStatusEnum.COMPLETED);
  }

  // initialize form
  initForm(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      storyPoint: ['', [Validators.pattern('[0-9]*'), Validators.required, Validators.min(1), Validators.max(10)]],
    });
  }

  /**
   *  drop event handler. This will handle moving card from one drop list to the other.
   * @param event
   */
  onDrop(event: CdkDragDrop<TaskModel[]>, itemType: TaskStatusEnum): void {
    event.container.data?.forEach((x: TaskModel) => {
      x.status = itemType
    })
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
    this.storeTasks();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(this.addTaskTemplateRef, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  saveTask() {
    if (!this.taskForm.valid) {
      return;
    }
    const task: TaskModel = {
      ...{
        taskId: this.tasks.length,
        status: this.taskTypeVal.TODO
      },
      ...this.taskForm.value
    }
    this.tasks.push(task);
    this.arrangeTask();
    this.storeTasks();
    this.dialog.closeAll();
  }

  storeTasks() {
    setTimeout(() => {
      this.todoTask = this.todoTask.map(x => ({ ...x, ...{ status: TaskStatusEnum.TODO } }));
      this.inProgressTask = this.inProgressTask.map(x => ({ ...x, ...{ status: TaskStatusEnum.INPROGRESS } }));
      this.completedTask = this.completedTask.map(x => ({ ...x, ...{ status: TaskStatusEnum.COMPLETED } }));
      this.tasks = [...this.todoTask, ...this.inProgressTask, ...this.completedTask];
      this.ds.setLocalStorage('tasks', this.tasks);
    }, 500);
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
