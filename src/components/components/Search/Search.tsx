import React, { useCallback, useState, useEffect } from "react";
import styled from "astroturf";

import {
  setSearchPathLS,
  setHighlightLS,
  clearExpandedLS,
  setExpandedLS,
  setSearchValueLS
} from "../../localStorageTools";
import { isDarkTheme } from "@settings";
import { setAllPaths, findPathsByText, showInJsonByPath } from "./searchUtils";
import { CloseIcon, SettingsIcon } from "@icons";
import { colors } from "@colors";
import { Text, Button, Input } from "@common";
import {
  settingsType,
  setSearchPathType,
  setSearchValueType,
  searchType,
  setJsonType,
  jsonType
} from "../../Viewer";
import { forceJsonUpdate } from "../../viewerHelper";

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    borderLeft: "1px solid gray",
    paddingLeft: "0.5rem",
    marginLeft: "-0.5rem"
  },
  inputStyle: {
    color: isDarkTheme ? colors.searchText.dark : colors.searchText.light
  },
  resultText: {
    display: "inline-flex",
    justifyContent: "flex-end",
    paddingLeft: "0.5rem",
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
  searchPath: searchType;
  searchValue: searchType;
  setSearchPath: setSearchPathType;
  setSearchValue: setSearchValueType;
  setJson: setJsonType;
  json: jsonType;
  settings: settingsType;
  isOpenedSettings: boolean;
  onToggleSettings: () => void;
}

export type foundResultsType = Array<string>;
export type setFountResultsType = React.Dispatch<
  React.SetStateAction<foundResultsType>
>;
export type foundAllResultsType = Array<string>;
export type setFountAllResultsType = React.Dispatch<
  React.SetStateAction<foundAllResultsType>
>;

const Search = React.memo(
  ({
    searchPath,
    searchValue,
    setSearchPath,
    setSearchValue,
    json,
    settings,
    setJson,
    isOpenedSettings,
    onToggleSettings
  }: SearchProps) => {
    const [foundResults, setFoundResults] = useState<foundResultsType>([]);
    const [foundAllResults, setFoundAllResults] = useState<foundAllResultsType>(
      []
    );
    useEffect(() => {
      setAllPaths(json);
    }, [json]);

    const handleChangeSearchText = useCallback(
      (text = "") => {
        setSearchPathLS(text);
        setSearchPath(text);
      },
      [setSearchPathLS, setSearchPath]
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
      [handleChangeSearchText]
    );

    const searchAndHighlightResults = useCallback(() => {
      // Find all paths by search text
      const paths: Array<string> = findPathsByText(searchPath);

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
    }, [searchPath, settings.searchLimit]);

    const handleSearchTextCleaning = useCallback(() => {
      // If empty - clear expanded blocks and heighlights in LS
      clearExpandedLS();
      setHighlightLS({});

      // Clear result counters
      setFoundAllResults([]);
      setFoundResults([]);
    }, [clearExpandedLS, setHighlightLS, setFoundAllResults, setFoundResults]);

    const onEnterAction = useCallback(() => {
      if (searchPath === "") {
        handleSearchTextCleaning();
      } else {
        searchAndHighlightResults();
      }
    }, [
      searchPath,
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
      [json, searchAndHighlightResults, setJson, onEnterAction]
    );

    return (
      <div style={styles.wrapper}>
        <Input
          label="Path"
          placeholder="Search path"
          initValue={searchPath}
          onChangeValue={setSearchPath}
          onChangeValueLS={setSearchPathLS}
          onEnter={handleEnter}
          setFoundResults={setFoundResults}
          setFoundAllResults={setFoundAllResults}
        />
        <Input
          label="Value"
          placeholder="Search value"
          initValue={searchValue}
          onChangeValue={setSearchValue}
          onChangeValueLS={setSearchValueLS}
          setFoundResults={setFoundResults}
          setFoundAllResults={setFoundAllResults}
        />
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

const InputStyled = styled("input")`
  && {
    position: relative;
    background: none;
    display: inline-flex;
    margin: 0.5rem 0;
    position: relative;
    box-sizing: border-box;
    font-size: 1rem;
    flex: 1;
    border: 0;
    outline: none;

    padding-left: 0.7rem;
  }
`;
