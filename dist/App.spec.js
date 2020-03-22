"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var enzyme_1 = require("enzyme");
var App_1 = require("./App");
describe("<App/>", function () {
    it("Renders without crashing", function () {
        var app = enzyme_1.mount(react_1.default.createElement(App_1.App, null));
        expect(app.text().includes("Search")).toBe(true);
    });
});
