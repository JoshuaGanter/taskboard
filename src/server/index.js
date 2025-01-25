import express from "express";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'database',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/users', async (req, res) => {
    const [results, fields] = await pool.query('SELECT * FROM t_users');
    res.json(Array.from(results));
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Example app listening on port ${process.env.APP_PORT}`)
});
