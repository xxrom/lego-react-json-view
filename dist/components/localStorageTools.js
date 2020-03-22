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
Object.defineProperty(exports, "__esModule", { value: true });
var collapseKey = "collapseData";
exports.setCollapseSettingsLS = function (collapseObject) {
    return localStorage.setItem(collapseKey, JSON.stringify(collapseObject));
};
exports.getCollapseSettingsLS = function () {
    return localStorage.getItem(collapseKey);
};
exports.expandedRoot = "globalRoot";
var expandedKey = "expanded";
exports.setExpandedLS = function (paths, defaultValue) {
    if (paths === void 0) { paths = []; }
    if (defaultValue === void 0) { defaultValue = true; }
    var fullObject = exports.getExpandedLS();
    var pathsObjectLS = paths.reduce(function (accumulate, path) {
        var _a;
        return (__assign(__assign({}, accumulate), (_a = {}, _a[path] = defaultValue, _a)));
    }, {});
    localStorage.setItem(expandedKey, JSON.stringify(__assign(__assign({}, fullObject), pathsObjectLS)));
};
exports.setExpandedObjectLS = function (paths) {
    if (paths === void 0) { paths = {}; }
    var fullObject = exports.getExpandedLS();
    localStorage.setItem(expandedKey, JSON.stringify(__assign(__assign({}, fullObject), paths)));
};
exports.clearExpandedLS = function () {
    localStorage.setItem(expandedKey, JSON.stringify({}));
};
exports.getExpandedLS = function () {
    return JSON.parse(localStorage.getItem(expandedKey) || "{}");
};
exports.setCuttedLS = function (path, value) {
    localStorage.setItem(path, value);
};
exports.getCuttedLS = function (path) { return localStorage.getItem(path); };
var searchPathKey = "searchPath";
exports.setSearchPathLS = function (value) {
    if (value === void 0) { value = ""; }
    return localStorage.setItem(searchPathKey, value);
};
exports.getSearchPathLS = function () { return localStorage.getItem(searchPathKey); };
var searchValueKey = "searchValue";
exports.setSearchValueLS = function (value) {
    if (value === void 0) { value = ""; }
    return localStorage.setItem(searchValueKey, value);
};
exports.getSearchValueLS = function () { return localStorage.getItem(searchValueKey); };
var devPanelSettingsKey = "devPanelSettings";
exports.getDevPanelSettingsLS = function () {
    return JSON.parse(localStorage.getItem(devPanelSettingsKey) || "{}");
};
exports.setDevPanelSettingsLS = function (settings) {
    localStorage.setItem(devPanelSettingsKey, JSON.stringify(settings));
};
var highlightKey = "highlight";
exports.getHighlightLS = function () {
    return JSON.parse(localStorage.getItem(highlightKey) || "{}");
};
exports.setHighlightLS = function (settings) {
    return localStorage.setItem(highlightKey, JSON.stringify(settings));
};
var settingsKey = "settings";
exports.getSettingsLS = function () {
    return JSON.parse(localStorage.getItem(settingsKey) || "{}");
};
exports.setSettingsLS = function (settings) {
    return localStorage.setItem(settingsKey, JSON.stringify(settings));
};
var allPathsKey = "allPaths";
exports.getAllPathsLS = function () {
    return JSON.parse(localStorage.getItem(allPathsKey) || "{}");
};
exports.setAllPathsLS = function (paths) {
    return localStorage.setItem(allPathsKey, JSON.stringify(paths));
};
