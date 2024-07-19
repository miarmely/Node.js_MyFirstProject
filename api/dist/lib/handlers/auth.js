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
exports.authStrategyAsync = authStrategyAsync;
exports.signOutStrategyAsync = signOutStrategyAsync;
const user_1 = __importDefault(require("../../db/models/user"));
const dotenv_1 = __importDefault(require("../../config/dotenv"));
function authStrategyAsync(payload, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // get user by id
            const user = yield user_1.default.findOne({ _id: payload.id, isDeleted: false }, { password: false, isDeleted: false });
            // when id not found
            if (!user) {
                done(new Error("User not found").message, null);
                return;
            }
            // set new payload for jwt
            const currentTimeInSec = Date.now() / 1000;
            const newPayload = {
                id: user.id,
                exp: currentTimeInSec + dotenv_1.default.JWT.EXPIRES_TIME_IN_SEC
            };
            done(null, newPayload);
        }
        catch (err) {
            done(err, null);
            return;
        }
    });
}
function signOutStrategyAsync(payload, done) {
    return __awaiter(this, void 0, void 0, function* () {
        // change expire time
        const currentTimeInSec = Date.now() / 1000;
        const newPayload = {
            exp: currentTimeInSec - 1000
        };
        done(null, newPayload);
    });
}
