import { useState } from "react";
import { singletonHook } from "react-singleton-hook";

const initValue: ERC20_Pool = {};

let globalSetMode = () => {
  throw new Error("you must useERC20Pool before setting its state");
};

export const useERC20Pool = singletonHook(initValue, () => {
  const pool =
    (JSON.parse(
      window.localStorage.getItem("ERC20_Pool") || "{}"
    ) as ERC20_Pool) || initValue;

  const [mode, setMode] = useState<ERC20_Pool>(pool);
  //@ts-ignore
  globalSetMode = setMode;
  return mode;
});

export const setERC20Pool = (pool: ERC20_Pool) => {
  //@ts-ignore
  globalSetMode(pool);
};

export interface Erc20 {
  name: string;
  address: string;
}

export type ERC20_Pool = Record<string, Erc20>;
