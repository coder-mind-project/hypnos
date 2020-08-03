"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
/**
 * @description The User Schema
 * @type {mongoose.Schema}
 */
var user = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, auto: true },
    name: String,
    gender: String,
    birthDate: Date,
    profilePhoto: String,
    instagram: String,
    twitter: String,
    github: String,
    youtube: String,
    email: { type: String, unique: true },
    cellphone: { type: String },
    address: String,
    number: Number,
    password: String,
    token: String,
    tagAdmin: String,
    occupation: String,
    especiality: String,
    tagAuthor: String,
    customUrl: { type: String, unique: true },
    publicProfile: { type: Boolean, default: false },
    platformStats: { type: Boolean, default: false },
    confirmEmail: String,
    confirmEmailToken: String,
    lastEmailTokenSendAt: Number,
    firstLoginAt: { type: Date, default: null },
    deletedAt: { type: Date, default: null }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
exports.default = mongoose_1.default.model('users', user);
