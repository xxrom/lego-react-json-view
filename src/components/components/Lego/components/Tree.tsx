import React from "react";
import get from "lodash.get";
import styled from "astroturf";

import { Text, TextTypes, Tabs } from "@common";
import { Line } from ".";
import { LegoProps, onToggleCutProps, Lego } from "../Lego";
import {
  setCuttedLS,
  getCuttedLS,
  setExpandedLS,
  getExpandedLS
} from "../../../localStorageTools";

interface TreeProps extends LegoProps {
  json: any;
  keyName: string;
  cuttedJson: any;
  setCuttedJson: (obj: object) => void;
  onToggleCut: (path: onToggleCutProps) => () => void;
  path: string;
}

const Tree = React.memo((props: TreeProps) => {
  const {
    json = {},
    collapses = [],
    path,
    keyName,
    cuttedJson,
    setCuttedJson,
    onToggleCut
  } = props;

  /*
   * Each Tree has isExpanded local value,
   * after change, changes will be sended to LS
   */
  const [isExpanded, setIsExpanded] = React.useState(() => {
    const expandedLS = getExpandedLS();
    const fullPath = `${path}.${keyName}`;
    return expandedLS[fullPath] ? true : false;
  });

  // TODO: remove repeated code
  const onExpand = React.useCallback(
    () => () => {
      setIsExpanded(!isExpanded);
      const fullPath = `${path}.${keyName}`;
      setExpandedLS([fullPath], !isExpanded);
    },
    [isExpanded, keyName, path]
  );

  // Check: Can we expand current json or not
  const isExpandable =
    json[keyName] &&
    (typeof json[keyName] === "object" ||
      (Array.isArray(json[keyName]) && json[keyName].length > 0));

  const foundCollapses = React.useMemo(
    () => collapses.filter(({ test }) => get(json[keyName], test)),
    [collapses, json, keyName]
  );
  const replacingPath =
    foundCollapses.length > 0 ? get(foundCollapses[0], "replaceTo") : null;
  const cuttedPath = replacingPath ? `${keyName}.${replacingPath}` : null;

  // Init cuttedPath, if not initted
  if (cuttedPath && typeof cuttedJson[cuttedPath] !== "string") {
    if (typeof localStorage.getItem(cuttedPath) !== "string") {
      // By default - collaps all blocks
      // '0'/'1' - values for toggling block,
      // it's much easier to save and load from LS
      setCuttedLS(cuttedPath, "1");
    }

    setCuttedJson({
      ...cuttedJson,
      [cuttedPath]: getCuttedLS(cuttedPath)
    });
  }

  let actualJson = json[keyName];
  let actualKeyName = keyName;

  if (replacingPath && cuttedPath && Number(cuttedJson[cuttedPath])) {
    // If possible to collapse, then change json and key
    actualJson = get(json[keyName], replacingPath);
    actualKeyName = `${keyName}.${replacingPath}`;
  }

  const fullPath = `${path}.${actualKeyName}`;

  return (
    <Wrapper>
      {replacingPath && (
        <div>
          <Text
            onClick={onToggleCut(cuttedPath)}
            type={
              cuttedPath && Number(cuttedJson[cuttedPath])
                ? TextTypes.HIDE
                : TextTypes.SHOW
            }
          >{`${
            cuttedPath && Number(cuttedJson[cuttedPath])
              ? TextTypes.SHOW
              : TextTypes.HIDE
          }: ${replacingPath}`}</Text>
        </div>
      )}
      <Line
        json={actualJson}
        keyName={keyName}
        fullPath={fullPath}
        isExpandable={isExpandable}
        isExpanded={isExpanded}
        onExpand={onExpand}
      />
      {isExpandable && (
        <Tabs isOpened={isExpanded} type="mini">
          <Lego json={actualJson} path={fullPath} collapses={collapses} />
        </Tabs>
      )}
    </Wrapper>
  );
});

export { Tree };

const Wrapper = styled("div")`
  text-align: start;
`;
