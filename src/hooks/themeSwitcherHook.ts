import { useState } from "react";
import { singletonHook } from "react-singleton-hook";

const initTheme: themeType = "light";

let globalSetMode = () => {
  throw new Error("you must useDarkMode before setting its state");
};

export const useThemeMode = singletonHook(initTheme, () => {
  const [mode, setMode] = useState(initTheme);
  //@ts-ignore
  globalSetMode = setMode;
  return mode;
});

//@ts-ignore
export const setThemeMode = (mode: themeType) => globalSetMode(mode);

export type themeType = "light" | "dark";
