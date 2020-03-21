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
import { TextTypes } from "./Text";

const styles: Record<string, React.CSSProperties> = {
  inputStyle: {
    padding: "0 0.5rem 0 0.5rem",
    color: isDarkTheme ? colors.textColor.dark : colors.textColor.light
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
  const [focus, setFocus] = useState(false);

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

  const handleInputFocus = useCallback(() => {
    setFocus(true);
  }, [setFocus]);
  const handleInputBlur = useCallback(() => {
    setFocus(false);
  }, [setFocus]);

  const wrapperShowStyle = {
    flex: 1
  };

  /*
   * TODO: show Text and Input by focus value
   * {!focus && <Text style={styles.inputStyle}>{inputValue}</Text>}
   */
  return (
    <Wrapper onClick={handleInputFocus} style={focus ? wrapperShowStyle : {}}>
      <InputWrapper>
        {label && <Text type={TextTypes.NOWRAP}>{`${label}:`}</Text>}
        <InputStyled
          placeholder={placeholder}
          style={{
            ...styles.inputStyle,
            ...(focus ? { borderBottom: "1px solid gray" } : {})
          }}
          value={inputValue}
          onChange={onChange}
          onKeyDown={onEnter}
          onBlur={handleInputBlur}
          autoFocus
        />
      </InputWrapper>
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
  justify-content: space-between;
  transition: width 2s, height 4s;
  margin-right: 0.5rem;
`;
const InputWrapper = styled("span")`
  display: flex;
  flex: 1;
  align-items: center;
`;
const InputStyled = styled("input")`
  && {
    position: relative;
    display: inline-flex;
    flex: 1;
    background: none;
    min-width: 4rem;
    box-sizing: border-box;
    font-size: 1rem;
    border: 0;
    outline: none;
  }
`;
