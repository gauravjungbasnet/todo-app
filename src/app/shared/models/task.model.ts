import { TaskStatusEnum } from "../enums/tasktype.enum";

export interface TaskModel {
    taskId?: number;
    title: string;
    description?: string;
    storyPoint: number;
    status: TaskStatusEnum
}