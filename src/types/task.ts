export interface Task {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly createdOn: string;
    readonly completed: boolean;
    readonly createdBy: number;
    readonly columnId?: number;
}

export type TaskCreateParams = Pick<
    Task,
    "title" | "description" | "createdBy" | "columnId"
>;
export type TaskUpdateParams = TaskCreateParams;
export type TaskMoveParams = Pick<Task, "columnId">;
