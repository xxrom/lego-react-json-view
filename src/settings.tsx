import { getSettingsLS } from "./components/localStorageTools";

const currentTheme = getSettingsLS().theme;

export const isDarkTheme =
  currentTheme !== "light" &&
  ((window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
    currentTheme === "dark");
