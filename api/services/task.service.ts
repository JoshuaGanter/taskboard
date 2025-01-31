import {
    Task,
    TaskCreateParams,
    TaskMoveParams,
    TaskUpdateParams,
} from "../types/task.js";
import { DatabaseService } from "./database.service.js";

export class TaskService {
    public async getAll(): Promise<Task[]> {
        const connection = await DatabaseService.getConnection();
        const [results] = await connection.query("SELECT * FROM t_tasks");
        return results as Task[];
    }

    public async get(id: number): Promise<Task> {
        const connection = await DatabaseService.getConnection();
        const [results] = await connection.query(
            "SELECT * FROM t_tasks WHERE id = ?",
            id,
        );
        const task: Task | undefined = (results as Task[])[0];
        if (task === undefined) {
            throw new Error(`Can't find task with id ${id}.`);
        }
        return task;
    }

    public async create(taskCreateParams: TaskCreateParams): Promise<Task> {
        const connection = await DatabaseService.getConnection();
        await connection.query(
            "INSERT INTO t_tasks (title, description, created_by, column_id) VALUES (?, ?, ?, ?)",
            [
                taskCreateParams.title,
                taskCreateParams.description,
                taskCreateParams.createdBy,
                taskCreateParams.columnId,
            ],
        );
        const [results] = await connection.query(
            "SELECT * FROM t_tasks WHERE id = LAST_INSERT_ID()",
        );
        const task: Task | undefined = (results as Task[])[0];
        if (task === undefined) {
            throw new Error(`Failed to add task ${taskCreateParams.title}.`);
        }
        return task;
    }

    public async update(
        taskId: number,
        taskUpdateParams: TaskUpdateParams,
    ): Promise<Task> {
        const connection = await DatabaseService.getConnection();
        await connection.query(
            "UPDATE t_tasks SET title = ?, description = ?, column_id = ? WHERE id = ?",
            [
                taskUpdateParams.title,
                taskUpdateParams.description,
                taskUpdateParams.assignee,
                taskUpdateParams.columnId,
                taskId,
            ],
        );
        return await this.get(taskId);
    }

    public async moveTo(
        taskId: number,
        taskMoveParams: TaskMoveParams,
    ): Promise<Task> {
        const connection = await DatabaseService.getConnection();
        if (taskMoveParams.columnId === 3) {
            await connection.query(
                "UPDATE t_tasks SET completed = true, completed_on = CURRENT_TIMESTAMP, column_id = 3 WHERE id = ?",
                [
                    taskId,
                ],
            );
        } else {
            await connection.query(
                "UPDATE t_tasks SET column_id = ? WHERE id = ?",
                [
                    taskMoveParams.columnId,
                    taskId,
                ],
            );
        }
        return await this.get(taskId);
    }
}
