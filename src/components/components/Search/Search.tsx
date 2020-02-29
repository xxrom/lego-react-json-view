import React from "react";

import {
  setSearchTextLS,
  setHighlightLS,
  clearExpandedLS,
  setExpandedLS
} from "../../localStorageTools";
import { isDarkTheme } from "@settings";
import { setAllPaths, findPathsByText, showInJsonByPath } from "./searchUtils";
import { colors } from "@colors";
import { Text } from "@common";
import { settingsType } from "../../Viewer";

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    alignItems: "center"
  },
  inputStyle: {
    background: "none",
    display: "inline-flex",
    margin: "0.5rem 0",
    position: "relative",
    boxSizing: "border-box",
    fontSize: "1.2rem",
    flex: "0.9",
    border: 0,
    borderBottom: `1px solid ${
      isDarkTheme ? colors.border.dark : colors.border.light
    }`,
    outline: "none",
    color: isDarkTheme ? colors.searchText.dark : colors.searchText.light
  },
  resultText: {
    display: "inline-flex",
    justifyContent: "flex-end",
    flex: "0.1",
    minWidth: "7rem",
    paddingLeft: "1rem",
    whiteSpace: "nowrap"
  }
};

interface SearchProps {
  searchText: string;
  setSearchText: (newText: string) => void;
  setJson: (json: any) => void;
  json: {};
  settings: settingsType;
}

const Search = React.memo(
  ({ searchText, setSearchText, json, settings, setJson }: SearchProps) => {
    const [foundResults, setFoundResults] = React.useState<Array<string>>([]);
    const [foundAllResults, setFoundAllResults] = React.useState<Array<string>>(
      []
    );
    React.useEffect(() => {
      setAllPaths(json);
    }, [json]);

    const onChange = React.useCallback(
      e => {
        const inputText = e.target.value;
        const trimSearchText = inputText.trim();

        // Only valid path value could be entered
        const regExp = /^([\w\d]+(\.[\w\d]+)*\.?)?$/i;

        if (regExp.test(trimSearchText)) {
          setSearchTextLS(trimSearchText);
          setSearchText(trimSearchText);
        }
      },
      [setSearchText]
    );

    const searchAndHighlightResults = React.useCallback(() => {
      // Find all pathes by search text
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
      // Accumulate all pathes
      cuttedPaths.forEach(path => {
        accumulatePathsLS = [...accumulatePathsLS, ...showInJsonByPath(path)];
      });

      // Save all expanded pathes to LS
      setExpandedLS(accumulatePathsLS);

      const highlightPathsLS = cuttedPaths.reduce(
        (accumulator, path) => ({
          ...accumulator,
          [path]: true
        }),
        {}
      );

      // Heighlight all found pathes
      setHighlightLS(highlightPathsLS);
    }, [searchText, settings.searchLimit]);

    const onEnter = React.useCallback(
      e => {
        if (e.keyCode === 13) {
          // If empty - clear expanded blocks and heighlights in LS
          if (searchText === "") {
            clearExpandedLS();
            setHighlightLS({});
            return;
          }

          new Promise(resolve => {
            // Set empty json
            setJson({});
            resolve(searchAndHighlightResults());
          }).then(() => {
            // TODO: think about this actions =)
            // Set back correct json
            // This actions needs for optimization purpose
            // Otherways user should collaps and open root json
            // for showing all found results.
            setJson(json);
          });
        }
      },
      [json, searchAndHighlightResults, searchText, setJson]
    );

    return (
      <div style={styles.wrapper}>
        <input
          placeholder="Search path:"
          style={styles.inputStyle}
          value={searchText}
          onChange={onChange}
          onKeyDown={onEnter}
        />
        <Text
          style={styles.resultText}
        >{`${foundResults.length}/${foundAllResults.length}`}</Text>
      </div>
    );
  }
);

export { Search };
