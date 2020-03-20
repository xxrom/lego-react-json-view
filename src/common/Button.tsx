import React from "react";
import styled from "astroturf";

import { isDarkTheme } from "@settings";
import { colors } from "@colors";

export type ButtonMods = "default" | "mini" | "circle" | "disabled";

const baseStyle: React.CSSProperties = {
  color: colors.buttonText[isDarkTheme ? "dark" : "light"],
  background: colors.buttonBackground[isDarkTheme ? "dark" : "light"],
  border: `1px solid ${colors.border[isDarkTheme ? "dark" : "light"]}`
};

const mods: { [key in ButtonMods]: React.CSSProperties } = {
  default: baseStyle,
  mini: {
    ...baseStyle,
    padding: "0rem 0.2rem",
    fontSize: "0.8rem"
  },
  circle: {
    ...baseStyle,
    padding: "0.2rem",
    margin: "0.2rem",
    borderRadius: "50%"
  },
  disabled: {
    color: isDarkTheme ? colors.disabled.dark : colors.disabled.light
  }
};

interface ButtonProps {
  title?: string;
  type?: ButtonMods;
  onClick: () => void;
  children?: React.ReactElement | Array<React.ReactElement>;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Button = React.memo(
  ({
    title = null,
    onClick,
    type = "default",
    children = null,
    disabled = false,
    style = {},
    ...rest
  }: ButtonProps) => (
    <ButtonStyled
      style={{ ...mods[type], ...(disabled ? mods.disabled : {}), ...style }}
      onClick={disabled ? () => {} : onClick}
      {...rest}
    >
      {title ? title : children}
    </ButtonStyled>
  )
);

const ButtonStyled = styled("button")`
  display: inline-flex;
  justify-items: center;
  align-items: center;
  padding: 0.2rem 0.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 0.3rem;
  outline: none;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
    box-shadow: 0 0 0.1rem 0.1rem #666;
  }
  &:active {
    box-shadow: 0 0 0.2rem 0.1rem #777;
  }
`;

export { Button };
