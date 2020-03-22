"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var astroturf_1 = __importStar(require("astroturf"));
var _colors_1 = require("@colors");
var _settings_1 = require("@settings");
exports.CloseIcon = function (_a) {
    var _b = _a.size, size = _b === void 0 ? "1.2rem" : _b;
    var styles = {
        close: {
            height: size,
            width: size
        },
        lines: {
            background: _colors_1.colors.textColor[_settings_1.isDarkTheme ? "dark" : "light"]
        },
        hover: {
            lines: {
                one: {
                    transform: "rotate(180deg)"
                },
                two: {
                    transfrom: "rotate(-90deg)"
                }
            }
        }
    };
    return (react_1.default.createElement(Close, { style: styles.close },
        react_1.default.createElement(LineOne, { style: styles.lines }),
        react_1.default.createElement(LineTwo, { style: styles.lines })));
};
var Close = astroturf_1.default("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  box-sizing: border-box;\n  display: inline-block;\n"], ["\n  position: relative;\n  box-sizing: border-box;\n  display: inline-block;\n"])));
var BaseLineCSS = astroturf_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  .base {\n    content: \"\";\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin-top: -7%;\n    margin-left: -50%;\n    display: block;\n    height: 15%;\n    width: 100%;\n    transition: all 0.15s ease-out;\n    border-radius: 1px;\n  }\n"], ["\n  .base {\n    content: \"\";\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin-top: -7%;\n    margin-left: -50%;\n    display: block;\n    height: 15%;\n    width: 100%;\n    transition: all 0.15s ease-out;\n    border-radius: 1px;\n  }\n"])));
var LineOne = astroturf_1.default("span")(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  composes: ", ";\n  transform: rotate(-45deg);\n"], ["\n  composes: ", ";\n  transform: rotate(-45deg);\n"])), BaseLineCSS.base);
var LineTwo = astroturf_1.default("span")(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  composes: ", ";\n  transform: rotate(-135deg);\n"], ["\n  composes: ", ";\n  transform: rotate(-135deg);\n"])), BaseLineCSS.base);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
