"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var Cors = /** @class */ (function () {
    function Cors() {
    }
    Cors.prototype.allowOrigins = function (origin, callback) {
        var _a;
        if (((_a = process.env.ORIGINS) === null || _a === void 0 ? void 0 : _a.indexOf(origin)) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    };
    Cors.prototype.configure = function (express) {
        express.use(cors_1.default());
    };
    return Cors;
}());
exports.default = new Cors();
