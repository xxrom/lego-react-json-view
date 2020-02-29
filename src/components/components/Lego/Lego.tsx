import React from "react";

import { Tree } from "./components";
import {
  setCuttedLS,
  getCuttedLS,
  expandedRoot
} from "../../localStorageTools";
import { CollapsesType } from "../CollapseSettings/CollapseSettings";
import { TextTypes, Text } from "@common";

export type onExpandProps = string;
export type onToggleCutProps = string | null;
export interface LegoProps {
  json: object;
  collapses?: CollapsesType;
  path?: string;
}

const Lego = React.memo(
  ({ json, collapses = [], path = expandedRoot }: LegoProps) => {
    const [cuttedJson, setCuttedJson] = React.useState({});

    const onToggleCut = React.useCallback(
      (cutPath: onToggleCutProps) => () => {
        if (!cutPath) {
          return;
        }
        // Toggle cut path block
        const cutPathValue = getCuttedLS(cutPath);
        setCuttedLS(cutPath, String(1 - Number(cutPathValue)));

        setCuttedJson({
          ...cuttedJson,
          [cutPath]: getCuttedLS(cutPath)
        });
      },
      [cuttedJson]
    );

    const keysArray = Object.keys(json);
    if (keysArray.length === 0) {
      //If empty - show empty array or object text
      return (
        <Text type={TextTypes.TEXT}>{Array.isArray(json) ? "[ ]" : "{ }"}</Text>
      );
    }

    return (
      <div>
        {keysArray.map(keyName => (
          <Tree
            key={`${path}.${keyName}`}
            json={json}
            keyName={keyName}
            path={path}
            cuttedJson={cuttedJson}
            collapses={collapses}
            onToggleCut={onToggleCut}
            setCuttedJson={setCuttedJson}
          />
        ))}
      </div>
    );
  }
);

export { Lego };
