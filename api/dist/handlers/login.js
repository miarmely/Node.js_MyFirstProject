"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInAsync = signInAsync;
exports.signOutAsync = signOutAsync;
const user_1 = __importDefault(require("../db/models/user"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const dotenv_1 = __importDefault(require("../config/dotenv"));
const enum_1 = __importDefault(require("../config/enum"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function signInAsync(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            // when email not found
            const user = yield user_1.default.findOne({ email });
            if (user == null) {
                res.status(enum_1.default.HTTP_CODES.NOT_FOUND)
                    .json({
                    success: false,
                    message: "Email or password is wrong"
                });
                return;
            }
            // when password is wrong
            const isPassTrue = yield bcrypt_1.default.compare(password, user.password);
            if (!isPassTrue) {
                res.status(enum_1.default.HTTP_CODES.NOT_FOUND)
                    .json({
                    success: false,
                    message: "Email or password is wrong"
                });
                return;
            }
            // return token
            res.status(enum_1.default.HTTP_CODES.OK)
                .json({
                success: true,
                token: yield generateJwtTokenAsync(user),
                data: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
        }
        catch (err) {
            // when unexpected error is occured
            res.status(enum_1.default.HTTP_CODES.INT_SERVER_ERROR)
                .json({
                success: false,
                message: "asdas"
            });
        }
    });
}
function signOutAsync(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("signed out.");
        res.status(204);
        res.json("signed out");
    });
}
function generateJwtTokenAsync(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const nowDateInSec = Date.now() * 1000;
        const payload = {
            id: user.id,
            exp: nowDateInSec + dotenv_1.default.JWT.EXPIRES_TIME_IN_SEC,
        };
        return jwt_simple_1.default.encode(payload, dotenv_1.default.JWT.SECRET_KEY);
    });
}
