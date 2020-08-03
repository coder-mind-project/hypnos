"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = __importDefault(require("../../03_infra/services/log"));
var HttpStatusCodeHandler = /** @class */ (function () {
    function HttpStatusCodeHandler() {
    }
    HttpStatusCodeHandler.Configure = function (express) {
        express.use(HttpStatusCodeHandler.httpStatusCodeErrorHandler);
    };
    HttpStatusCodeHandler.httpStatusCodeErrorHandler = function (err, req, res, next) {
        if (err.statusCode) {
            res.status(err.statusCode).json(err);
        }
        else {
            log_1.default.print(err.stackError || err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
    return HttpStatusCodeHandler;
}());
exports.default = HttpStatusCodeHandler;
