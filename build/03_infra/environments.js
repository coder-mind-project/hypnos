"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smtp = exports.captcha = exports.database = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.database = {
    connectionString: String(process.env.CONNECTION_STRING)
};
exports.captcha = {
    siteKey: process.env.SITE_KEY,
    secretKey: process.env.SECRET_KEY,
    url: process.env.CAPTCHA_URL
};
exports.smtp = {
    server: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: Boolean(process.env.SMTP_SECURE === 'true'),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    receiver: process.env.SMTP_RECEIVER
};
