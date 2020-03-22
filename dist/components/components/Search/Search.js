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
var lodash_get_1 = __importDefault(require("lodash.get"));
var localStorageTools_1 = require("../../localStorageTools");
var _settings_1 = require("@settings");
var searchUtils_1 = require("./searchUtils");
var _icons_1 = require("@icons");
var _colors_1 = require("@colors");
var _common_1 = require("@common");
var viewerHelper_1 = require("../../viewerHelper");
var styles = {
    wrapper: {
        display: "flex",
        alignItems: "center",
        borderLeft: "1px solid gray",
        paddingLeft: "0.5rem",
        marginLeft: "-0.5rem"
    },
    inputStyle: {
        color: _settings_1.isDarkTheme ? _colors_1.colors.searchText.dark : _colors_1.colors.searchText.light
    },
    resultText: {
        display: "inline-flex",
        justifyContent: "flex-end",
        whiteSpace: "nowrap",
        fontSize: "1rem",
        fontWeight: "normal"
    },
    settings: {
        background: _settings_1.isDarkTheme
            ? _colors_1.colors.buttonBackground.dark
            : _colors_1.colors.buttonBackground.light,
        border: "1px solid " + (_settings_1.isDarkTheme ? _colors_1.colors.border.dark : _colors_1.colors.border.light)
    }
};
var inputValueRegExp = /^([\w-+*\\\/.]+)?$/i;
var inputPathsRegExp = /^[\w\d]*([\.\\\/][\w\d]+)*[\.\\\/]?$/i;
var pathSplitterRegExp = /[\\\/]/g;
var Search = react_1.default.memo(function (_a) {
    var searchPath = _a.searchPath, searchValue = _a.searchValue, setSearchPath = _a.setSearchPath, setSearchValue = _a.setSearchValue, json = _a.json, settings = _a.settings, setJson = _a.setJson, isOpenedSettings = _a.isOpenedSettings, onToggleSettings = _a.onToggleSettings;
    var _b = react_1.useState([]), foundResults = _b[0], setFoundResults = _b[1];
    var _c = react_1.useState([]), foundAllResults = _c[0], setFoundAllResults = _c[1];
    react_1.useEffect(function () {
        searchUtils_1.setAllPaths(json);
    }, [json]);
    var searchAndHighlightResults = react_1.useCallback(function () {
        var allPaths = localStorageTools_1.getAllPathsLS();
        var paths = allPaths;
        if (searchPath) {
            var clearSearchPath = searchPath.replace(pathSplitterRegExp, ".");
            console.log("clearSearchPath", clearSearchPath);
            paths = searchUtils_1.findPathsByText(clearSearchPath, allPaths);
        }
        if (typeof searchValue === "string" && searchValue !== "") {
            paths = paths.filter(function (path) {
                var realPath = path.replace(localStorageTools_1.expandedRoot + ".", "");
                var jsonData = lodash_get_1.default(json, realPath);
                return String(jsonData).search(searchValue) !== -1;
            });
        }
        var maxResultItems = Number(settings.searchLimit);
        var cuttedPaths = maxResultItems > 0
            ? paths.filter(function (_, index) { return index < maxResultItems; })
            : paths;
        setFoundAllResults(paths);
        setFoundResults(cuttedPaths);
        localStorageTools_1.clearExpandedLS();
        var accumulatePathsLS = [];
        cuttedPaths.forEach(function (path) {
            accumulatePathsLS = __spreadArrays(accumulatePathsLS, searchUtils_1.showInJsonByPath(path));
        });
        localStorageTools_1.setExpandedLS(accumulatePathsLS);
        var highlightPathsLS = cuttedPaths.reduce(function (accumulator, path) {
            var _a;
            return (__assign(__assign({}, accumulator), (_a = {}, _a[path] = true, _a)));
        }, {});
        localStorageTools_1.setHighlightLS(highlightPathsLS);
    }, [json, searchPath, searchValue, settings.searchLimit]);
    var handleSearchTextCleaning = react_1.useCallback(function () {
        localStorageTools_1.clearExpandedLS();
        localStorageTools_1.setHighlightLS({});
        setFoundAllResults([]);
        setFoundResults([]);
    }, [setFoundAllResults, setFoundResults]);
    var onEnterAction = react_1.useCallback(function () {
        if (searchPath === "" && searchValue === "") {
            handleSearchTextCleaning();
        }
        else {
            searchAndHighlightResults();
        }
    }, [
        searchPath,
        searchValue,
        handleSearchTextCleaning,
        searchAndHighlightResults
    ]);
    var handleEnter = react_1.useCallback(function (e) {
        if (e.keyCode === 13) {
            viewerHelper_1.forceJsonUpdate(onEnterAction, setJson, json);
        }
    }, [json, setJson, onEnterAction]);
    var handleSearch = react_1.useCallback(function () {
        viewerHelper_1.forceJsonUpdate(onEnterAction, setJson, json);
    }, [json, setJson, onEnterAction]);
    return (react_1.default.createElement("div", { style: styles.wrapper },
        react_1.default.createElement(_common_1.Input, { label: "Value", placeholder: "Search value", regExp: inputValueRegExp, initValue: searchValue, onEnter: handleEnter, onChangeValue: setSearchValue, onChangeValueLS: localStorageTools_1.setSearchValueLS, setFoundResults: setFoundResults, setFoundAllResults: setFoundAllResults }),
        react_1.default.createElement(_common_1.Input, { label: "Path", placeholder: "Search path", regExp: inputPathsRegExp, initValue: searchPath, onEnter: handleEnter, onChangeValue: setSearchPath, onChangeValueLS: localStorageTools_1.setSearchPathLS, setFoundResults: setFoundResults, setFoundAllResults: setFoundAllResults }),
        react_1.default.createElement(_common_1.Text, { type: _common_1.TextTypes.KEY, style: styles.resultText }, foundResults.length + "/" + foundAllResults.length),
        react_1.default.createElement(_common_1.Button, { title: "Search", onClick: handleSearch }),
        react_1.default.createElement(_common_1.Button, { onClick: onToggleSettings, type: "circle", style: { padding: "0.4rem", marginLeft: "0.5rem" } }, isOpenedSettings ? react_1.default.createElement(_icons_1.CloseIcon, null) : react_1.default.createElement(_icons_1.SettingsIcon, null))));
});
exports.Search = Search;
