"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
/**
 * @description The Category Schema
 * @type {Schema}
 */
var categorySchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Types.ObjectId, auto: true },
    name: { type: String, unique: true },
    themeId: { type: mongoose_1.Types.ObjectId, required: true },
    alias: String,
    description: String,
    state: { type: String, required: true, default: 'active' }
});
var Category = mongoose_1.model('categories', categorySchema);
exports.default = Category;
