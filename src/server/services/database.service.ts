import mysql from "mysql2/promise";

const POOL_OPTIONS: mysql.PoolOptions = {
    connectionLimit: 10,
    host: process.env["MYSQL_HOST"] ?? "database",
    user: process.env["MYSQL_USER"] ?? "taskboard",
    password: process.env["MYSQL_PASSWORD"] ?? "taskboard",
    database: process.env["MYSQL_DATABASE"] ?? "taskboard",
};

export class DatabaseService {
    private static pool: mysql.Pool = mysql.createPool(POOL_OPTIONS);

    public static async getConnection(): Promise<mysql.Connection> {
        return this.pool.getConnection();
    }
}
