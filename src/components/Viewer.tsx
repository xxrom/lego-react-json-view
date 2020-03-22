import React, { useCallback, useMemo, useEffect, useState, memo } from "react";
import styled from "astroturf";
import { oc } from "ts-optchain";

import { Lego, CollapseSettings, Search } from "./components";
import {
  getCollapseSettingsLS,
  setCollapseSettingsLS,
  getSearchPathLS,
  getSettingsLS,
  getSearchValueLS
} from "./localStorageTools";
import { colors } from "@colors";
import { isDarkTheme } from "@settings";

export type expandedType = { [key: string]: boolean };
export type highlightType = { [key: string]: boolean };
export type searchType = string;
export type jsonType = { [key: string]: object };

export type themeMode = "light" | "dark" | "auto";

export type setJsonType = React.Dispatch<React.SetStateAction<jsonType>>;
export type setSearchPathType = React.Dispatch<
  React.SetStateAction<searchType>
>;
export type setSearchValueType = React.Dispatch<
  React.SetStateAction<searchType>
>;
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

// TODO: extend settingsType
export interface ViewerProps {
  json: object;
  settings: {
    fontSize?: string;
    searchLimit?: string;
    theme?: themeMode | string;
    isExpanded?: boolean;
  };
}

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

const defaultCollapses = [
  { test: "hide.this.path", replaceTo: "hide.this.path" }
];

const Viewer = memo((props: ViewerProps) => {
  const { json: initJson = {}, settings: settingsInit = {} } = props;

  const [json, setJson] = useState<jsonType>({ root: initJson });
  const [searchPath, setSearchPath] = useState<searchType>(() => {
    // Set searchPath from LS if exist
    const searchPathData = getSearchPathLS();
    return searchPathData ? searchPathData : "";
  });
  const [searchValue, setSearchValue] = useState<searchType>(() => {
    const searchValueData = getSearchValueLS();
    // Set searchValue from LS if exist
    return searchValueData ? searchValueData : "";
  });
  const [collapses, setCollapses] = useState(() => {
    const collapsesFromLS = getCollapseSettingsLS();
    // Init collapse filter on first render
    if (collapsesFromLS) {
      try {
        return JSON.parse(collapsesFromLS);
      } catch (error) {
        console.error("error", error.message);
      }
    }

    setCollapseSettingsLS(defaultCollapses);

    return defaultCollapses;
  });
  const [isOpenedSettings, setIsOpenedSettings] = useState(false);
  const [settings, setSettings] = useState<settingsType>(() => {
    const settingsLS = getSettingsLS();

    const {
      fontSize = "1.0",
      searchLimit = "100",
      theme = "auto",
      isExpanded = false
    }: settingsType = settingsLS;

    return {
      fontSize: oc(settingsInit).fontSize(fontSize),
      searchLimit: oc(settingsInit).searchLimit(searchLimit),
      theme: oc(settingsInit).theme(theme) as themeMode,
      isExpanded: oc(settingsInit).isExpanded(isExpanded)
    };
  });

  const legoWrapperStyle = useMemo(
    () => ({
      fontSize: `${settings.fontSize}rem`,
      lineHeight: `${Number(settings.fontSize) + 0.2}rem`
    }),
    [settings.fontSize]
  );

  // Update collapses settings in LS
  useEffect(() => {
    setCollapseSettingsLS(collapses);
  }, [collapses]);

  // Add root to initJson data
  useEffect(() => {
    setJson({ root: initJson });
  }, [initJson]);

  const onToggleSettings = useCallback(
    () => setIsOpenedSettings(!isOpenedSettings),
    [isOpenedSettings]
  );

  return (
    <Wrapper style={wrapperStyle}>
      <Header style={headerStyle}>
        <Search
          searchPath={searchPath}
          searchValue={searchValue}
          setSearchPath={setSearchPath}
          setSearchValue={setSearchValue}
          json={json}
          settings={settings}
          setJson={setJson}
          isOpenedSettings={isOpenedSettings}
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
      <LegoWrapper style={legoWrapperStyle}>
        <Lego json={json} collapses={collapses} />
      </LegoWrapper>
    </Wrapper>
  );
});

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
const LegoWrapper = styled("div")`
  overflow: scroll;
`;

export { Viewer };
