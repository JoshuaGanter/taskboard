export interface User {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly createdOn: string;
}

export type UserCreateParams = Pick<User, "name" | "email">;
