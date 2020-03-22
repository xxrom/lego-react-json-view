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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
var ts_optchain_1 = require("ts-optchain");
var _settings_1 = require("@settings");
var _colors_1 = require("@colors");
var _common_1 = require("@common");
var localStorageTools_1 = require("../../localStorageTools");
var viewerHelper_1 = require("../../viewerHelper");
var styles = {
    input: {
        fontSize: "1rem",
        border: 0,
        borderBottom: "1px solid " + (_settings_1.isDarkTheme ? _colors_1.colors.buttonText.dark : _colors_1.colors.buttonText.light),
        outline: "none",
        background: "none",
        color: _settings_1.isDarkTheme ? _colors_1.colors.keyColor.dark : _colors_1.colors.keyColor.light
    },
    fontLabel: {
        paddingLeft: "0.5rem",
        color: _settings_1.isDarkTheme ? _colors_1.colors.textColor.dark : _colors_1.colors.textColor.light
    },
    fontValue: {
        paddingLeft: "0.5rem",
        color: _settings_1.isDarkTheme ? _colors_1.colors.jsonColor.dark : _colors_1.colors.jsonColor.light
    }
};
var CollapseSettings = react_1.memo(function (_a) {
    var collapses = _a.collapses, setCollapses = _a.setCollapses, settings = _a.settings, setSettings = _a.setSettings, json = _a.json, setJson = _a.setJson, isOpenedSettings = _a.isOpenedSettings, setIsOpenedSettings = _a.setIsOpenedSettings;
    var _b = react_1.useState(""), test = _b[0], setTest = _b[1];
    var _c = react_1.useState(""), replaceTo = _c[0], setReplaceTo = _c[1];
    var _d = react_1.useState({
        isExpanded: false
    }), disabledButtons = _d[0], setDisabledButtons = _d[1];
    var onChangeTest = function (e) {
        setTest(e.target.value);
        setReplaceTo(e.target.value);
    };
    var onChangeReplaceTo = react_1.useCallback(function (e) {
        setReplaceTo(e.target.value);
    }, []);
    var onClickAddCollapse = react_1.useCallback(function () {
        var trimTest = test.trim();
        var trimReplaceTo = replaceTo.trim();
        var minWordLength = 3;
        if (trimTest.length > minWordLength &&
            trimReplaceTo.length > minWordLength) {
            setCollapses(__spreadArrays(collapses, [{ test: test, replaceTo: replaceTo }]));
            setTest("");
            setReplaceTo("");
        }
    }, [test, replaceTo, collapses, setCollapses]);
    var onDelete = react_1.useCallback(function (index) { return function () {
        var changedCollaps = __spreadArrays(collapses);
        changedCollaps.splice(index, 1);
        setCollapses(changedCollaps);
    }; }, [collapses, setCollapses]);
    var onEnter = function (e) {
        if (e.keyCode === 13) {
            onClickAddCollapse();
        }
    };
    var updateFontSize = react_1.useCallback(function (fontSize) {
        if (fontSize < 0.49 || fontSize > 2.01) {
            return;
        }
        var settingsObject = __assign(__assign({}, settings), { fontSize: String(fontSize) });
        setSettings(settingsObject);
        localStorageTools_1.setSettingsLS(settingsObject);
    }, [setSettings, settings]);
    var onUp = react_1.useCallback(function () { return updateFontSize(Number(settings.fontSize) + 0.05); }, [settings.fontSize, updateFontSize]);
    var onDown = react_1.useCallback(function () { return updateFontSize(Number(settings.fontSize) - 0.05); }, [settings.fontSize, updateFontSize]);
    var updateSearchLimit = react_1.useCallback(function (event) {
        var searchLimit = Number(event.target.value);
        if (!Number.isInteger(searchLimit)) {
            return;
        }
        var settingsObject = __assign(__assign({}, settings), { searchLimit: String(searchLimit) });
        setSettings(settingsObject);
        localStorageTools_1.setSettingsLS(settingsObject);
    }, [setSettings, settings]);
    var setIsOpened = react_1.useCallback(function () { return setIsOpenedSettings(!isOpenedSettings); }, [isOpenedSettings, setIsOpenedSettings]);
    var onClickTheme = react_1.useCallback(function (theme) { return function () {
        var settingsObject = __assign(__assign({}, settings), { theme: theme });
        setSettings(settingsObject);
        localStorageTools_1.setSettingsLS(settingsObject);
    }; }, [setSettings, settings]);
    var onExpandAction = react_1.useCallback(function (innerJson) {
        var allExpandedPathesObject = viewerHelper_1.findAllPathPoints(innerJson, localStorageTools_1.expandedRoot);
        var allExpandedLS = localStorageTools_1.getExpandedLS();
        Object.keys(allExpandedLS).forEach(function (path) {
            if (typeof ts_optchain_1.oc(allExpandedLS)[path]() === "boolean" &&
                typeof ts_optchain_1.oc(allExpandedPathesObject)[path]() === "boolean") {
                allExpandedPathesObject[path] = allExpandedLS[path];
            }
        });
        localStorageTools_1.setExpandedObjectLS(allExpandedPathesObject);
    }, []);
    var onClickIsExpanded = react_1.useCallback(function (isExpanded) { return function () {
        setDisabledButtons(__assign(__assign({}, disabledButtons), { isExpanded: true }));
        var settingsObject = __assign(__assign({}, settings), { isExpanded: isExpanded });
        if (!isExpanded) {
            localStorageTools_1.clearExpandedLS();
        }
        else {
            onExpandAction(json);
        }
        setSettings(settingsObject);
        localStorageTools_1.setSettingsLS(settingsObject);
        setDisabledButtons(__assign(__assign({}, disabledButtons), { isExpanded: false }));
    }; }, [disabledButtons, settings, setSettings, onExpandAction, json]);
    if (!isOpenedSettings) {
        return null;
    }
    return (react_1.default.createElement(BlockWrapper, null,
        react_1.default.createElement(_common_1.Tabs, { isOpened: isOpenedSettings, setIsOpened: setIsOpened, label: "Settings:" },
            react_1.default.createElement(Wrapper, null,
                react_1.default.createElement("span", { style: styles.fontLabel }, "Font size:"),
                react_1.default.createElement(_common_1.Button, { title: "-0.05", onClick: onDown }),
                react_1.default.createElement("span", { style: styles.fontValue }, "\"" + Number(settings.fontSize).toFixed(2) + " rem\""),
                react_1.default.createElement(_common_1.Button, { title: "+0.05", onClick: onUp })),
            react_1.default.createElement(Wrapper, null,
                react_1.default.createElement("span", { style: styles.fontLabel }, "Search limit results (0 - disabled):"),
                react_1.default.createElement("input", { style: __assign(__assign({}, styles.fontLabel), styles.input), value: settings.searchLimit ? String(settings.searchLimit) : "", onChange: updateSearchLimit, placeholder: "Enter search limit number:" })),
            react_1.default.createElement(Wrapper, null,
                react_1.default.createElement("span", { style: styles.fontLabel }, "Theme (page reload needed):"),
                react_1.default.createElement("span", { style: styles.fontValue }, "\"" + settings.theme + "\""),
                react_1.default.createElement(_common_1.Button, { title: "dark", onClick: onClickTheme("dark") }),
                react_1.default.createElement(_common_1.Button, { title: "light", onClick: onClickTheme("light") }),
                react_1.default.createElement(_common_1.Button, { title: "auto", onClick: onClickTheme("auto") })),
            react_1.default.createElement(Wrapper, null,
                react_1.default.createElement("span", { style: styles.fontLabel }, "Expanded by default? (experimented):"),
                react_1.default.createElement("span", { style: styles.fontValue }, "\"" + (settings.isExpanded ? "expanded" : "collapsed") + "\""),
                react_1.default.createElement(_common_1.Button, { disabled: disabledButtons.isExpanded, title: "expanded", onClick: onClickIsExpanded(true) }),
                react_1.default.createElement(_common_1.Button, { disabled: disabledButtons.isExpanded, title: "collapsed", onClick: onClickIsExpanded(false) })),
            react_1.default.createElement(_common_1.Tabs, { label: "Collapse paths:", style: { margin: "0.5rem 0 0 0.5rem" }, defaultValue: true },
                react_1.default.createElement(InnerWrapper, null,
                    collapses.map(function (_a, index) {
                        var test = _a.test, replaceTo = _a.replaceTo;
                        return (react_1.default.createElement(CollapseWrapper, { key: test + "_" + index },
                            react_1.default.createElement(_common_1.Text, { type: _common_1.TextTypes.KEY }, test),
                            " /",
                            " ",
                            react_1.default.createElement(_common_1.Text, { type: _common_1.TextTypes.KEY }, replaceTo),
                            react_1.default.createElement(_common_1.Button, { onClick: onDelete(index), title: "Delete" })));
                    }),
                    react_1.default.createElement("input", { style: styles.input, value: test, placeholder: "hide path value", onChange: onChangeTest, onKeyDown: onEnter }),
                    " / ",
                    react_1.default.createElement("input", { style: styles.input, placeholder: "(custom path replacement)", value: replaceTo, onChange: onChangeReplaceTo, onKeyDown: onEnter }),
                    react_1.default.createElement(_common_1.Button, { onClick: onClickAddCollapse, title: "Add" }))))));
});
exports.CollapseSettings = CollapseSettings;
var BlockWrapper = astroturf_1.default("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 0 0 0.5rem 0;\n  border-bottom: 2px solid gray;\n"], ["\n  padding: 0 0 0.5rem 0;\n  border-bottom: 2px solid gray;\n"])));
var Wrapper = astroturf_1.default("div")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-top: 0.5rem;\n"], ["\n  margin-top: 0.5rem;\n"])));
var InnerWrapper = astroturf_1.default("div")(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-size: 1rem;\n  margin: 0.5rem 0 0 0.5rem;\n"], ["\n  font-size: 1rem;\n  margin: 0.5rem 0 0 0.5rem;\n"])));
var CollapseWrapper = astroturf_1.default("div")(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin-bottom: \"0.5rem\";\n"], ["\n  margin-bottom: \"0.5rem\";\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
