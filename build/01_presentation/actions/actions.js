"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var articleAction_1 = __importDefault(require("./articleAction"));
var themeAction_1 = __importDefault(require("./themeAction"));
var Actions = /** @class */ (function () {
    function Actions() {
    }
    Actions.configure = function (express) {
        new articleAction_1.default(express);
        new themeAction_1.default(express);
    };
    return Actions;
}());
exports.default = Actions;
