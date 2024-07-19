"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const dotenv_1 = __importDefault(require("../config/dotenv"));
const auth_1 = require("./handlers/auth");
function auth() {
    return {
        initialize: () => {
            // set strategy
            const strategy = getAuthStrategy();
            passport_1.default.use(strategy);
            return passport_1.default.initialize();
        },
        authenticate: () => {
            // set strategy
            const strategy = getAuthStrategy();
            passport_1.default.use(strategy);
            return passport_1.default.authenticate("jwt", { session: false });
        },
        signOut: () => {
            // set strategy
            const strategy = getSignOutStrategy();
            passport_1.default.use(strategy);
            return passport_1.default.authenticate("jwt", { session: false });
        }
    };
}
function getAuthStrategy() {
    return new passport_jwt_1.default.Strategy({
        jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: dotenv_1.default.JWT.SECRET_KEY
    }, auth_1.authStrategyAsync);
}
function getSignOutStrategy() {
    return new passport_jwt_1.default.Strategy({
        jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: dotenv_1.default.JWT.SECRET_KEY
    }, auth_1.signOutStrategyAsync);
}
exports.default = auth();
