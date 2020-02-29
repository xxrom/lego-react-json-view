import React from "react";
import { isDarkTheme } from "@settings";
import { colors } from "@colors";

type tabMods = "default" | "mini";

const tabBase: React.CSSProperties = {
  overflow: "hidden"
};

const tabMods: { [key in tabMods]: React.CSSProperties } = {
  default: tabBase,
  mini: {
    ...tabBase,
    margin: 0
  }
};

// Content styles
const contentBase: React.CSSProperties = {
  padding: 0,
  color: "black",
  transition: "max-height .2s, opacity .2s",
  borderLeft: `1px solid ${colors.hidden[isDarkTheme ? "dark" : "light"]}`,
  borderRadius: "0 0 0 0.3rem"
};

const contentMods: { [key in tabMods]: React.CSSProperties } = {
  default: contentBase,
  mini: {
    ...contentBase,
    padding: "0 0 0 1rem"
  }
};

const labelStyle: React.CSSProperties = {
  cursor: "pointer",
  fontSize: "1.2rem",
  padding: "0.2rem 0.3rem",
  background: colors.labelBackground.light,
  color: isDarkTheme ? colors.contrast.dark : colors.contrast.light,
  borderRadius: "0.3rem",
  border: `1px solid ${colors.buttonBackground.dark}`
};

interface TabsProps {
  label?: string;
  children: React.ReactNode;
  isOpened?: boolean;
  type?: tabMods;
  style?: React.CSSProperties;
}

const Tabs = React.memo(
  ({
    isOpened = false,
    label,
    children,
    type = "default",
    style = {}
  }: TabsProps) => {
    /*
     * isOpenedInner - inner click handler (by label click)
     * isOpened - outside click handler (from props)
     */
    const [isOpenedInner, setIsOpenedInner] = React.useState(false);

    const onClickTab = React.useCallback(
      () => setIsOpenedInner(!isOpenedInner),
      [isOpenedInner]
    );

    const tabsStyle: React.CSSProperties = React.useMemo(
      () => ({
        ...tabMods[type],
        ...style
      }),
      [style, type]
    );

    return (
      <div style={tabsStyle}>
        {label ? (
          <div style={labelStyle} onClick={onClickTab}>
            {label}
          </div>
        ) : null}
        {(isOpenedInner || isOpened) && (
          <div style={contentMods[type]}>{children}</div>
        )}
      </div>
    );
  }
);

export { Tabs };
