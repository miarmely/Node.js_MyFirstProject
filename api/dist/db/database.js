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
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let instance;
let mongoConnection;
// singleton class
class Database {
    constructor() {
        // initialize variables only first time
        if (instance === undefined) {
            instance = this;
            mongoConnection = null;
        }
        return instance;
    }
    getMongoConnection() { return mongoConnection; }
    connectAsync(connectionString) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("db is connecting...");
            // connect to db
            mongoConnection = yield mongoose_1.default.connect(connectionString);
            console.log("db is connected.");
        });
    }
}
exports.Database = Database;
