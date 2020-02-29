export const isDarkTheme =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
