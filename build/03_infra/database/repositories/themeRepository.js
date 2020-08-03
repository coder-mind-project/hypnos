"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Theme_1 = __importDefault(require("../../../02_domain/models/Theme"));
var baseRepository_1 = __importDefault(require("./baseRepository"));
var ThemeRepository = /** @class */ (function (_super) {
    __extends(ThemeRepository, _super);
    function ThemeRepository() {
        return _super.call(this, Theme_1.default) || this;
    }
    return ThemeRepository;
}(baseRepository_1.default));
exports.default = ThemeRepository;
