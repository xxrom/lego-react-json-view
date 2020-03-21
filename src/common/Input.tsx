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
  setHighlightLS
} from "../components/localStorageTools";

const styles: Record<string, React.CSSProperties> = {
  inputStyle: {
    color: isDarkTheme ? colors.searchText.dark : colors.searchText.light
  }
};

const emptyFn = () => {};
type onChangeType = (test: string) => void;
type onKeyDownType = (event: React.KeyboardEvent<HTMLInputElement>) => void;

interface InputProps {
  label?: string;
  initValue?: string;
  placeholder?: string;
  onEnter?: onKeyDownType;
  setFoundResults?: setFountAllResultsType;
  setFoundAllResults?: setFountResultsType;
  onChangeValue?: onChangeType;
  onChangeValueLS?: onChangeType;
  regExp?: RegExp;
}

const Input = (props: InputProps) => {
  const {
    label,
    regExp,
    placeholder = "",
    initValue = "",
    onEnter = emptyFn,
    setFoundResults = emptyFn,
    setFoundAllResults = emptyFn,
    onChangeValue = emptyFn,
    onChangeValueLS = emptyFn
  } = props;
  const [inputValue, setInputValue] = useState(initValue);

  const handleChangeInput = useCallback(
    (value = "") => {
      setInputValue(value);
      onChangeValue(value);
      onChangeValueLS(value);
    },
    [onChangeValue, onChangeValueLS]
  );

  const onChange = useCallback(
    e => {
      const inputText = e.target.value;

      if (!regExp) {
        handleChangeInput(inputText);
      }

      // Only valid path value could be entered
      if (regExp.test(inputText)) {
        handleChangeInput(inputText);
      }
    },
    [handleChangeInput, regExp]
  );

  const handleSearchTextCleaning = useCallback(() => {
    // If empty - clear expanded blocks and heighlights in LS
    clearExpandedLS();
    setHighlightLS({});

    // Clear result counters
    setFoundAllResults([]);
    setFoundResults([]);
  }, [setFoundAllResults, setFoundResults]);

  const handleClearInput = useCallback(() => {
    handleChangeInput();
    handleSearchTextCleaning();
  }, [handleChangeInput, handleSearchTextCleaning]);

  return (
    <Wrapper>
      {label && <Text>{`${label}:`}</Text>}
      <InputStyled
        placeholder={placeholder}
        style={styles.inputStyle}
        value={inputValue}
        onChange={onChange}
        onKeyDown={onEnter}
      />
      {inputValue && (
        <Button onClick={handleClearInput} type="circle">
          <CloseIcon size="0.7rem" />
        </Button>
      )}
    </Wrapper>
  );
};

export { Input };

const Wrapper = styled("div")`
  display: inline-flex;
  flex: 1;
  align-items: center;
  justify-items: center;
  border-left: 2px solid gray;
`;
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
