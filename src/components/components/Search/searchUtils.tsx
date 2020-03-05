import {
  setExpandedLS,
  setAllPathsLS,
  getAllPathsLS,
  expandedRoot
} from "../../localStorageTools";

const isNotEmptyObjectOrArray = (item: any) => {
  if (typeof item === "undefined") {
    return false;
  }
  if (item === null) {
    return false;
  }
  if (typeof item === "object" && Object.keys(item).length > 0) {
    return true;
  }
  if (Array.isArray(item) && item.length > 0) {
    return true;
  }

  return false;
};

/*
 * Found all subPath in path value by search value
 * Each values (path and search) will be splitted by '.'
 * and then each value will be compared with each other
 * If splittedSearch fully included in splittedPath,
 * then we return true, otherways - false
 * #1
 *    path: value.test.me
 *    search: val.te.m
 * #2
 *    path: value.test.me
 *    search: val.te.me2
 *    return: false
 * #3
 *    path: value.test.me
 *    search: val.te.me.me (twice 'me' path)
 *    return: false
 */
const findPathsInPaths = (path: string, search: string): boolean => {
  let splittedPath = path.split(".");
  const splittedSearch = search.split(".");

  let isFound = true;

  let index = 0;
  while (isFound && index < splittedSearch.length) {
    const searchPath = splittedSearch[index];
    index += 1;

    // console.log(`searchPath ${searchPath}`);
    let deletingIndex = -1;
    const searchPathRegExp = new RegExp(searchPath, "i");

    // Exit from cycle if found searchPath in splittedPath
    splittedPath.some((currentPath, index) => {
      if (searchPathRegExp.test(currentPath)) {
        deletingIndex = index;
        // Found
        return true;
      }
      // Continue searching
      return false;
    });

    // If found - then delete this value from splittedPath
    // (for correct searching purpose)
    if (deletingIndex !== -1) {
      splittedPath = splittedPath.filter(
        (_: string, index: number) => index !== deletingIndex
      );
      // console.log('splittedPath', splittedPath);
    } else {
      isFound = false;
    }
  }

  return isFound;
};

/*
 * Fuzzy search paths in json.
 *
 * It's enough write a part of the word.
 *
 * Example 1:
 *    path = 'hide.this.path.in.json'
 *    searchPaths = 'hide.pat'
 *      Function findPathsInJson(path, searchPaths) return -> "true"
 *      "test" and "conte" are in "path"
 * Example 2:
 *    path = 'value.content.value.test'
 *    searchPaths = 'value.value.value'
 *      Function findPathsInJson(path, searchPaths) return -> "false"
 *      in searchPaths - three strings "value",
 *      but in "path" only two "value" string
 */
const findPathsInJson = (
  json: any, // object | string | number | null | undefined,
  searchPaths: string,
  path: string
): Array<string> => {
  if (!isNotEmptyObjectOrArray(json)) {
    if (findPathsInPaths(path, searchPaths)) {
      return [path];
    }
    return [];
  }

  return Object.keys(json).reduce<Array<string>>(
    (accumulator, key) => [
      ...accumulator,
      ...findPathsInJson(json[key], searchPaths, `${path}.${key}`)
    ],
    []
  );
};

// Return filtered paths by searchText (search paths)
const findPathsByText = (searchText: string) => {
  const allPaths: Array<string> = getAllPathsLS();

  const filteredPaths = allPaths.reduce<Array<string>>((accumulator, path) => {
    if (findPathsInPaths(path, searchText)) {
      accumulator.push(path);
    }
    return accumulator;
  }, []);

  return filteredPaths;
};

// Get all paths from json (needs for optimization reason)
const findAllPaths = (
  json: any, // object | string | number | null | undefined,
  path = expandedRoot
): Array<string> => {
  if (!isNotEmptyObjectOrArray(json)) {
    return [path];
  }

  return Object.keys(json).reduce<Array<string>>((accumulator, key) => {
    const foundPaths = findAllPaths(json[key], `${path}.${key}`);
    foundPaths.forEach(path => accumulator.push(path));
    return accumulator;
  }, []);
};

// Save all possible paths in json to LS
const setAllPaths = (json: any) => {
  const allPaths = findAllPaths(json);
  setAllPathsLS(allPaths);
};

/*
 * Expand json tree by path and save in to LS
 */
const showInJsonByPath = (path: string) => {
  const getParentPath = (childPath: string) => {
    const splittedPath = childPath.split(".");
    return splittedPath.slice(0, -1).join(".");
  };

  let childPath = path;
  let parentPath = getParentPath(path);
  const pathsLS = [];

  while (parentPath) {
    // accumulate results
    pathsLS.push(childPath);

    childPath = parentPath;
    parentPath = getParentPath(parentPath);
  }

  return pathsLS;
};

export {
  isNotEmptyObjectOrArray as checkIsObject,
  findPathsInPaths,
  findPathsInJson,
  showInJsonByPath,
  setAllPaths,
  findPathsByText
};
