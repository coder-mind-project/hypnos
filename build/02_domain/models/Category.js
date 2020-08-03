"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
/**
 * @description The Category Schema
 * @type {mongoose.Schema}
 */
var category = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, auto: true },
    name: { type: String, unique: true },
    themeId: { type: mongoose_1.default.Types.ObjectId, required: true },
    alias: String,
    description: String,
    state: { type: String, required: true, default: 'active' }
});
exports.default = mongoose_1.default.model('categories', category);
