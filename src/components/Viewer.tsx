import React, { useCallback, useMemo, useEffect, useState, memo } from "react";
import styled from "astroturf";
import { oc } from "ts-optchain";

import { Lego, CollapseSettings, Search } from "./components";
import {
  getCollapseSettingsLS,
  setCollapseSettingsLS,
  getSearchTextLS,
  getSettingsLS,
  getAllPathsLS,
  setExpandedLS,
  clearExpandedLS,
  expandedRoot,
  setExpandedObjectLS,
  getExpandedLS
} from "./localStorageTools";
import { colors } from "@colors";
import { isDarkTheme } from "@settings";
import { checkIsObject } from "./components/Search/searchUtils";
import { findAllPathPoints } from "./viewerHelper";

export interface ViewerProps {
  json: object;
}

export type expandedType = { [key: string]: boolean };
export type highlightType = { [key: string]: boolean };

export type themeMode = "light" | "dark" | "auto";

/**
 * Settings parameters:
 *
 * fontSize - json font size;
 * searchLimit - max number of showing results;
 * theme - color theme mode;
 * isExpanded - is expanded by default all json objects?
 */
export type settingsType = {
  fontSize: string;
  searchLimit: string;
  theme: themeMode;
  isExpanded: boolean;
};

export type setExpandedType = React.Dispatch<
  React.SetStateAction<expandedType>
>;
export type setHighlightType = React.Dispatch<
  React.SetStateAction<highlightType>
>;
export type setSettingsType = React.Dispatch<
  React.SetStateAction<settingsType>
>;

const headerStyle: React.CSSProperties = {
  background: isDarkTheme ? colors.background.dark : colors.background.light
};
const wrapperStyle: React.CSSProperties = {
  background: isDarkTheme ? colors.background.dark : colors.background.light
};

const Wrapper = styled("div")`
  position: relative;
  height: 100%;
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;
const Header = styled("div")`
  position: static;
  top: 0;
  left: 0;
`;
const Body = styled("div")`
  overflow: scroll;
  height: 100%;
`;

const defaultCollapses = [
  { test: "hide.this.path", replaceTo: "hide.this.path" }
];

const Viewer = memo(({ json: initJson = {} }: ViewerProps) => {
  const [json, setJson] = useState<{}>({ root: initJson });
  const [searchText, setSearchText] = useState("");
  const [collapses, setCollapses] = useState(defaultCollapses);
  const [isOpenedSettings, setIsOpenedSettings] = useState(false);
  const [settings, setSettings] = useState<settingsType>(() => {
    const settingsLS = getSettingsLS();
    const {
      fontSize = "1.0",
      searchLimit = "100",
      theme = "auto",
      isExpanded = true
    }: settingsType = settingsLS;
    return {
      fontSize,
      searchLimit,
      theme,
      isExpanded
    };
  });

  const legoWrapperStyle = useMemo(
    () => ({
      fontSize: `${settings.fontSize}rem`,
      lineHeight: `${Number(settings.fontSize) + 0.2}rem`
    }),
    [settings.fontSize]
  );

  useEffect(() => {
    const collapsesFromLS = getCollapseSettingsLS();
    // Init collapse filter on first render
    if (collapsesFromLS) {
      try {
        setCollapses(JSON.parse(collapsesFromLS));
      } catch (error) {
        console.error("error", error.message);
      }
    } else {
      setCollapseSettingsLS(defaultCollapses);
    }

    // Set searchText from LS
    const searchTextData = getSearchTextLS();
    if (searchTextData) {
      setSearchText(searchTextData);
    }
  }, []);

  // Update collapses settings in LS
  useEffect(() => {
    setCollapseSettingsLS(collapses);
  }, [collapses]);

  // Add root to initJson data
  useEffect(() => {
    setJson({ root: initJson });
  }, [initJson]);

  // Expand
  useEffect(() => {
    const { isExpanded } = getSettingsLS();

    if (!isExpanded) {
      // By-default everything closed
      return;
    }

    /**
     * If provided settingslisExpanded === true
     * then expand every point in json
     * with inheriting previous values (expandedLS)
     */
    new Promise(resolve => {
      setJson({ root: {} }); // (*) Force update json tree

      const allExpandedPathesObject = findAllPathPoints(json, expandedRoot);
      const allExpandedLS = getExpandedLS();

      // Inherit expanded values from LS
      Object.keys(allExpandedLS).forEach(path => {
        if (
          typeof oc(allExpandedLS)[path]() === "boolean" &&
          typeof oc(allExpandedPathesObject)[path]() === "boolean"
        ) {
          allExpandedPathesObject[path] = allExpandedLS[path];
        }
      });

      setExpandedObjectLS(allExpandedPathesObject);
      resolve(true);
    }).then(() => {
      // TODO: think about this actions =)
      // (*) Set back correct json
      // This actions needs for optimization purpose
      // Otherways user should collaps and open root json
      // for showing expanded/collapsed json data
      setJson(json);
    });
  }, [getSettingsLS, setJson, clearExpandedLS]);

  const onToggleSettings = useCallback(
    () => setIsOpenedSettings(!isOpenedSettings),
    [isOpenedSettings]
  );

  return (
    <Wrapper style={wrapperStyle}>
      <Header style={headerStyle}>
        <Search
          searchText={searchText}
          setSearchText={setSearchText}
          json={json}
          settings={settings}
          setJson={setJson}
          onToggleSettings={onToggleSettings}
        />
        <CollapseSettings
          collapses={collapses}
          setCollapses={setCollapses}
          json={json}
          setJson={setJson}
          settings={settings}
          setSettings={setSettings}
          isOpenedSettings={isOpenedSettings}
          setIsOpenedSettings={setIsOpenedSettings}
        />
      </Header>
      <Body style={legoWrapperStyle}>
        <Lego json={json} collapses={collapses} />
      </Body>
    </Wrapper>
  );
});

export { Viewer };
