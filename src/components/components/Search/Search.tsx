import React, { useCallback, useState, useEffect } from "react";
import get from "lodash.get";

import {
  setSearchPathLS,
  setHighlightLS,
  clearExpandedLS,
  setExpandedLS,
  setSearchValueLS,
  expandedRoot,
  getAllPathsLS
} from "../../localStorageTools";
import { isDarkTheme } from "@settings";
import { setAllPaths, findPathsByText, showInJsonByPath } from "./searchUtils";
import { CloseIcon, SettingsIcon } from "@icons";
import { colors } from "@colors";
import { Text, Button, Input, TextTypes } from "@common";
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
    whiteSpace: "nowrap",
    fontSize: "1rem",
    fontWeight: "normal"
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

const inputValueRegExp = /^([\w-+*\\\/.]+)?$/i;
const inputPathsRegExp = /^[\w\d]*([\.\\\/][\w\d]+)*[\.\\\/]?$/i;
const pathSplitterRegExp = /[\\\/]/g;

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

    const searchAndHighlightResults = useCallback(() => {
      // Get all paths in current json
      const allPaths: Array<string> = getAllPathsLS();

      // Find all paths by search text
      let paths: Array<string> = allPaths;

      if (searchPath) {
        // Разделители chain могут быть ['/', '\', '.'] , всех заменяем на '.'
        const clearSearchPath = searchPath.replace(pathSplitterRegExp, ".");
        console.log(`clearSearchPath`, clearSearchPath);
        paths = findPathsByText(clearSearchPath, allPaths);
      }

      if (typeof searchValue === "string" && searchValue !== "") {
        paths = paths.filter(path => {
          const realPath = path.replace(`${expandedRoot}.`, "");
          const jsonData = get(json, realPath);

          // Filter by searchValue
          return String(jsonData).search(searchValue) !== -1;
        });
      }

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
    }, [json, searchPath, searchValue, settings.searchLimit]);

    const handleSearchTextCleaning = useCallback(() => {
      // If empty - clear expanded blocks and heighlights in LS
      clearExpandedLS();
      setHighlightLS({});

      // Clear result counters
      setFoundAllResults([]);
      setFoundResults([]);
    }, [setFoundAllResults, setFoundResults]);

    const onEnterAction = useCallback(() => {
      if (searchPath === "" && searchValue === "") {
        handleSearchTextCleaning();
      } else {
        searchAndHighlightResults();
      }
    }, [
      searchPath,
      searchValue,
      handleSearchTextCleaning,
      searchAndHighlightResults
    ]);
    const handleEnter = useCallback(
      e => {
        if (e.keyCode === 13) {
          forceJsonUpdate(onEnterAction, setJson, json);
        }
      },
      [json, setJson, onEnterAction]
    );
    const handleSearch = useCallback(() => {
      forceJsonUpdate(onEnterAction, setJson, json);
    }, [json, setJson, onEnterAction]);

    return (
      <div style={styles.wrapper}>
        <Input
          label="Value"
          placeholder="Search value"
          regExp={inputValueRegExp}
          initValue={searchValue}
          onEnter={handleEnter}
          onChangeValue={setSearchValue}
          onChangeValueLS={setSearchValueLS}
          setFoundResults={setFoundResults}
          setFoundAllResults={setFoundAllResults}
        />
        <Input
          label="Path"
          placeholder="Search path"
          regExp={inputPathsRegExp}
          initValue={searchPath}
          onEnter={handleEnter}
          onChangeValue={setSearchPath}
          onChangeValueLS={setSearchPathLS}
          setFoundResults={setFoundResults}
          setFoundAllResults={setFoundAllResults}
        />

        <Text
          type={TextTypes.KEY}
          style={styles.resultText}
        >{`${foundResults.length}/${foundAllResults.length}`}</Text>

        <Button title="Search" onClick={handleSearch} />
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
