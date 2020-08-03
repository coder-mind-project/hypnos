"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var Middlewares = /** @class */ (function () {
    function Middlewares() {
    }
    Middlewares.configure = function (express, reqBodySize) {
        if (reqBodySize === void 0) { reqBodySize = 1; }
        express.use(body_parser_1.default.json({ limit: reqBodySize + "mb" }));
    };
    return Middlewares;
}());
exports.default = Middlewares;
