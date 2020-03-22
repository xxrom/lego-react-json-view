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
var _settings_1 = require("@settings");
var _colors_1 = require("@colors");
var tabBase = {
    overflow: "hidden",
    textAlign: "left"
};
var tabMods = {
    default: tabBase,
    mini: __assign(__assign({}, tabBase), { margin: 0 })
};
var contentBase = {
    padding: 0,
    color: "black",
    transition: "max-height .2s, opacity .2s",
    borderLeft: "1px solid " + _colors_1.colors.hidden[_settings_1.isDarkTheme ? "dark" : "light"],
    borderRadius: "0 0 0 0.3rem"
};
var contentMods = {
    default: contentBase,
    mini: __assign(__assign({}, contentBase), { padding: "0 0 0 1rem" })
};
var labelStyle = {
    cursor: "pointer",
    fontSize: "1rem",
    padding: "0.2rem 0.3rem",
    background: _colors_1.colors.labelBackground.light,
    color: _settings_1.isDarkTheme ? _colors_1.colors.contrast.dark : _colors_1.colors.contrast.light,
    borderRadius: "0.3rem",
    border: "1px solid " + _colors_1.colors.buttonBackground.dark
};
var Tabs = react_1.default.memo(function (_a) {
    var _b = _a.isOpened, isOpened = _b === void 0 ? false : _b, label = _a.label, children = _a.children, _c = _a.type, type = _c === void 0 ? "default" : _c, _d = _a.style, style = _d === void 0 ? {} : _d, _e = _a.setIsOpened, setIsOpened = _e === void 0 ? null : _e, _f = _a.defaultValue, defaultValue = _f === void 0 ? false : _f;
    var _g = react_1.default.useState(defaultValue), isOpenedInner = _g[0], setIsOpenedInner = _g[1];
    var onClickTab = react_1.default.useCallback(function () { return setIsOpenedInner(!isOpenedInner); }, [isOpenedInner]);
    var tabsStyle = react_1.default.useMemo(function () { return (__assign(__assign({}, tabMods[type]), style)); }, [style, type]);
    return (react_1.default.createElement("div", { style: tabsStyle },
        label ? (react_1.default.createElement("div", { style: labelStyle, onClick: setIsOpened ? setIsOpened : onClickTab },
            isOpenedInner || isOpened ? "v " : "> ",
            label)) : null,
        (isOpenedInner || isOpened) && (react_1.default.createElement("div", { style: contentMods[type] }, children))));
});
exports.Tabs = Tabs;
