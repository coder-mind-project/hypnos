"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dependencyInjection_1 = __importDefault(require("../dependencyInjection"));
var database_1 = __importDefault(require("../database"));
var middlewares_1 = __importDefault(require("../api/middlewares"));
var actions_1 = __importDefault(require("../../01_presentation/actions/actions"));
var httpstatuscode_1 = __importDefault(require("../../01_presentation/handlers/httpstatuscode"));
var cors_1 = __importDefault(require("../api/cors"));
var Services = /** @class */ (function () {
    function Services() {
    }
    Services.configure = function (express) {
        cors_1.default.configure(express);
        middlewares_1.default.configure(express);
        database_1.default.connect();
        dependencyInjection_1.default.configure(express);
        actions_1.default.configure(express);
    };
    Services.configurePublicResources = function (express, path) {
        if (path === void 0) { path = '/public'; }
        express().use(path, express.static('public'));
    };
    Services.configureActions = function (express) {
        httpstatuscode_1.default.Configure(express);
    };
    Services.start = function (express, port, host) {
        if (port === void 0) { port = 3010; }
        if (host === void 0) { host = '0.0.0.0'; }
        express.listen(port, host, function () {
            // eslint-disable-next-line no-console
            console.log("server running at port " + port);
        });
    };
    return Services;
}());
exports.default = Services;
