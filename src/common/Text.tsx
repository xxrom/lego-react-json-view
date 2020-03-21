import React from "react";

import { isDarkTheme } from "@settings";
import { colors } from "@colors";

export enum TextTypes {
  KEY = "key",
  HIDE = "hide",
  SHOW = "show",
  TEXT = "text",
  JSON = "json",
  NOWRAP = "nowrap"
}

interface TextProps {
  type?: TextTypes;
  children: React.ReactNode;
  onClick?: ((event: React.MouseEvent<HTMLInputElement>) => void) | undefined;
  style?: React.CSSProperties;
}

const textCommonStyle: React.CSSProperties = {
  color: isDarkTheme ? colors.keyColor.dark : colors.keyColor.light,
  wordBreak: "break-all",
  fontWeight: "normal"
};

const textMods: { [key in TextTypes]: React.CSSProperties } = {
  [TextTypes.KEY]: {
    ...textCommonStyle,
    fontWeight: "bold",
    paddingRight: "0.5rem"
  },
  [TextTypes.HIDE]: {
    ...textCommonStyle,
    color: isDarkTheme ? colors.hideColor.dark : colors.hideColor.light
  },
  [TextTypes.SHOW]: {
    ...textCommonStyle,
    color: isDarkTheme ? colors.showColor.dark : colors.showColor.light
  },
  [TextTypes.TEXT]: {
    ...textCommonStyle,
    color: isDarkTheme ? colors.textColor.dark : colors.textColor.light
  },
  [TextTypes.JSON]: {
    ...textCommonStyle,
    color: isDarkTheme ? colors.jsonColor.dark : colors.jsonColor.light
  },
  [TextTypes.NOWRAP]: {
    ...textCommonStyle,
    whiteSpace: "nowrap"
  }
};

const Text = React.memo(
  ({
    type = TextTypes.TEXT,
    style = {},
    children,
    onClick,
    ...other
  }: TextProps) => {
    const innerStyle = React.useMemo(
      () => ({
        ...textMods[type],
        ...{
          cursor: typeof onClick !== "undefined" ? "pointer" : "text"
        }
      }),
      [type, onClick]
    );
    return (
      <span style={{ ...innerStyle, ...style }} onClick={onClick} {...other}>
        {String(children)}
      </span>
    );
  }
);

export { Text };
