import React from "react";
import styled from "astroturf";

import { isDarkTheme } from "@settings";
import { colors } from "@colors";
import { Tabs, Button, Text, TextTypes } from "@common";
import { setSettingsLS } from "../../localStorageTools";
import { setSettingsType, settingsType } from "../../Viewer";

const styles: Record<string, React.CSSProperties> = {
  input: {
    fontSize: "1.2rem",
    border: 0,
    borderBottom: `1px solid ${
      isDarkTheme ? colors.buttonText.dark : colors.buttonText.light
    }`,
    outline: "none",
    background: "none",
    color: isDarkTheme ? colors.keyColor.dark : colors.keyColor.light
  },
  fontLabel: {
    paddingLeft: "0.5rem",
    color: isDarkTheme ? colors.textColor.dark : colors.textColor.light
  }
};

type CollapseItem = { test: string; replaceTo: string };
export type CollapsesType = Array<CollapseItem>;
export type SetCollapses = (collapses: Array<CollapseItem>) => void;

interface CollapseSettingsProps {
  collapses: Array<CollapseItem>;
  setCollapses: SetCollapses;
  settings: settingsType;
  setSettings: setSettingsType;
}

const CollapseSettings = React.memo(
  ({
    collapses,
    setCollapses,
    settings,
    setSettings
  }: CollapseSettingsProps) => {
    const [test, setTest] = React.useState("");
    const [replaceTo, setReplaceTo] = React.useState("");

    const onChangeTest = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTest(e.target.value);
      setReplaceTo(e.target.value);
    };
    const onChangeReplaceTo = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setReplaceTo(e.target.value);
      },
      []
    );
    const onClickAddCollapse = React.useCallback(() => {
      const trimTest = test.trim();
      const trimReplaceTo = replaceTo.trim();
      const minWordLength = 3;

      if (
        trimTest.length > minWordLength &&
        trimReplaceTo.length > minWordLength
      ) {
        setCollapses([...collapses, { test, replaceTo }]);
        setTest("");
        setReplaceTo("");
      }
    }, [test, replaceTo, collapses, setCollapses]);
    const onDelete = React.useCallback(
      (index: number) => () => {
        const changedCollaps = [...collapses];
        changedCollaps.splice(index, 1);
        setCollapses(changedCollaps);
      },
      [collapses, setCollapses]
    );
    const onEnter = (e: React.KeyboardEvent) => {
      // On Enter
      if (e.keyCode === 13) {
        onClickAddCollapse();
      }
    };

    const updateFontSize = React.useCallback(
      (fontSize: number) => {
        if (fontSize < 0.49 || fontSize > 2.01) {
          return;
        }
        const settingsObject: settingsType = {
          ...settings,
          fontSize: String(fontSize)
        };
        setSettings(settingsObject);
        setSettingsLS(settingsObject);
      },
      [setSettings, settings]
    );
    const onUp = React.useCallback(
      () => updateFontSize(Number(settings.fontSize) + 0.05),
      [settings.fontSize, updateFontSize]
    );
    const onDown = React.useCallback(
      () => updateFontSize(Number(settings.fontSize) - 0.05),
      [settings.fontSize, updateFontSize]
    );

    const updateSearchLimit = React.useCallback(
      event => {
        const searchLimit = Number(event.target.value);
        if (!Number.isInteger(searchLimit)) {
          return;
        }

        const settingsObject: settingsType = {
          ...settings,
          searchLimit: String(searchLimit)
        };
        setSettings(settingsObject);
        setSettingsLS(settingsObject);
      },
      [setSettings, settings]
    );

    return (
      <Tabs label="settings">
        <Wrapper>
          <span style={styles.fontLabel}>{`Font size:`}</span>
          <Button title="-0.05" onClick={onDown} />
          <span style={styles.fontLabel}>{`${Number(settings.fontSize).toFixed(
            2
          )} rem`}</span>
          <Button title="+0.05" onClick={onUp} />
        </Wrapper>
        <Wrapper>
          <span
            style={styles.fontLabel}
          >{`Search limit results (0 - disabled):`}</span>
          <input
            style={{ ...styles.fontLabel, ...styles.input }}
            value={settings.searchLimit ? String(settings.searchLimit) : ""}
            onChange={updateSearchLimit}
            placeholder="Enter search limit number:"
          />
        </Wrapper>
        <Tabs label="Collapse settings" style={{ margin: "0.5rem 0 0 0.5rem" }}>
          <InnerWrapper>
            {collapses.map(({ test, replaceTo }, index) => (
              <CollapseWrapper key={`${test}_${index}`}>
                <Text type={TextTypes.KEY}>{test}</Text> /{" "}
                <Text type={TextTypes.KEY}>{replaceTo}</Text>
                <Button onClick={onDelete(index)} title="Delete" />
              </CollapseWrapper>
            ))}
            <input
              style={styles.input}
              value={test}
              placeholder="test value"
              onChange={onChangeTest}
              onKeyDown={onEnter}
            />
            {" / "}
            <input
              style={styles.input}
              placeholder="replaceTo value"
              value={replaceTo}
              onChange={onChangeReplaceTo}
              onKeyDown={onEnter}
            />
            <Button onClick={onClickAddCollapse} title="Add" />
          </InnerWrapper>
        </Tabs>
      </Tabs>
    );
  }
);

const Wrapper = styled("div")`
  margin-top: 0.5rem;
`;
const InnerWrapper = styled("div")`
  font-size: 1.2rem;
  margin: 0.5rem 0 0 0.5rem;
`;
const CollapseWrapper = styled("div")`
  margin-bottom: "0.5rem";
`;

export { CollapseSettings };
