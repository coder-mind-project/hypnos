"use strict";
/* eslint-disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.print = function (message, reason) {
        if (reason === void 0) { reason = 'Hypnos Log'; }
        console.log(new Date() + " - " + reason + ": " + message);
    };
    Log.colorPrint = function (message, backgroundColor, fontColor, reason) {
        if (fontColor === void 0) { fontColor = '\x1b[37m'; }
        if (reason === void 0) { reason = 'Hypnos Log'; }
        console.log(new Date() + " - " + backgroundColor + "%s" + fontColor, reason + ": " + message, '\x1b[0m');
    };
    return Log;
}());
exports.default = Log;
