import React, { useCallback, useMemo, useEffect, useState, memo } from "react";
import styled from "astroturf";

import { Lego, CollapseSettings, Search } from "./components";
import {
  getCollapseSettingsLS,
  setCollapseSettingsLS,
  getSearchTextLS,
  getSettingsLS
} from "./localStorageTools";
import { colors } from "@colors";
import { isDarkTheme } from "@settings";

export interface ViewerProps {
  json: object;
}

export type expandedType = { [key: string]: boolean };
export type highlightType = { [key: string]: boolean };
export type settingsType = { fontSize: string; searchLimit: string };
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
  { test: "value.content.value", replaceTo: "value.content.value" },
  { test: "hide.this.path", replaceTo: "hide.this.path" }
];

const Viewer = memo(({ json: initJson = {} }: ViewerProps) => {
  const [json, setJson] = useState({ root: initJson });
  const [searchText, setSearchText] = useState("");
  const [collapses, setCollapses] = useState(defaultCollapses);
  const [isOpenedSettings, setIsOpenedSettings] = useState(false);
  const [settings, setSettings] = useState<settingsType>(() => {
    const settingsLS = getSettingsLS();
    const { fontSize = "1.0", searchLimit = "100" } = settingsLS;
    return {
      fontSize,
      searchLimit
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

    const searchTextData = getSearchTextLS();
    if (searchTextData) {
      setSearchText(searchTextData);
    }
  }, []);

  useEffect(() => {
    setCollapseSettingsLS(collapses);
  }, [collapses]);

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
