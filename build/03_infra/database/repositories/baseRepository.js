"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseRepository = /** @class */ (function () {
    function BaseRepository(model) {
        this._model = model;
    }
    BaseRepository.prototype.get = function (skip, take, query) {
        if (skip === void 0) { skip = 0; }
        if (take === void 0) { take = 10; }
        if (query === void 0) { query = null; }
        return this._model.find(query).skip(skip).limit(take);
    };
    BaseRepository.prototype.getOne = function (id) {
        return this._model.findById(id);
    };
    BaseRepository.prototype.create = function (model) {
        return new this._model(model).save();
    };
    return BaseRepository;
}());
exports.default = BaseRepository;
