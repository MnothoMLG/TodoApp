import { ICallBacks, ITask } from "@constants/types";

export interface TasksState {
  tasksList: Array<ITask>;
  completedTasks: Array<ITask>;
}

export interface ITaskPayload extends ICallBacks {
  task: ITask;
}

export interface IDeleteTaskPayload extends ICallBacks {
  taskId: string;
  taskTitle?: string;
}
