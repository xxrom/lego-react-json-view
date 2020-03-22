"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var lodash_get_1 = __importDefault(require("lodash.get"));
var astroturf_1 = __importDefault(require("astroturf"));
var _common_1 = require("@common");
var _1 = require(".");
var Lego_1 = require("../Lego");
var localStorageTools_1 = require("../../../localStorageTools");
var Tree = react_1.default.memo(function (props) {
    var _a;
    var _b = props.json, json = _b === void 0 ? {} : _b, _c = props.collapses, collapses = _c === void 0 ? [] : _c, path = props.path, keyName = props.keyName, cuttedJson = props.cuttedJson, setCuttedJson = props.setCuttedJson, onToggleCut = props.onToggleCut;
    var _d = react_1.default.useState(function () {
        var expandedLS = localStorageTools_1.getExpandedLS();
        var fullPath = path + "." + keyName;
        return expandedLS[fullPath] ? true : false;
    }), isExpanded = _d[0], setIsExpanded = _d[1];
    var onExpand = react_1.default.useCallback(function () { return function () {
        setIsExpanded(!isExpanded);
        var fullPath = path + "." + keyName;
        localStorageTools_1.setExpandedLS([fullPath], !isExpanded);
    }; }, [isExpanded, keyName, path]);
    var isExpandable = json[keyName] &&
        (typeof json[keyName] === "object" ||
            (Array.isArray(json[keyName]) && json[keyName].length > 0));
    var foundCollapses = react_1.default.useMemo(function () { return collapses.filter(function (_a) {
        var test = _a.test;
        return lodash_get_1.default(json[keyName], test);
    }); }, [collapses, json, keyName]);
    var replacingPath = foundCollapses.length > 0 ? lodash_get_1.default(foundCollapses[0], "replaceTo") : null;
    var cuttedPath = replacingPath ? keyName + "." + replacingPath : null;
    if (cuttedPath && typeof cuttedJson[cuttedPath] !== "string") {
        if (typeof localStorage.getItem(cuttedPath) !== "string") {
            localStorageTools_1.setCuttedLS(cuttedPath, "1");
        }
        setCuttedJson(__assign(__assign({}, cuttedJson), (_a = {}, _a[cuttedPath] = localStorageTools_1.getCuttedLS(cuttedPath), _a)));
    }
    var actualJson = json[keyName];
    var actualKeyName = keyName;
    if (replacingPath && cuttedPath && Number(cuttedJson[cuttedPath])) {
        actualJson = lodash_get_1.default(json[keyName], replacingPath);
        actualKeyName = keyName + "." + replacingPath;
    }
    var fullPath = path + "." + actualKeyName;
    return (react_1.default.createElement(Wrapper, null,
        replacingPath && (react_1.default.createElement("div", null,
            react_1.default.createElement(_common_1.Text, { onClick: onToggleCut(cuttedPath), type: cuttedPath && Number(cuttedJson[cuttedPath])
                    ? _common_1.TextTypes.HIDE
                    : _common_1.TextTypes.SHOW }, (cuttedPath && Number(cuttedJson[cuttedPath])
                ? _common_1.TextTypes.SHOW
                : _common_1.TextTypes.HIDE) + ": " + replacingPath))),
        react_1.default.createElement(_1.Line, { json: actualJson, keyName: keyName, fullPath: fullPath, isExpandable: isExpandable, isExpanded: isExpanded, onExpand: onExpand }),
        !!isExpandable && (react_1.default.createElement(_common_1.Tabs, { isOpened: isExpanded, type: "mini" },
            react_1.default.createElement(Lego_1.Lego, { json: actualJson, path: fullPath, collapses: collapses })))));
});
exports.Tree = Tree;
var Wrapper = astroturf_1.default("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  text-align: start;\n"], ["\n  text-align: start;\n"])));
var templateObject_1;
