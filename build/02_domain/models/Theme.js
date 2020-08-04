"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
/**
 * @description The Theme Schema
 * @type {Schema}
 */
var themeSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Types.ObjectId, auto: true },
    name: { type: String, unique: true, required: true },
    alias: String,
    description: String,
    state: { type: String, default: 'active' }
});
var Theme = mongoose_1.model('themes', themeSchema);
exports.default = Theme;
