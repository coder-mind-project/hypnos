"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
/**
 * @description The Comment Schema
 * @type {app.mongo.Schema}
 */
var comment = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, auto: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userId: { type: mongoose_1.default.Types.ObjectId, default: null },
    message: { type: String, required: true },
    articleId: { type: mongoose_1.default.Types.ObjectId, required: true },
    state: { type: String, enum: ['enabled', 'disabled'], required: true, default: 'enabled' },
    confirmedAt: { type: Date, default: null },
    readedAt: { type: Date, default: null },
    answerOf: { type: mongoose_1.default.Types.ObjectId, default: null }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
exports.default = mongoose_1.default.model('comments', comment);
