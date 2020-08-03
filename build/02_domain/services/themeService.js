"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ThemeService = /** @class */ (function () {
    function ThemeService(app) {
        this._app = app;
    }
    ThemeService.prototype.get = function (skip, take) {
        if (skip === void 0) { skip = 0; }
        if (take === void 0) { take = 5; }
        return this._app.ServiceLocator.unitOfWork.themeRepository.get(skip, take, { state: 'active' });
    };
    return ThemeService;
}());
exports.default = ThemeService;
