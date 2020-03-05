import React from "react";
import styled from "astroturf";

import { Text, TextTypes } from "@common";
import { Info } from "./";
import { onExpandProps } from "../Lego";
import { isDarkTheme } from "@settings";
import { colors } from "@colors";
import { getHighlightLS } from "../../../localStorageTools";

interface LineProps {
  isExpandable: boolean;
  isExpanded: boolean;
  onExpand: (fullPath: onExpandProps) => () => void;
  json: object;
  keyName: string;
  fullPath: string;
}

const modeHighlightStyle: React.CSSProperties = isDarkTheme
  ? { background: colors.highlightBackground.dark }
  : { background: colors.highlightBackground.light };

const Line = React.memo(
  ({
    isExpandable,
    onExpand,
    isExpanded,
    json,
    keyName,
    fullPath
  }: LineProps) => {
    const maxCharsInLine = 30;
    const stringifyJson = JSON.stringify(json);

    const jsonData: object | string = React.useMemo(
      () =>
        isExpandable
          ? `${stringifyJson.slice(0, maxCharsInLine)}${
              stringifyJson.length > maxCharsInLine ? "..." : ""
            }`
          : json,
      [isExpandable, json, stringifyJson]
    );

    const jsonTextType = React.useMemo(() => {
      if (
        !isExpandable &&
        (stringifyJson === "null" || stringifyJson === "undefined")
      ) {
        return TextTypes.TEXT;
      }

      return TextTypes.JSON;
    }, [isExpandable, stringifyJson]);

    // Heighlight found path
    const highlightLS = getHighlightLS();
    // TODO: useMemo
    const isHighlighted = highlightLS[fullPath];
    const highlightStyle = React.useMemo(
      () => ({
        ...(isHighlighted ? modeHighlightStyle : {})
      }),
      [isHighlighted]
    );

    const expandedBulletStyle = React.useMemo(
      () => ({
        color: isDarkTheme ? colors.textColor.dark : colors.textColor.light
      }),
      []
    );

    const onClickLocal = React.useMemo(
      () => (isExpandable ? onExpand(fullPath) : void 0),
      [fullPath, isExpandable, onExpand]
    );

    return (
      <Wrapper style={highlightStyle}>
        {isExpandable && (
          <ExpandedSpan style={expandedBulletStyle} onClick={onClickLocal}>
            {isExpanded ? "v" : ">"}
          </ExpandedSpan>
        )}
        <Text type={TextTypes.KEY} onClick={onClickLocal}>
          {keyName}
        </Text>
        {
          <Text type={jsonTextType} onClick={onClickLocal}>
            {jsonData}
          </Text>
        }
        {isExpandable && (
          <Info
            isExpandable={isExpandable}
            json={json}
            onClick={onClickLocal}
          />
        )}
      </Wrapper>
    );
  }
);

// TODO: pointer !
const Wrapper = styled("div")`
  display: flex;
  padding: 1px 0;
  cursor: pointer;
`;

const ExpandedSpan = styled("span")`
  display: inline-block;
  width: 0.5rem;
  height: 100%;
  padding-right: 0.3rem;
  overflow: hidden;
`;

export { Line };
