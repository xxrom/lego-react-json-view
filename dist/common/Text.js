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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var _settings_1 = require("@settings");
var _colors_1 = require("@colors");
var TextTypes;
(function (TextTypes) {
    TextTypes["KEY"] = "key";
    TextTypes["HIDE"] = "hide";
    TextTypes["SHOW"] = "show";
    TextTypes["TEXT"] = "text";
    TextTypes["JSON"] = "json";
    TextTypes["NOWRAP"] = "nowrap";
})(TextTypes = exports.TextTypes || (exports.TextTypes = {}));
var textCommonStyle = {
    color: _settings_1.isDarkTheme ? _colors_1.colors.keyColor.dark : _colors_1.colors.keyColor.light,
    wordBreak: "break-all",
    fontWeight: "normal"
};
var textMods = (_a = {},
    _a[TextTypes.KEY] = __assign(__assign({}, textCommonStyle), { fontWeight: "bold", paddingRight: "0.5rem" }),
    _a[TextTypes.HIDE] = __assign(__assign({}, textCommonStyle), { color: _settings_1.isDarkTheme ? _colors_1.colors.hideColor.dark : _colors_1.colors.hideColor.light }),
    _a[TextTypes.SHOW] = __assign(__assign({}, textCommonStyle), { color: _settings_1.isDarkTheme ? _colors_1.colors.showColor.dark : _colors_1.colors.showColor.light }),
    _a[TextTypes.TEXT] = __assign(__assign({}, textCommonStyle), { color: _settings_1.isDarkTheme ? _colors_1.colors.textColor.dark : _colors_1.colors.textColor.light }),
    _a[TextTypes.JSON] = __assign(__assign({}, textCommonStyle), { color: _settings_1.isDarkTheme ? _colors_1.colors.jsonColor.dark : _colors_1.colors.jsonColor.light }),
    _a[TextTypes.NOWRAP] = __assign(__assign({}, textCommonStyle), { whiteSpace: "nowrap" }),
    _a);
var Text = react_1.default.memo(function (_a) {
    var _b = _a.type, type = _b === void 0 ? TextTypes.TEXT : _b, _c = _a.style, style = _c === void 0 ? {} : _c, children = _a.children, onClick = _a.onClick, other = __rest(_a, ["type", "style", "children", "onClick"]);
    var innerStyle = react_1.default.useMemo(function () { return (__assign(__assign({}, textMods[type]), {
        cursor: typeof onClick !== "undefined" ? "pointer" : "text"
    })); }, [type, onClick]);
    return (react_1.default.createElement("span", __assign({ style: __assign(__assign({}, innerStyle), style), onClick: onClick }, other), String(children)));
});
exports.Text = Text;
