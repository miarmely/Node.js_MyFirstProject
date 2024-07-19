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
exports.getAllUsersAsync = getAllUsersAsync;
exports.registerAsync = registerAsync;
const user_1 = __importDefault(require("../db/models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const enum_1 = __importDefault(require("../config/enum"));
const dotenv_1 = __importDefault(require("../config/dotenv"));
function getAllUsersAsync(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield user_1.default.find({ isDeleted: false }, { isDeleted: false, password: false });
        res.json(users);
    });
}
function registerAsync(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstName, lastName, email, phone, password } = req.body;
        // check email or phone whether conflicted
        if (yield isEmailOrPhoneConflictedAsync(email, phone, res))
            return;
        // hash the password
        const hashedPass = yield bcrypt_1.default.hash(password, dotenv_1.default.BCRYPT_SALT_ROUNDS);
        // create user
        const user = yield new user_1.default({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPass
        });
        yield user.save();
        res.status(enum_1.default.HTTP_CODES.NO_CONTENT)
            .json({
            success: true,
            message: "register successful"
        });
        try {
        }
        catch (err) {
            res.status(enum_1.default.HTTP_CODES.INT_SERVER_ERROR)
                .json({
                success: false,
                message: err
            });
        }
    });
}
function isEmailOrPhoneConflictedAsync(email, phone, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // get users with same email or phone
        const conflictedUsers = yield user_1.default.find({ $or: [{ email }, { phone }] });
        if (conflictedUsers != null) {
            // when email is conflicted
            const conflictedUsersByEmail = conflictedUsers.find(u => u.email === email);
            if (conflictedUsersByEmail != null) {
                res.status(enum_1.default.HTTP_CODES.CONFLICTED)
                    .json({
                    success: false,
                    message: "email is conflicted."
                });
                return true;
            }
            // when phone is conflicted
            const conflictedUsersByPhone = conflictedUsers.find(u => u.phone === phone);
            if (conflictedUsersByPhone != null) {
                res.status(enum_1.default.HTTP_CODES.CONFLICTED)
                    .json({
                    success: false,
                    message: "phone is conflicted."
                });
                return true;
            }
        }
        return false;
    });
}
