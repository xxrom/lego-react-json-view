import React, { useCallback, memo, useState } from "react";
import styled from "astroturf";
import { oc } from "ts-optchain";

import { isDarkTheme } from "@settings";
import { colors } from "@colors";
import { Tabs, Button, Text, TextTypes } from "@common";
import {
  setSettingsLS,
  clearExpandedLS,
  expandedRoot,
  getExpandedLS,
  setExpandedObjectLS
} from "../../localStorageTools";
import { setSettingsType, settingsType, themeMode } from "../../Viewer";
import { findAllPathPoints } from "../../viewerHelper";

const styles: Record<string, React.CSSProperties> = {
  input: {
    fontSize: "1rem",
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
  },
  fontValue: {
    paddingLeft: "0.5rem",
    color: isDarkTheme ? colors.jsonColor.dark : colors.jsonColor.light
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
  json: {};
  setJson: (json: any) => void;
  isOpenedSettings: boolean;
  setIsOpenedSettings: (toggle: boolean) => void;
}

const CollapseSettings = memo(
  ({
    collapses,
    setCollapses,
    settings,
    setSettings,
    json,
    setJson,
    isOpenedSettings,
    setIsOpenedSettings
  }: CollapseSettingsProps) => {
    const [test, setTest] = useState("");
    const [replaceTo, setReplaceTo] = useState("");
    const [disabledButtons, setDisabledButtons] = useState<{
      [key: string]: boolean;
    }>({
      isExpanded: false
    });

    const onChangeTest = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTest(e.target.value);
      setReplaceTo(e.target.value);
    };
    const onChangeReplaceTo = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setReplaceTo(e.target.value);
      },
      []
    );
    const onClickAddCollapse = useCallback(() => {
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
    const onDelete = useCallback(
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

    const updateFontSize = useCallback(
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
    const onUp = useCallback(
      () => updateFontSize(Number(settings.fontSize) + 0.05),
      [settings.fontSize, updateFontSize]
    );
    const onDown = useCallback(
      () => updateFontSize(Number(settings.fontSize) - 0.05),
      [settings.fontSize, updateFontSize]
    );

    const updateSearchLimit = useCallback(
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

    const setIsOpened = useCallback(
      () => setIsOpenedSettings(!isOpenedSettings),
      [isOpenedSettings, setIsOpenedSettings]
    );
    const onClickTheme = useCallback(
      (theme: themeMode) => () => {
        const settingsObject: settingsType = {
          ...settings,
          theme
        };
        setSettings(settingsObject);
        setSettingsLS(settingsObject);
      },
      [setSettings, settings]
    );

    const onExpandAction = useCallback((innerJson: object) => {
      const allExpandedPathesObject = findAllPathPoints(
        innerJson,
        expandedRoot
      );
      const allExpandedLS = getExpandedLS();

      // Inherit expanded values from LS
      Object.keys(allExpandedLS).forEach(path => {
        if (
          typeof oc(allExpandedLS)[path]() === "boolean" &&
          typeof oc(allExpandedPathesObject)[path]() === "boolean"
        ) {
          allExpandedPathesObject[path] = allExpandedLS[path];
        }
      });

      setExpandedObjectLS(allExpandedPathesObject);
    }, []);
    const onClickIsExpanded = useCallback(
      (isExpanded: boolean) => () => {
        // disable button
        setDisabledButtons({
          ...disabledButtons,
          isExpanded: true
        });

        const settingsObject: settingsType = {
          ...settings,
          isExpanded
        };

        // If isExpanded === false => clear all expanded data
        if (!isExpanded) {
          clearExpandedLS();
        } else {
          onExpandAction(json);
        }
        setSettings(settingsObject);
        setSettingsLS(settingsObject);

        // enable button
        setDisabledButtons({
          ...disabledButtons,
          isExpanded: false
        });
      },
      [disabledButtons, settings, setSettings, onExpandAction, json]
    );

    if (!isOpenedSettings) {
      return null;
    }

    return (
      <BlockWrapper>
        <Tabs
          isOpened={isOpenedSettings}
          setIsOpened={setIsOpened}
          label="Settings:"
        >
          <Wrapper>
            <span style={styles.fontLabel}>{`Font size:`}</span>
            <Button title="-0.05" onClick={onDown} />
            <span style={styles.fontValue}>{`"${Number(
              settings.fontSize
            ).toFixed(2)} rem"`}</span>
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
          <Wrapper>
            <span
              style={styles.fontLabel}
            >{`Theme (page reload needed):`}</span>
            <span style={styles.fontValue}>{`"${settings.theme}"`}</span>
            <Button title="dark" onClick={onClickTheme("dark")} />
            <Button title="light" onClick={onClickTheme("light")} />
            <Button title="auto" onClick={onClickTheme("auto")} />
          </Wrapper>
          <Wrapper>
            <span
              style={styles.fontLabel}
            >{`Expanded by default? (experimented):`}</span>
            <span style={styles.fontValue}>{`"${
              settings.isExpanded ? "expanded" : "collapsed"
            }"`}</span>
            <Button
              disabled={disabledButtons.isExpanded}
              title="expanded"
              onClick={onClickIsExpanded(true)}
            />
            <Button
              disabled={disabledButtons.isExpanded}
              title="collapsed"
              onClick={onClickIsExpanded(false)}
            />
          </Wrapper>
          <Tabs
            label="Collapse paths:"
            style={{ margin: "0.5rem 0 0 0.5rem" }}
            defaultValue={true}
          >
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
                placeholder="hide path value"
                onChange={onChangeTest}
                onKeyDown={onEnter}
              />
              {" / "}
              <input
                style={styles.input}
                placeholder="(custom path replacement)"
                value={replaceTo}
                onChange={onChangeReplaceTo}
                onKeyDown={onEnter}
              />
              <Button onClick={onClickAddCollapse} title="Add" />
            </InnerWrapper>
          </Tabs>
        </Tabs>
      </BlockWrapper>
    );
  }
);

const BlockWrapper = styled("div")`
  padding: 0 0 0.5rem 0;
  border-bottom: 2px solid gray;
`;
const Wrapper = styled("div")`
  margin-top: 0.5rem;
`;
const InnerWrapper = styled("div")`
  font-size: 1rem;
  margin: 0.5rem 0 0 0.5rem;
`;
const CollapseWrapper = styled("div")`
  margin-bottom: "0.5rem";
`;

export { CollapseSettings };
