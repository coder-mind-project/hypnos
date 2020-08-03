"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
/**
 * @description The View (Article view) Schema
 * @type {mongoose.Schema}
 */
var view = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, auto: true },
    reader: { type: String, required: true },
    articleId: { type: mongoose_1.default.Types.ObjectId, required: true },
    accessCount: { type: Number, default: 1, required: true, min: 1 }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
exports.default = mongoose_1.default.model('views', view);
