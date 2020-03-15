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
