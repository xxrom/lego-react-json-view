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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var astroturf_1 = __importDefault(require("astroturf"));
var _common_1 = require("@common");
var _1 = require("./");
var _settings_1 = require("@settings");
var _colors_1 = require("@colors");
var localStorageTools_1 = require("../../../localStorageTools");
var modeHighlightStyle = _settings_1.isDarkTheme
    ? { background: _colors_1.colors.highlightBackground.dark }
    : { background: _colors_1.colors.highlightBackground.light };
var Line = react_1.memo(function (_a) {
    var isExpandable = _a.isExpandable, onExpand = _a.onExpand, isExpanded = _a.isExpanded, json = _a.json, keyName = _a.keyName, fullPath = _a.fullPath;
    var maxCharsInLine = 30;
    var stringifyJson = react_1.useMemo(function () {
        return JSON.stringify(json)
            .replace(/"([^"]+)":/g, "$1:")
            .replace(/\uFFFF/g, '\\"');
    }, [json]);
    var jsonData = react_1.useMemo(function () {
        return isExpandable
            ? "" + stringifyJson.slice(0, maxCharsInLine) + (stringifyJson.length > maxCharsInLine ? "..." : "")
            : json;
    }, [isExpandable, json, stringifyJson]);
    var jsonTextType = react_1.useMemo(function () {
        if (!isExpandable &&
            (stringifyJson === "null" || stringifyJson === "undefined")) {
            return _common_1.TextTypes.TEXT;
        }
        return _common_1.TextTypes.JSON;
    }, [isExpandable, stringifyJson]);
    var highlightLS = localStorageTools_1.getHighlightLS();
    var isHighlighted = highlightLS[fullPath];
    var highlightStyle = react_1.useMemo(function () { return (__assign({}, (isHighlighted ? modeHighlightStyle : {}))); }, [isHighlighted]);
    var expandedBulletStyle = react_1.useMemo(function () { return ({
        color: _settings_1.isDarkTheme ? _colors_1.colors.textColor.dark : _colors_1.colors.textColor.light
    }); }, []);
    var onClickLocal = react_1.useMemo(function () { return (isExpandable ? onExpand(fullPath) : void 0); }, [fullPath, isExpandable, onExpand]);
    return (react_1.default.createElement(Wrapper, { style: highlightStyle },
        !!isExpandable && (react_1.default.createElement(ExpandedSpan, { style: expandedBulletStyle, onClick: onClickLocal }, isExpanded ? "v" : ">")),
        react_1.default.createElement(_common_1.Text, { type: _common_1.TextTypes.KEY, onClick: onClickLocal }, keyName),
        react_1.default.createElement(_common_1.Text, { type: jsonTextType, onClick: onClickLocal }, jsonData),
        !!isExpandable && (react_1.default.createElement(_1.Info, { isExpandable: isExpandable, json: json, onClick: onClickLocal }))));
});
exports.Line = Line;
var Wrapper = astroturf_1.default("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  padding: 1px 0;\n  cursor: pointer;\n"], ["\n  display: flex;\n  padding: 1px 0;\n  cursor: pointer;\n"])));
var ExpandedSpan = astroturf_1.default("span")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: inline-block;\n  width: 0.5rem;\n  height: 100%;\n  padding-right: 0.3rem;\n  overflow: hidden;\n"], ["\n  display: inline-block;\n  width: 0.5rem;\n  height: 100%;\n  padding-right: 0.3rem;\n  overflow: hidden;\n"])));
var templateObject_1, templateObject_2;
