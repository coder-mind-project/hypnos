"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
/**
 * @description The Article Schema
 * @type {mongoose.Schema}
 */
var article = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, auto: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: null, trim: true },
    state: {
        type: String,
        enum: ['draft', 'published', 'inactivated', 'removed', 'boosted'],
        required: true,
        default: 'draft'
    },
    themeId: { type: mongoose_1.default.Types.ObjectId, default: null },
    categoryId: { type: mongoose_1.default.Types.ObjectId, default: null },
    userId: { type: mongoose_1.default.Types.ObjectId, required: true },
    logoImg: { type: String, default: null, trim: true },
    secondaryImg: { type: String, default: null, trim: true },
    headerImg: { type: String, default: null, trim: true },
    contentType: { type: String, required: true, enum: ['default', 'md'], default: 'default' },
    content: { type: String, default: null },
    socialVideoType: { type: String, enum: ['youtube', 'other', null], default: null },
    socialVideo: { type: String, default: null, trim: true },
    socialRepositoryType: { type: String, enum: ['github', 'gitlab', 'other', null], default: null },
    socialRepository: { type: String, default: null, trim: true },
    customUri: {
        type: String,
        required: true,
        unique: true,
        default: function () { return "" + Date.now() + Math.floor(Math.random() * 123555738); },
        trim: true
    },
    removedAt: { type: Date, default: null },
    inactivatedAt: { type: Date, default: null },
    publishedAt: { type: Date, default: null },
    boostedAt: { type: Date, default: null }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
exports.default = mongoose_1.default.model('articles', article);
