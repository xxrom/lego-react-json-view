"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var _colors_1 = require("@colors");
var _settings_1 = require("@settings");
exports.SettingsIcon = react_1.memo(function (_a) {
    var _b = _a.width, width = _b === void 0 ? "1.2rem" : _b;
    var outterfillColor = _colors_1.colors.border[_settings_1.isDarkTheme ? "light" : "dark"];
    var innerfillColor = _colors_1.colors.textColor[_settings_1.isDarkTheme ? "dark" : "light"];
    return (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", version: "1.1", id: "Settings_1", x: "0px", width: width, y: "0px", viewBox: "0 0 52 52", xmlSpace: "preserve" },
        react_1.default.createElement("path", { style: { fill: outterfillColor }, d: "M50.219,21h-2.797c-0.552-2.375-1.486-4.602-2.739-6.613l1.978-1.978  c0.695-0.695,0.695-1.823,0-2.518l-4.553-4.553c-0.695-0.695-1.823-0.695-2.518,0l-1.978,1.978C35.602,6.064,33.375,5.13,31,4.578  V1.781C31,0.797,30.203,0,29.219,0h-6.439C21.797,0,21,0.797,21,1.781v2.797c-2.375,0.552-4.602,1.486-6.613,2.739L12.41,5.339  c-0.695-0.695-1.823-0.695-2.518,0L5.339,9.892c-0.695,0.695-0.695,1.823,0,2.518l1.978,1.978C6.064,16.398,5.13,18.625,4.578,21  H1.781C0.797,21,0,21.797,0,22.781v6.439C0,30.203,0.797,31,1.781,31h2.797c0.552,2.375,1.486,4.602,2.739,6.613L5.339,39.59  c-0.695,0.696-0.695,1.823,0,2.518l4.553,4.553c0.695,0.695,1.823,0.695,2.518,0l1.978-1.978c2.011,1.252,4.238,2.187,6.613,2.739  v2.797C21,51.203,21.797,52,22.781,52h6.439C30.203,52,31,51.203,31,50.219v-2.797c2.375-0.552,4.602-1.486,6.613-2.739l1.978,1.978  c0.695,0.695,1.823,0.695,2.518,0l4.553-4.553c0.695-0.695,0.695-1.823,0-2.518l-1.978-1.978c1.252-2.01,2.186-4.238,2.739-6.613  h2.797C51.203,31,52,30.203,52,29.219v-6.439C52,21.797,51.203,21,50.219,21z M26,35c-4.971,0-9-4.03-9-9c0-4.971,4.029-9,9-9  s9,4.029,9,9C35,30.97,30.971,35,26,35z" }),
        react_1.default.createElement("path", { style: { fill: innerfillColor }, d: "M26,13c-7.18,0-13,5.82-13,13s5.82,13,13,13s13-5.82,13-13S33.18,13,26,13z M26,35  c-4.971,0-9-4.03-9-9c0-4.971,4.029-9,9-9s9,4.029,9,9C35,30.97,30.971,35,26,35z" })));
});
