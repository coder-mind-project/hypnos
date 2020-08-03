"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
/**
 * @description The Theme Schema
 * @type {mongoose.Schema}
 */
var theme = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, auto: true },
    name: { type: String, unique: true, required: true },
    alias: String,
    description: String,
    state: { type: String, default: 'active' }
});
exports.default = mongoose_1.default.model('themes', theme);
