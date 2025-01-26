import { User, UserCreateParams } from "../../types/user.js";
import { DatabaseService } from "./database.service.js";

export class UserService {
    public async getAll(): Promise<User[]> {
        const connection = await DatabaseService.getConnection();
        const [results] = await connection.query("SELECT * FROM t_users");
        return results as User[];
    }

    public async get(id: number): Promise<User> {
        const connection = await DatabaseService.getConnection();
        const [results] = await connection.query(
            "SELECT * FROM t_users WHERE id = ?",
            id,
        );
        const user: User | undefined = (results as User[])[0];
        if (user === undefined) {
            throw new Error(`Can't find user with id ${id}.`);
        }
        return user;
    }

    public async create(userCreateParams: UserCreateParams): Promise<User> {
        const connection = await DatabaseService.getConnection();
        await connection.query(
            "INSERT INTO t_users (name, email) VALUES (?, ?)",
            [userCreateParams.name, userCreateParams.email],
        );
        const [results] = await connection.query(
            "SELECT * FROM t_users WHERE id = LAST_INSERT_ID()",
        );
        const user: User | undefined = (results as User[])[0];
        if (user === undefined) {
            throw new Error(`Failed to add user ${userCreateParams.name}.`);
        }
        return user;
    }
}
