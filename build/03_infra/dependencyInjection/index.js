"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var serviceLocator_1 = __importDefault(require("./serviceLocator"));
var DependencyInjection = /** @class */ (function () {
    function DependencyInjection() {
    }
    DependencyInjection.configure = function (express) {
        /*consign()
          .include('/03_infra/validation.ts')
          .then('/api/comments')
          .then('/api/views')
          .then('/api/likes')
          .then('/api/messages')
          .into(express)
        */
        express.ServiceLocator = new serviceLocator_1.default(express);
    };
    return DependencyInjection;
}());
exports.default = DependencyInjection;
