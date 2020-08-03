"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArticleService = /** @class */ (function () {
    function ArticleService(app) {
        this._app = app;
    }
    ArticleService.prototype.getBoostedArticles = function (skip, take) {
        if (skip === void 0) { skip = 0; }
        if (take === void 0) { take = 5; }
        return this._app.ServiceLocator.unitOfWork.articleRepository.getBoosted(skip, take);
    };
    ArticleService.prototype.getByCustomUri = function (customUri) {
        return this._app.ServiceLocator.unitOfWork.articleRepository.getByCustomUri(customUri, ['boosted', 'published']);
    };
    ArticleService.prototype.getRelateds = function (articleUri, limit) {
        if (limit === void 0) { limit = 5; }
        return this._app.ServiceLocator.unitOfWork.articleRepository.getRelateds(articleUri, limit);
    };
    return ArticleService;
}());
exports.default = ArticleService;
