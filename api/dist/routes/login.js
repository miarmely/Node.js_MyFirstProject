"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = require("../handlers/login");
const auth_1 = __importDefault(require("../lib/auth"));
// no authentication
const router = express_1.default.Router();
router.post("/signin", login_1.signInAsync);
// with authentication
router.all("*", auth_1.default.authenticate());
router.post("/signout", auth_1.default.signOut(), login_1.signOutAsync);
exports.default = router;
