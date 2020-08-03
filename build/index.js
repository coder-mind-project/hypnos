"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var services_1 = __importDefault(require("./03_infra/services"));
services_1.default.configurePublicResources(express_1.default);
services_1.default.configure(app);
services_1.default.configureActions(app);
services_1.default.start(app);
