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
var _settings_1 = require("@settings");
var _colors_1 = require("@colors");
var _common_1 = require("@common");
var _icons_1 = require("@icons");
var localStorageTools_1 = require("../components/localStorageTools");
var Text_1 = require("./Text");
var styles = {
    inputStyle: {
        padding: "0 0.5rem 0 0.5rem",
        color: _settings_1.isDarkTheme ? _colors_1.colors.textColor.dark : _colors_1.colors.textColor.light
    }
};
var emptyFn = function () { };
var Input = function (props) {
    var label = props.label, regExp = props.regExp, _a = props.placeholder, placeholder = _a === void 0 ? "" : _a, _b = props.initValue, initValue = _b === void 0 ? "" : _b, _c = props.onEnter, onEnter = _c === void 0 ? emptyFn : _c, _d = props.setFoundResults, setFoundResults = _d === void 0 ? emptyFn : _d, _e = props.setFoundAllResults, setFoundAllResults = _e === void 0 ? emptyFn : _e, _f = props.onChangeValue, onChangeValue = _f === void 0 ? emptyFn : _f, _g = props.onChangeValueLS, onChangeValueLS = _g === void 0 ? emptyFn : _g;
    var _h = react_1.useState(initValue), inputValue = _h[0], setInputValue = _h[1];
    var _j = react_1.useState(false), focus = _j[0], setFocus = _j[1];
    var handleChangeInput = react_1.useCallback(function (value) {
        if (value === void 0) { value = ""; }
        setInputValue(value);
        onChangeValue(value);
        onChangeValueLS(value);
    }, [onChangeValue, onChangeValueLS]);
    var onChange = react_1.useCallback(function (e) {
        var inputText = e.target.value;
        if (!regExp) {
            handleChangeInput(inputText);
        }
        if (regExp.test(inputText)) {
            handleChangeInput(inputText);
        }
    }, [handleChangeInput, regExp]);
    var handleSearchTextCleaning = react_1.useCallback(function () {
        localStorageTools_1.clearExpandedLS();
        localStorageTools_1.setHighlightLS({});
        setFoundAllResults([]);
        setFoundResults([]);
    }, [setFoundAllResults, setFoundResults]);
    var handleClearInput = react_1.useCallback(function () {
        handleChangeInput();
        handleSearchTextCleaning();
    }, [handleChangeInput, handleSearchTextCleaning]);
    var handleInputFocus = react_1.useCallback(function () {
        setFocus(true);
    }, [setFocus]);
    var handleInputBlur = react_1.useCallback(function () {
        setFocus(false);
    }, [setFocus]);
    var wrapperShowStyle = {
        flex: 1
    };
    return (react_1.default.createElement(Wrapper, { onClick: handleInputFocus, style: focus ? wrapperShowStyle : {} },
        react_1.default.createElement(InputWrapper, null,
            label && react_1.default.createElement(_common_1.Text, { type: Text_1.TextTypes.NOWRAP }, label + ":"),
            react_1.default.createElement(InputStyled, { placeholder: placeholder, style: __assign(__assign({}, styles.inputStyle), (focus ? { borderBottom: "1px solid gray" } : {})), value: inputValue, onChange: onChange, onKeyDown: onEnter, onBlur: handleInputBlur, autoFocus: true })),
        inputValue && (react_1.default.createElement(_common_1.Button, { onClick: handleClearInput, type: "circle" },
            react_1.default.createElement(_icons_1.CloseIcon, { size: "0.7rem" })))));
};
exports.Input = Input;
var Wrapper = astroturf_1.default("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-flex;\n  flex: 1;\n  align-items: center;\n  justify-content: space-between;\n  transition: width 2s, height 4s;\n  margin-right: 0.5rem;\n"], ["\n  display: inline-flex;\n  flex: 1;\n  align-items: center;\n  justify-content: space-between;\n  transition: width 2s, height 4s;\n  margin-right: 0.5rem;\n"])));
var InputWrapper = astroturf_1.default("span")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex: 1;\n  align-items: center;\n"], ["\n  display: flex;\n  flex: 1;\n  align-items: center;\n"])));
var InputStyled = astroturf_1.default("input")(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  && {\n    position: relative;\n    display: inline-flex;\n    flex: 1;\n    background: none;\n    min-width: 4rem;\n    box-sizing: border-box;\n    font-size: 1rem;\n    border: 0;\n    outline: none;\n  }\n"], ["\n  && {\n    position: relative;\n    display: inline-flex;\n    flex: 1;\n    background: none;\n    min-width: 4rem;\n    box-sizing: border-box;\n    font-size: 1rem;\n    border: 0;\n    outline: none;\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3;
