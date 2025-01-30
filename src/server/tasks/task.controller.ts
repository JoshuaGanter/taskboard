import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Put,
    Route,
    SuccessResponse,
} from "tsoa";
import {
    Task,
    TaskCreateParams,
    TaskMoveParams,
    TaskUpdateParams,
} from "../../types/task.js";
import { TaskService } from "../tasks/task.service.js";

@Route("tasks")
export class TaskController extends Controller {
    @Get("")
    public async getAllTasks(): Promise<Task[]> {
        return await new TaskService().getAll();
    }

    @Get("{taskId}")
    public async getTask(
        @Path() taskId: number,
    ): Promise<Task> {
        return await new TaskService().get(taskId);
    }

    @Put("{taskId}")
    public async updateTask(
        @Path() taskId: number,
        @Body() taskUpdateParams: TaskUpdateParams,
    ): Promise<Task> {
        return await new TaskService().update(taskId, taskUpdateParams);
    }

    @Post("{taskId}/moveTo")
    public async moveTask(
        @Path() taskId: number,
        @Body() column: TaskMoveParams,
    ): Promise<Task> {
        return await new TaskService().moveTo(taskId, column);
    }

    @SuccessResponse("201", "Created")
    @Post()
    public async createTask(
        @Body() requestBody: TaskCreateParams,
    ): Promise<Task> {
        this.setStatus(201);
        return await new TaskService().create(requestBody);
    }
}
