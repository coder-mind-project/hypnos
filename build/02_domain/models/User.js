"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
/**
 * @description The User Schema
 * @type {Schema}
 */
var user = new mongoose_1.Schema({
    _id: { type: mongoose_1.Types.ObjectId, auto: true },
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
var User = mongoose_1.model('users', user);
exports.default = User;
