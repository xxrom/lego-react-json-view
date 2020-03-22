"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var localStorageTools_1 = require("../../localStorageTools");
var checkIsObject = function (item) {
    if (typeof item === "undefined") {
        return false;
    }
    if (item === null) {
        return false;
    }
    if (typeof item === "object" && Object.keys(item).length > 0) {
        return true;
    }
    if (Array.isArray(item) && item.length > 0) {
        return true;
    }
    return false;
};
exports.checkIsObject = checkIsObject;
var findPathsInPaths = function (path, search) {
    var splittedPath = path.split(".");
    var splittedSearch = search.split(".");
    var isFound = true;
    var index = 0;
    var _loop_1 = function () {
        var searchPath = splittedSearch[index];
        index += 1;
        var deletingIndex = -1;
        var searchPathRegExp = new RegExp(searchPath, "i");
        splittedPath.some(function (currentPath, index) {
            if (searchPathRegExp.test(currentPath)) {
                deletingIndex = index;
                return true;
            }
            return false;
        });
        if (deletingIndex !== -1) {
            splittedPath = splittedPath.filter(function (_, index) { return index !== deletingIndex; });
        }
        else {
            isFound = false;
        }
    };
    while (isFound && index < splittedSearch.length) {
        _loop_1();
    }
    return isFound;
};
exports.findPathsInPaths = findPathsInPaths;
var findPathsInJson = function (json, searchPaths, path) {
    if (!checkIsObject(json)) {
        if (findPathsInPaths(path, searchPaths)) {
            return [path];
        }
        return [];
    }
    return Object.keys(json).reduce(function (accumulator, key) { return __spreadArrays(accumulator, findPathsInJson(json[key], searchPaths, path + "." + key)); }, []);
};
exports.findPathsInJson = findPathsInJson;
var findPathsByText = function (searchText, allPaths) {
    var filteredPaths = allPaths.reduce(function (accumulator, path) {
        if (findPathsInPaths(path, searchText)) {
            accumulator.push(path);
        }
        return accumulator;
    }, []);
    return filteredPaths;
};
exports.findPathsByText = findPathsByText;
var findAllPaths = function (json, path) {
    if (path === void 0) { path = localStorageTools_1.expandedRoot; }
    if (!checkIsObject(json)) {
        return [path];
    }
    return Object.keys(json).reduce(function (accumulator, key) {
        var foundPaths = findAllPaths(json[key], path + "." + key);
        foundPaths.forEach(function (path) { return accumulator.push(path); });
        return accumulator;
    }, []);
};
var setAllPaths = function (json) {
    var allPaths = findAllPaths(json);
    localStorageTools_1.setAllPathsLS(allPaths);
};
exports.setAllPaths = setAllPaths;
var showInJsonByPath = function (path) {
    var getParentPath = function (childPath) {
        var splittedPath = childPath.split(".");
        return splittedPath.slice(0, -1).join(".");
    };
    var childPath = path;
    var parentPath = getParentPath(path);
    var pathsLS = [];
    while (parentPath) {
        pathsLS.push(childPath);
        childPath = parentPath;
        parentPath = getParentPath(parentPath);
    }
    return pathsLS;
};
exports.showInJsonByPath = showInJsonByPath;
