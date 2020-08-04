"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
/**
 * @description The View (Article view) Schema
 * @type {Schema}
 */
var viewSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Types.ObjectId, auto: true },
    reader: { type: String, required: true },
    articleId: { type: mongoose_1.Types.ObjectId, required: true },
    accessCount: { type: Number, default: 1, required: true, min: 1 }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
var View = mongoose_1.model('views', viewSchema);
exports.default = View;
