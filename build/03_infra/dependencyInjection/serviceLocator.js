"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var articleService_1 = __importDefault(require("../../02_domain/services/articleService"));
var themeService_1 = __importDefault(require("../../02_domain/services/themeService"));
var commentService_1 = __importDefault(require("../../02_domain/services/commentService"));
var unitOfWork_1 = __importDefault(require("../unitOfWork"));
var ServiceLocator = /** @class */ (function () {
    function ServiceLocator(express) {
        this.unitOfWork = new unitOfWork_1.default();
        this.articleService = new articleService_1.default(express);
        this.themeService = new themeService_1.default(express);
        this.commentService = new commentService_1.default(express);
    }
    return ServiceLocator;
}());
exports.default = ServiceLocator;
