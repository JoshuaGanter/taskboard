import express, { json, urlencoded } from "express";
import { RegisterRoutes } from "./routes.js";

const app = express();

app.use(
    urlencoded({
        extended: true,
    }),
);
app.use(json());

RegisterRoutes(app);

const PORT = Number(process.env["APP_PORT"]) || 8080;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
