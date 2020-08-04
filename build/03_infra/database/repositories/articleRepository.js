"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Article_1 = __importDefault(require("../../../02_domain/models/Article"));
var ResourceNotFound_1 = __importDefault(require("../../../01_presentation/exceptions/ResourceNotFound"));
var ArticleRepository = /** @class */ (function () {
    function ArticleRepository() {
    }
    ArticleRepository.prototype.getByCustomUri = function (customUri, stateCriteria) {
        if (stateCriteria === void 0) { stateCriteria = []; }
        return Article_1.default.findOne({
            customUri: customUri,
            $or: stateCriteria.map(function (value) { return Object.assign({}, { state: value }); })
        });
    };
    ArticleRepository.prototype.getBoosted = function (skip, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var count, articles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Article_1.default.countDocuments({ state: 'boosted' })];
                    case 1:
                        count = _a.sent();
                        return [4 /*yield*/, Article_1.default.aggregate([
                                {
                                    $match: { state: 'boosted' }
                                },
                                {
                                    $sort: { publishAt: -1 }
                                }
                            ])
                                .skip(skip)
                                .limit(limit)];
                    case 2:
                        articles = _a.sent();
                        return [2 /*return*/, { articles: articles, count: count }];
                }
            });
        });
    };
    ArticleRepository.prototype.getRelateds = function (articleUri, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!articleUri) {
                            return [2 /*return*/, this.getBoosted(0, limit)];
                        }
                        return [4 /*yield*/, Article_1.default.findOne({ customUri: "" + articleUri })];
                    case 1:
                        article = _a.sent();
                        if (!article)
                            throw new ResourceNotFound_1.default('Artigo não encontrado');
                        return [2 /*return*/, Article_1.default.aggregate([
                                {
                                    $match: {
                                        _id: { $ne: article._id },
                                        $and: [
                                            {
                                                $or: [{ state: 'published' }, { state: 'boosted' }]
                                            }
                                        ],
                                        $or: [
                                            {
                                                $and: [{ themeId: article.get('themeId') }, { themeId: { $ne: null } }]
                                            },
                                            {
                                                $and: [{ categoryId: article.get('categoryId') }, { categoryId: { $ne: null } }]
                                            }
                                        ]
                                    }
                                },
                                {
                                    $sort: { publishedAt: -1, boostedAt: -1 }
                                }
                            ])];
                }
            });
        });
    };
    return ArticleRepository;
}());
exports.default = ArticleRepository;
