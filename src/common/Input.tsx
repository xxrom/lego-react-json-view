import React, { useState, useCallback } from "react";
import styled from "astroturf";

import { isDarkTheme } from "@settings";
import { colors } from "@colors";
import { Text, Button } from "@common";
import { CloseIcon } from "@icons";
import {
  setFountAllResultsType,
  setFountResultsType
} from "../components/components/Search/Search";
import {
  clearExpandedLS,
  setHighlightLS,
  setSearchValueLS
} from "../components/localStorageTools";

const styles: Record<string, React.CSSProperties> = {
  inputStyle: {
    color: isDarkTheme ? colors.searchText.dark : colors.searchText.light
  }
};

const emptyFn = () => {};

interface InputProps {
  label?: string;
  handleEnter?: () => void;
  setFoundResults?: setFountAllResultsType;
  setFoundAllResults?: setFountResultsType;
}

const Input = (props: InputProps) => {
  const {
    label = "label",
    handleEnter = emptyFn,
    setFoundResults = emptyFn,
    setFoundAllResults = emptyFn
  } = props;
  const [inputValue, setInputValue] = useState("");

  const handleChangeSearchText = useCallback(
    (text = "") => {
      setSearchValueLS(text);
      setInputValue(text);
    },
    [setSearchValueLS, setInputValue]
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
    [setInputValue]
  );

  const handleSearchTextCleaning = useCallback(() => {
    // If empty - clear expanded blocks and heighlights in LS
    clearExpandedLS();
    setHighlightLS({});

    // Clear result counters
    setFoundAllResults([]);
    setFoundResults([]);
  }, [clearExpandedLS, setHighlightLS, setFoundAllResults, setFoundResults]);

  const handleClearInput = useCallback(() => {
    handleChangeSearchText();
    handleSearchTextCleaning();
  }, [handleChangeSearchText, handleSearchTextCleaning]);

  return (
    <span>
      {label && <Text>{`${label}:`}</Text>}
      <InputStyled
        placeholder="Search path:"
        style={styles.inputStyle}
        value={inputValue}
        onChange={onChange}
        onKeyDown={handleEnter}
      />
      {inputValue && (
        <Button onClick={handleClearInput} type="circle">
          <CloseIcon size="0.7rem" />
        </Button>
      )}
    </span>
  );
};

export { Input };

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
