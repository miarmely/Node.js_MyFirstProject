"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../handlers/users");
const auth_1 = __importDefault(require("../lib/auth"));
const router = express_1.default.Router();
// no authentication
router.post("/register", users_1.registerAsync);
// with authentication
router.all("*", auth_1.default.authenticate());
router.get("/display/all", users_1.getAllUsersAsync);
exports.default = router;
