import React from "react";
import { Text, TextTypes } from "@common";
import styled from "astroturf";

interface InfoProps {
  isExpandable: boolean;
  onClick?: () => void;
  json: object;
}

const Info = React.memo(({ json, isExpandable, onClick }: InfoProps) => {
  const keysLength = React.useMemo(() => Object.keys(json).length, [json]);
  const onCopy = React.useCallback(() => {
    const el = document.createElement("textarea");
    el.value = JSON.stringify(json);
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }, [json]);

  const textProps = React.useMemo(() => (isExpandable ? { onClick } : {}), [
    isExpandable,
    onClick
  ]);

  return (
    <Wrapper>
      <Text type={TextTypes.TEXT} {...textProps}>
        {Array.isArray(json)
          ? ` [] ${keysLength} items`
          : ` {} ${keysLength} keys`}
      </Text>
      <CopyButton>{isExpandable ? <Copy onClick={onCopy} /> : null}</CopyButton>
    </Wrapper>
  );
});

const Wrapper = styled("span")`
  padding-left: 0.5rem;
`;

// Transparent copy button (heighlight on hover)
const CopyButton = styled("span")`
  opacity: 0.2;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const Copy = styled("span")`
  position: relative;
  display: inline-block;
  content: "";
  height: 0.7rem;
  width: 0.9rem;
  margin-left: 0.5rem;

  &:hover {
    cursor: pointer;
  }

  &::after {
    position: absolute;
    display: inline-block;
    content: "";
    top: 0;
    right: 0;
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 0.1rem;
    border: 1px solid white;
    background: gray;
  }

  &::before {
    position: absolute;
    display: inline-block;
    content: "";
    top: 0.2rem;
    right: 0.2rem;
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 0.1rem;
    border: 1px solid white;
    background: black;
  }

  &:active {
    &::after {
      background: black;
      border: 1px solid gray;
    }

    &::before {
      background: white;
      border: 1px solid gray;
    }
  }
`;

export { Info };
