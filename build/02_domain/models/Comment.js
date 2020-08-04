"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
/**
 * @description The Comment Schema
 * @type {Schema}
 */
var commentSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Types.ObjectId, auto: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userId: { type: mongoose_1.Types.ObjectId, default: null },
    message: { type: String, required: true },
    articleId: { type: mongoose_1.Types.ObjectId, required: true },
    state: { type: String, enum: ['enabled', 'disabled'], required: true, default: 'enabled' },
    confirmedAt: { type: Date, default: null },
    readedAt: { type: Date, default: null },
    answerOf: { type: mongoose_1.Types.ObjectId, default: null }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
var Comment = mongoose_1.model('comments', commentSchema);
exports.default = Comment;
