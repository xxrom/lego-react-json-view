import { highlightType, settingsType } from "./Viewer";

const collapseKey = "collapseData";
export const setCollapseSettingsLS = (collapseObject: {}) =>
  localStorage.setItem(collapseKey, JSON.stringify(collapseObject));
export const getCollapseSettingsLS = () => {
  return localStorage.getItem(collapseKey);
};

export const expandedRoot = "globalRoot";
const expandedKey = "expanded";
export const setExpandedLS = (paths: Array<string> = []) => {
  const fullObject = getExpandedLS();

  const pathsObjectLS = paths.reduce(
    (accumulate, path) => ({ ...accumulate, [path]: true }),
    {}
  );

  localStorage.setItem(
    expandedKey,
    JSON.stringify({
      ...fullObject,
      ...pathsObjectLS
    })
  );
};
export const clearExpandedLS = () => {
  localStorage.setItem(expandedKey, JSON.stringify({}));
};
export const getExpandedLS = () =>
  JSON.parse(localStorage.getItem(expandedKey) || "{}");

export const setCuttedLS = (path: string, value: string) => {
  localStorage.setItem(path, value);
};
export const getCuttedLS = (path: string) => localStorage.getItem(path);

const searchTextKey = "searchText";
export const setSearchTextLS = (text: string) =>
  localStorage.setItem(searchTextKey, text);
export const getSearchTextLS = () => localStorage.getItem(searchTextKey);

const devPanelSettingsKey = "devPanelSettings";
export const getDevPanelSettingsLS = () =>
  JSON.parse(localStorage.getItem(devPanelSettingsKey) || "{}");
export const setDevPanelSettingsLS = (settings: {}) => {
  localStorage.setItem(devPanelSettingsKey, JSON.stringify(settings));
};

const highlightKey = "highlight";
export const getHighlightLS = () =>
  JSON.parse(localStorage.getItem(highlightKey) || "{}");
export const setHighlightLS = (settings: highlightType) =>
  localStorage.setItem(highlightKey, JSON.stringify(settings));

const settingsKey = "settings";
export const getSettingsLS = () =>
  JSON.parse(localStorage.getItem(settingsKey) || "{}");
export const setSettingsLS = (settings: settingsType) =>
  localStorage.setItem(settingsKey, JSON.stringify(settings));

const allPathsKey = "allPaths";
export const getAllPathsLS = () =>
  JSON.parse(localStorage.getItem(allPathsKey) || "{}");
export const setAllPathsLS = (paths: Array<string>) =>
  localStorage.setItem(allPathsKey, JSON.stringify(paths));
