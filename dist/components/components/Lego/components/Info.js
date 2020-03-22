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
var _common_1 = require("@common");
var astroturf_1 = __importDefault(require("astroturf"));
var Info = react_1.default.memo(function (_a) {
    var json = _a.json, isExpandable = _a.isExpandable, onClick = _a.onClick;
    var keysLength = react_1.default.useMemo(function () { return Object.keys(json).length; }, [json]);
    var onCopy = react_1.default.useCallback(function () {
        var el = document.createElement("textarea");
        el.value = JSON.stringify(json);
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    }, [json]);
    var textProps = react_1.default.useMemo(function () { return (isExpandable ? { onClick: onClick } : {}); }, [
        isExpandable,
        onClick
    ]);
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(_common_1.Text, __assign({ type: _common_1.TextTypes.TEXT }, textProps), Array.isArray(json)
            ? " [] " + keysLength + " items"
            : " {} " + keysLength + " keys"),
        react_1.default.createElement(CopyButton, null, isExpandable ? react_1.default.createElement(Copy, { onClick: onCopy }) : null)));
});
exports.Info = Info;
var Wrapper = astroturf_1.default("span")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding-left: 0.5rem;\n"], ["\n  padding-left: 0.5rem;\n"])));
var CopyButton = astroturf_1.default("span")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  opacity: 0.2;\n  transition: opacity 0.3s;\n\n  &:hover {\n    opacity: 1;\n  }\n"], ["\n  opacity: 0.2;\n  transition: opacity 0.3s;\n\n  &:hover {\n    opacity: 1;\n  }\n"])));
var Copy = astroturf_1.default("span")(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: relative;\n  display: inline-block;\n  content: \"\";\n  height: 0.7rem;\n  width: 0.9rem;\n  margin-left: 0.5rem;\n\n  &:hover {\n    cursor: pointer;\n  }\n\n  &::after {\n    position: absolute;\n    display: inline-block;\n    content: \"\";\n    top: 0;\n    right: 0;\n    height: 0.5rem;\n    width: 0.5rem;\n    border-radius: 0.1rem;\n    border: 1px solid white;\n    background: gray;\n  }\n\n  &::before {\n    position: absolute;\n    display: inline-block;\n    content: \"\";\n    top: 0.2rem;\n    right: 0.2rem;\n    height: 0.5rem;\n    width: 0.5rem;\n    border-radius: 0.1rem;\n    border: 1px solid white;\n    background: black;\n  }\n\n  &:active {\n    &::after {\n      background: black;\n      border: 1px solid gray;\n    }\n\n    &::before {\n      background: white;\n      border: 1px solid gray;\n    }\n  }\n"], ["\n  position: relative;\n  display: inline-block;\n  content: \"\";\n  height: 0.7rem;\n  width: 0.9rem;\n  margin-left: 0.5rem;\n\n  &:hover {\n    cursor: pointer;\n  }\n\n  &::after {\n    position: absolute;\n    display: inline-block;\n    content: \"\";\n    top: 0;\n    right: 0;\n    height: 0.5rem;\n    width: 0.5rem;\n    border-radius: 0.1rem;\n    border: 1px solid white;\n    background: gray;\n  }\n\n  &::before {\n    position: absolute;\n    display: inline-block;\n    content: \"\";\n    top: 0.2rem;\n    right: 0.2rem;\n    height: 0.5rem;\n    width: 0.5rem;\n    border-radius: 0.1rem;\n    border: 1px solid white;\n    background: black;\n  }\n\n  &:active {\n    &::after {\n      background: black;\n      border: 1px solid gray;\n    }\n\n    &::before {\n      background: white;\n      border: 1px solid gray;\n    }\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3;
