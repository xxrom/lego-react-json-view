import React from "react";
import styled from "astroturf";

import { isDarkTheme } from "@settings";
import { colors } from "@colors";

export type ButtonMods = "default" | "mini" | "circle";

const baseStyle: React.CSSProperties = {
  color: isDarkTheme ? colors.buttonText.dark : colors.buttonText.light,
  background: isDarkTheme
    ? colors.buttonBackground.dark
    : colors.buttonBackground.light,
  border: `1px solid ${isDarkTheme ? colors.border.dark : colors.border.light}`
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
    borderRadius: "50%"
  }
};

interface ButtonProps {
  title?: string;
  type?: ButtonMods;
  onClick: () => void;
  children?: React.ElementType;
}

const Button = React.memo(
  ({
    title = null,
    onClick,
    type = "default",
    children = null
  }: ButtonProps) => (
    <ButtonStyled style={mods[type]} onClick={onClick}>
      {title ? title : children}
    </ButtonStyled>
  )
);

const ButtonStyled = styled("button")`
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
