import React, { useCallback, useState, useEffect } from "react";
import styled from "astroturf";

import {
  setSearchTextLS,
  setHighlightLS,
  clearExpandedLS,
  setExpandedLS
} from "../../localStorageTools";
import { isDarkTheme } from "@settings";
import { setAllPaths, findPathsByText, showInJsonByPath } from "./searchUtils";
import { colors } from "@colors";
import { Text, Button } from "@common";
import { settingsType } from "../../Viewer";
import { CloseIcon, SettingsIcon } from "@icons";
import { forceJsonUpdate } from "../../viewerHelper";

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    alignItems: "center"
  },
  inputStyle: {
    color: isDarkTheme ? colors.searchText.dark : colors.searchText.light
  },
  resultText: {
    display: "inline-flex",
    justifyContent: "flex-end",
    flex: "0.1",
    minWidth: "6rem",
    paddingLeft: "1rem",
    whiteSpace: "nowrap",
    fontSize: "1rem"
  },
  settings: {
    background: isDarkTheme
      ? colors.buttonBackground.dark
      : colors.buttonBackground.light,
    border: `1px solid ${
      isDarkTheme ? colors.border.dark : colors.border.light
    }`
  }
};

interface SearchProps {
  searchText: string;
  setSearchText: (newText: string) => void;
  setJson: (json: any) => void;
  json: {};
  settings: settingsType;
  isOpenedSettings: boolean;
  onToggleSettings: () => void;
}

const Search = React.memo(
  ({
    searchText,
    setSearchText,
    json,
    settings,
    setJson,
    isOpenedSettings,
    onToggleSettings
  }: SearchProps) => {
    const [foundResults, setFoundResults] = useState<Array<string>>([]);
    const [foundAllResults, setFoundAllResults] = useState<Array<string>>([]);
    useEffect(() => {
      setAllPaths(json);
    }, [json]);

    const handleChangeSearchText = useCallback(
      (text = "") => {
        setSearchTextLS(text);
        setSearchText(text);
      },
      [setSearchTextLS, setSearchText]
    );

    const onChange = useCallback(
      e => {
        const inputText = e.target.value;
        const trimSearchText = inputText.trim();

        // Only valid path value could be entered
        const regExp = /^([\w\d]+(\.[\w\d]+)*\.?)?$/i;

        if (regExp.test(trimSearchText)) {
          handleChangeSearchText(trimSearchText);
        }
      },
      [setSearchText]
    );

    const searchAndHighlightResults = useCallback(() => {
      // Find all paths by search text
      const paths: Array<string> = findPathsByText(searchText);

      // Get maximum search result value
      const maxResultItems = Number(settings.searchLimit);
      const cuttedPaths =
        maxResultItems > 0
          ? paths.filter((_, index) => index < maxResultItems)
          : paths;

      setFoundAllResults(paths);
      setFoundResults(cuttedPaths);

      // Collaps all blocks
      clearExpandedLS();

      let accumulatePathsLS: Array<string> = [];
      // Accumulate all paths
      cuttedPaths.forEach(path => {
        accumulatePathsLS = [...accumulatePathsLS, ...showInJsonByPath(path)];
      });

      // Save all expanded paths to LS
      setExpandedLS(accumulatePathsLS);

      const highlightPathsLS = cuttedPaths.reduce(
        (accumulator, path) => ({
          ...accumulator,
          [path]: true
        }),
        {}
      );

      // Heighlight all found paths
      setHighlightLS(highlightPathsLS);
    }, [searchText, settings.searchLimit]);

    const handleSearchTextCleaning = useCallback(() => {
      // If empty - clear expanded blocks and heighlights in LS
      clearExpandedLS();
      setHighlightLS({});

      // Clear result counters
      setFoundAllResults([]);
      setFoundResults([]);
    }, [clearExpandedLS, setHighlightLS, setFoundAllResults, setFoundResults]);

    const onEnterAction = useCallback(() => {
      if (searchText === "") {
        handleSearchTextCleaning();
      } else {
        searchAndHighlightResults();
      }
    }, [
      searchText,
      clearExpandedLS,
      setHighlightLS,
      searchAndHighlightResults
    ]);

    const handleEnter = useCallback(
      e => {
        if (e.keyCode === 13) {
          forceJsonUpdate(onEnterAction, setJson, json);
        }
      },
      [json, searchAndHighlightResults, searchText, setJson, onEnterAction]
    );

    const handleClearInput = useCallback(() => {
      handleChangeSearchText();
      handleSearchTextCleaning();
    }, []);

    return (
      <div style={styles.wrapper}>
        <Input
          placeholder="Search path:"
          style={styles.inputStyle}
          value={searchText}
          onChange={onChange}
          onKeyDown={handleEnter}
        />
        {searchText && (
          <Button onClick={handleClearInput} type="circle">
            <CloseIcon size="0.7rem" />
          </Button>
        )}
        <Text
          style={styles.resultText}
        >{`${foundResults.length}/${foundAllResults.length}`}</Text>
        <Button
          onClick={onToggleSettings}
          type="circle"
          style={{ padding: "0.4rem", marginLeft: "0.5rem" }}
        >
          {isOpenedSettings ? <CloseIcon /> : <SettingsIcon />}
        </Button>
      </div>
    );
  }
);

export { Search };

const Input = styled("input")`
  && {
    position: relative;
    background: none;
    display: inline-flex;
    margin: 0.5rem 0;
    position: relative;
    box-sizing: border-box;
    font-size: 1rem;
    flex: 0.9;
    border: 0;
    outline: none;
    border-left: 1px solid gray;
    padding-left: 0.7rem;
  }
`;
