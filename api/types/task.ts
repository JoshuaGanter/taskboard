export interface Task {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly createdOn: string;
    readonly completedOn: string;
    readonly completed: boolean;
    readonly createdBy: string;
    readonly assignee: string;
    readonly columnId: number;
    readonly columnOrder: number;
}

export type TaskCreateParams = Pick<
    Task,
    "title" | "description" | "createdBy" | "assignee" | "columnId"
>;
export type TaskUpdateParams = Omit<
    TaskCreateParams,
    "id" | "createdOn" | "createdBy"
>;
export type TaskMoveParams = Pick<Task, "columnId">;
