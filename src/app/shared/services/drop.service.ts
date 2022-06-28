import { Injectable } from '@angular/core';
import { transferArrayItem, moveItemInArray, CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { TaskModel } from '../models/task.model';

@Injectable()
export class DropService {

    constructor() { }
    public completedConnector: CdkDropList = <CdkDropList>{};
    public inProgressConnector: CdkDropList = <CdkDropList>{};
    public toDoConnector: CdkDropList = <CdkDropList>{};

    setCompletedDropList(childRef: CdkDropList) {
        this.completedConnector = childRef;
    }

    setInProgressDropList(childRef: CdkDropList) {
        this.inProgressConnector = childRef;
    }

    setToDoDropList(childRef: CdkDropList) {
        this.toDoConnector = childRef;
    }

    drop(event: any) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event?.container?.data,
                event?.previousIndex,
                event?.currentIndex
            );
        } else {
            transferArrayItem(
                event?.previousContainer?.data,
                event?.container?.data,
                event?.previousIndex,
                event?.currentIndex
            );
        }
    }
}