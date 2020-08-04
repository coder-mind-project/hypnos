"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = __importDefault(require("../services/log"));
var mongoose_1 = __importDefault(require("mongoose"));
var environments_1 = require("../environments");
var Bootstrap = /** @class */ (function () {
    function Bootstrap() {
    }
    Bootstrap.connect = function () {
        mongoose_1.default
            .connect(environments_1.database.connectionString, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
            .then(function () {
            log_1.default.colorPrint('Connection established!', '\x1b[42m', '\x1b[30m', 'Database');
        })
            .catch(function (e) {
            log_1.default.colorPrint("Connection in mongo database failed, make sure your database is online - Stack: " + e, '\x1b[41m', '\x1b[37m', 'Database');
        });
    };
    return Bootstrap;
}());
exports.default = Bootstrap;
