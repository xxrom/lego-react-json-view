"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var components_1 = require("./components");
var localStorageTools_1 = require("./localStorageTools");
var _colors_1 = require("@colors");
var _settings_1 = require("@settings");
var headerStyle = {
    background: _settings_1.isDarkTheme ? _colors_1.colors.background.dark : _colors_1.colors.background.light
};
var wrapperStyle = {
    background: _settings_1.isDarkTheme ? _colors_1.colors.background.dark : _colors_1.colors.background.light
};
var defaultCollapses = [
    { test: "hide.this.path", replaceTo: "hide.this.path" }
];
var Viewer = react_1.memo(function (props) {
    var _a = props.json, initJson = _a === void 0 ? {} : _a, _b = props.settings, settingsInit = _b === void 0 ? {} : _b;
    var _c = react_1.useState({ root: initJson }), json = _c[0], setJson = _c[1];
    var _d = react_1.useState(function () {
        var searchPathData = localStorageTools_1.getSearchPathLS();
        return searchPathData ? searchPathData : "";
    }), searchPath = _d[0], setSearchPath = _d[1];
    var _e = react_1.useState(function () {
        var searchValueData = localStorageTools_1.getSearchValueLS();
        return searchValueData ? searchValueData : "";
    }), searchValue = _e[0], setSearchValue = _e[1];
    var _f = react_1.useState(function () {
        var collapsesFromLS = localStorageTools_1.getCollapseSettingsLS();
        if (collapsesFromLS) {
            try {
                return JSON.parse(collapsesFromLS);
            }
            catch (error) {
                console.error("error", error.message);
            }
        }
        return localStorageTools_1.setCollapseSettingsLS(defaultCollapses);
    }), collapses = _f[0], setCollapses = _f[1];
    var _g = react_1.useState(false), isOpenedSettings = _g[0], setIsOpenedSettings = _g[1];
    var _h = react_1.useState(function () {
        var settingsLS = localStorageTools_1.getSettingsLS();
        var _a = settingsLS.fontSize, fontSize = _a === void 0 ? "1.0" : _a, _b = settingsLS.searchLimit, searchLimit = _b === void 0 ? "100" : _b, _c = settingsLS.theme, theme = _c === void 0 ? "auto" : _c, _d = settingsLS.isExpanded, isExpanded = _d === void 0 ? false : _d;
        return {
            fontSize: ts_optchain_1.oc(settingsInit).fontSize(fontSize),
            searchLimit: ts_optchain_1.oc(settingsInit).searchLimit(searchLimit),
            theme: ts_optchain_1.oc(settingsInit).theme(theme),
            isExpanded: ts_optchain_1.oc(settingsInit).isExpanded(isExpanded)
        };
    }), settings = _h[0], setSettings = _h[1];
    var legoWrapperStyle = react_1.useMemo(function () { return ({
        fontSize: settings.fontSize + "rem",
        lineHeight: Number(settings.fontSize) + 0.2 + "rem"
    }); }, [settings.fontSize]);
    react_1.useEffect(function () {
        localStorageTools_1.setCollapseSettingsLS(collapses);
    }, [collapses]);
    react_1.useEffect(function () {
        setJson({ root: initJson });
    }, [initJson]);
    var onToggleSettings = react_1.useCallback(function () { return setIsOpenedSettings(!isOpenedSettings); }, [isOpenedSettings]);
    return (react_1.default.createElement(Wrapper, { style: wrapperStyle },
        react_1.default.createElement(Header, { style: headerStyle },
            react_1.default.createElement(components_1.Search, { searchPath: searchPath, searchValue: searchValue, setSearchPath: setSearchPath, setSearchValue: setSearchValue, json: json, settings: settings, setJson: setJson, isOpenedSettings: isOpenedSettings, onToggleSettings: onToggleSettings }),
            react_1.default.createElement(components_1.CollapseSettings, { collapses: collapses, setCollapses: setCollapses, json: json, setJson: setJson, settings: settings, setSettings: setSettings, isOpenedSettings: isOpenedSettings, setIsOpenedSettings: setIsOpenedSettings })),
        react_1.default.createElement(LegoWrapper, { style: legoWrapperStyle },
            react_1.default.createElement(components_1.Lego, { json: json, collapses: collapses }))));
});
exports.Viewer = Viewer;
var Wrapper = astroturf_1.default("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  height: 100%;\n  padding: 0.5rem;\n  width: 100%;\n  box-sizing: border-box;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n"], ["\n  position: relative;\n  height: 100%;\n  padding: 0.5rem;\n  width: 100%;\n  box-sizing: border-box;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n"])));
var Header = astroturf_1.default("div")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: static;\n  top: 0;\n  left: 0;\n"], ["\n  position: static;\n  top: 0;\n  left: 0;\n"])));
var LegoWrapper = astroturf_1.default("div")(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  overflow: scroll;\n"], ["\n  overflow: scroll;\n"])));
var templateObject_1, templateObject_2, templateObject_3;
