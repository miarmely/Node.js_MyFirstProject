"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("./config/dotenv"));
const dotenv_2 = __importDefault(require("dotenv"));
const app_1 = require("./handlers/app");
const users_1 = __importDefault(require("./routes/users"));
const login_1 = __importDefault(require("./routes/login"));
const body_parser_1 = __importDefault(require("body-parser"));
// add variables in ".env file" to "process.env"
if (process.env.NODE_ENV != "production")
    dotenv_2.default.config();
// setup app
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// declare routes
app.use("/api/users", users_1.default);
app.use("/api/login", login_1.default);
app.listen(dotenv_1.default.PORT, app_1.listenPortAsync);
