"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, default: false, required: true }
}, {
    versionKey: false,
    timestamps: true
});
class User extends mongoose_1.default.Model {
}
schema.loadClass(User);
exports.default = mongoose_1.default.model("users", schema);
