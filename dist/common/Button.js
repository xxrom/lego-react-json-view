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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var astroturf_1 = __importDefault(require("astroturf"));
var _settings_1 = require("@settings");
var _colors_1 = require("@colors");
var baseStyle = {
    color: _colors_1.colors.buttonText[_settings_1.isDarkTheme ? "dark" : "light"],
    background: _colors_1.colors.buttonBackground[_settings_1.isDarkTheme ? "dark" : "light"],
    border: "1px solid " + _colors_1.colors.border[_settings_1.isDarkTheme ? "dark" : "light"]
};
var mods = {
    default: baseStyle,
    mini: __assign(__assign({}, baseStyle), { padding: "0rem 0.2rem", fontSize: "0.8rem" }),
    circle: __assign(__assign({}, baseStyle), { padding: "0.2rem", margin: "0.2rem", borderRadius: "50%" }),
    disabled: {
        color: _settings_1.isDarkTheme ? _colors_1.colors.disabled.dark : _colors_1.colors.disabled.light
    }
};
var Button = react_1.default.memo(function (_a) {
    var _b = _a.title, title = _b === void 0 ? null : _b, onClick = _a.onClick, _c = _a.type, type = _c === void 0 ? "default" : _c, _d = _a.children, children = _d === void 0 ? null : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.style, style = _f === void 0 ? {} : _f, rest = __rest(_a, ["title", "onClick", "type", "children", "disabled", "style"]);
    return (react_1.default.createElement(ButtonStyled, __assign({ style: __assign(__assign(__assign({}, mods[type]), (disabled ? mods.disabled : {})), style), onClick: disabled ? function () { } : onClick }, rest), title ? title : children));
});
exports.Button = Button;
var ButtonStyled = astroturf_1.default("button")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-flex;\n  justify-items: center;\n  align-items: center;\n  padding: 0.2rem 0.5rem;\n  margin-left: 0.5rem;\n  cursor: pointer;\n  font-size: 1rem;\n  border-radius: 0.3rem;\n  outline: none;\n  opacity: 0.8;\n  transition: opacity 0.3s ease;\n\n  &:hover {\n    opacity: 1;\n    box-shadow: 0 0 0.1rem 0.1rem #666;\n  }\n  &:active {\n    box-shadow: 0 0 0.2rem 0.1rem #777;\n  }\n"], ["\n  display: inline-flex;\n  justify-items: center;\n  align-items: center;\n  padding: 0.2rem 0.5rem;\n  margin-left: 0.5rem;\n  cursor: pointer;\n  font-size: 1rem;\n  border-radius: 0.3rem;\n  outline: none;\n  opacity: 0.8;\n  transition: opacity 0.3s ease;\n\n  &:hover {\n    opacity: 1;\n    box-shadow: 0 0 0.1rem 0.1rem #666;\n  }\n  &:active {\n    box-shadow: 0 0 0.2rem 0.1rem #777;\n  }\n"])));
var templateObject_1;
