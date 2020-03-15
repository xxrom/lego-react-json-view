import { checkIsObject } from "./components/Search/searchUtils";

// Return all pathes point
export const findAllPathPoints = (
  json: any, // object | string | number | null | undefined,
  path: string
): { [key: string]: boolean } => {
  if (!checkIsObject(json)) {
    return {};
  }

  return Object.keys(json).reduce<{ [key: string]: boolean }>(
    (accumulator, key) => {
      const foundPaths = findAllPathPoints(json[key], `${path}.${key}`);
      Object.keys(foundPaths).forEach(path => (accumulator[path] = true));
      accumulator[path] = true;
      return accumulator;
    },
    {}
  );
};

// Force Update json
export const forceJsonUpdate = (
  toDoFunction: () => any,
  setJson: (json: any) => any,
  json: any
) => {
  new Promise(resolve => {
    // Set empty json
    setJson({});

    toDoFunction();

    resolve();
  }).then(() => {
    // TODO: think about this actions =)
    // Set back correct json
    // This actions needs for optimization purpose
    // Otherways user should collaps and open root json
    // for showing all found results.
    setJson(json);
  });
};
