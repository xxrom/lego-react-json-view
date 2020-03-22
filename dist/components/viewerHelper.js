"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var searchUtils_1 = require("./components/Search/searchUtils");
exports.findAllPathPoints = function (json, path) {
    if (!searchUtils_1.checkIsObject(json)) {
        return {};
    }
    return Object.keys(json).reduce(function (accumulator, key) {
        var foundPaths = exports.findAllPathPoints(json[key], path + "." + key);
        Object.keys(foundPaths).forEach(function (path) { return (accumulator[path] = true); });
        accumulator[path] = true;
        return accumulator;
    }, {});
};
exports.forceJsonUpdate = function (toDoFunction, setJson, json) {
    new Promise(function (resolve) {
        setJson({});
        toDoFunction();
        resolve();
    }).then(function () {
        setJson(json);
    });
};
