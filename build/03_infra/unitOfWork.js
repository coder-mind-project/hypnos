"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var articleRepository_1 = __importDefault(require("./database/repositories/articleRepository"));
var themeRepository_1 = __importDefault(require("./database/repositories/themeRepository"));
var commentRepository_1 = __importDefault(require("./database/repositories/commentRepository"));
var UnitOfWork = /** @class */ (function () {
    function UnitOfWork() {
        this.articleRepository = new articleRepository_1.default();
        this.themeRepository = new themeRepository_1.default();
        this.commentRepository = new commentRepository_1.default();
    }
    return UnitOfWork;
}());
exports.default = UnitOfWork;
