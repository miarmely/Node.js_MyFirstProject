import express from "express"
import envConfig from "./config/dotenv"
import dotenv from "dotenv"
import { listenPortAsync } from "./handlers/app";
import usersRouter from "./routes/users"
import loginRouter from "./routes/login"
import bodyParser from "body-parser";

// add variables in ".env file" to "process.env"
if (process.env.NODE_ENV != "production")
    dotenv.config();

// setup app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// declare routes
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.listen(envConfig.PORT, listenPortAsync);