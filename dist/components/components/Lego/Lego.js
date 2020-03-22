"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var components_1 = require("./components");
var localStorageTools_1 = require("../../localStorageTools");
var _common_1 = require("@common");
var Lego = react_1.default.memo(function (_a) {
    var json = _a.json, _b = _a.collapses, collapses = _b === void 0 ? [] : _b, _c = _a.path, path = _c === void 0 ? localStorageTools_1.expandedRoot : _c;
    var _d = react_1.default.useState({}), cuttedJson = _d[0], setCuttedJson = _d[1];
    var onToggleCut = react_1.default.useCallback(function (cutPath) { return function () {
        var _a;
        if (!cutPath) {
            return;
        }
        var cutPathValue = localStorageTools_1.getCuttedLS(cutPath);
        localStorageTools_1.setCuttedLS(cutPath, String(1 - Number(cutPathValue)));
        setCuttedJson(__assign(__assign({}, cuttedJson), (_a = {}, _a[cutPath] = localStorageTools_1.getCuttedLS(cutPath), _a)));
    }; }, [cuttedJson]);
    var keysArray = Object.keys(json);
    if (keysArray.length === 0) {
        return (react_1.default.createElement(_common_1.Text, { type: _common_1.TextTypes.TEXT }, Array.isArray(json) ? "[ ]" : "{ }"));
    }
    return (react_1.default.createElement("div", null, keysArray.map(function (keyName) { return (react_1.default.createElement(components_1.Tree, { key: path + "." + keyName, json: json, keyName: keyName, path: path, cuttedJson: cuttedJson, collapses: collapses, onToggleCut: onToggleCut, setCuttedJson: setCuttedJson })); })));
});
exports.Lego = Lego;
