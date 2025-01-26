import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Route,
    SuccessResponse,
} from "tsoa";
import { User, UserCreateParams } from "../../types/user.js";
import { UserService } from "../services/user.service.js";

@Route("users")
export class UserController extends Controller {
    @Get("")
    public async getAllUsers(): Promise<User[]> {
        return new UserService().getAll();
    }

    @Get("{userId}")
    public async getUser(
        @Path() userId: number,
    ): Promise<User> {
        return new UserService().get(userId);
    }

    @SuccessResponse("201", "Created")
    @Post()
    public async createUser(
        @Body() requestBody: UserCreateParams,
    ): Promise<User> {
        this.setStatus(201);
        return await new UserService().create(requestBody);
    }
}
