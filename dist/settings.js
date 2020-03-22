"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localStorageTools_1 = require("./components/localStorageTools");
var currentTheme = localStorageTools_1.getSettingsLS().theme;
exports.isDarkTheme = currentTheme !== "light" &&
    ((window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) ||
        currentTheme === "dark");
