import React from "react";
import styled, { css } from "astroturf";
import { colors } from "@colors";
import { isDarkTheme } from "@settings";

interface CloseIconProps {
  size?: number | string;
}

export const CloseIcon = ({ size = "1.2rem" }: CloseIconProps) => {
  const styles = {
    close: {
      height: size,
      width: size
    },
    lines: {
      background: colors.textColor[isDarkTheme ? "dark" : "light"]
    },
    hover: {
      lines: {
        one: {
          transform: "rotate(180deg)"
        },
        two: {
          transfrom: "rotate(-90deg)"
        }
      }
    }
  };

  return (
    <Close style={styles.close}>
      <LineOne style={styles.lines} />
      <LineTwo style={styles.lines} />
    </Close>
  );
};

const Close = styled("div")`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
`;

const BaseLineCSS = css`
  .base {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -7%;
    margin-left: -50%;
    display: block;
    height: 15%;
    width: 100%;
    transition: all 0.15s ease-out;
    border-radius: 1px;
  }
`;
const LineOne = styled("span")`
  composes: ${BaseLineCSS.base};
  transform: rotate(-45deg);
`;
const LineTwo = styled("span")`
  composes: ${BaseLineCSS.base};
  transform: rotate(-135deg);
`;
