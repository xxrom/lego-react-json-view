import React from "react";
import { isDarkTheme } from "@settings";
import { colors } from "@colors";
import styled from "astroturf";

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
  title: string;
  type?: ButtonMods;
  onClick: () => void;
}

const Button = React.memo(
  ({ title, onClick, type = "default" }: ButtonProps) => (
    <ButtonStyled style={mods[type]} onClick={onClick}>
      {title}
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
  opacity: 0.9;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

export { Button };
