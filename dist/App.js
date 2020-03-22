"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var root_1 = require("react-hot-loader/root");
var bigTestJson_1 = require("./testData/bigTestJson");
var components_1 = require("./components");
exports.App = function () {
    var propsSettings = {};
    return react_1.default.createElement(components_1.LegoViewer, { json: bigTestJson_1.json, settings: propsSettings });
};
exports.default = root_1.hot(exports.App);
