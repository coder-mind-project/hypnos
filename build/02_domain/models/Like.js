"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
/**
 * @description The Like (Article like) Schema
 * @type {Schema}
 */
var likeSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Types.ObjectId, auto: true },
    reader: { type: String, required: true },
    articleId: { type: mongoose_1.Types.ObjectId, required: true },
    active: { type: Boolean, required: true, default: true }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
var Like = mongoose_1.model('likes', likeSchema);
exports.default = Like;
