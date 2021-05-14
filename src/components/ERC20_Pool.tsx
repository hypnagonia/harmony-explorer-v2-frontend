import React, { useEffect } from "react";
import { getAllERC20 } from "src/api/client";
import dayjs from "dayjs";
import { setERC20Pool, Erc20 } from 'src/hooks/ERC20_Pool';

export function ERC20_Pool() {
  useEffect(() => {
    const getRates = async () => {
      const erc20: Erc20[] = await getAllERC20();
      const erc20Map = {} as Record<string, Erc20>;
      erc20.forEach((i: any) => {
        erc20Map[i.address] = i;
      });

      window.localStorage.setItem("ERC20_Pool", JSON.stringify(erc20Map));
      setERC20Pool(erc20Map);
    };

    let tId = 0;

    window.onload = function () {
      getRates();
      tId = window.setInterval(getRates, 10 * 60 * 1e3);
    };

    return () => {
      clearTimeout(tId);
    };
  }, []);

  return null;
}

export function getNearestPriceForTimestamp(timestampString: string) {
  const rates = JSON.parse(
    window.localStorage.getItem("ONE_USDT_rates") || "{}"
  ) as Record<string, number>;
  const timestamps = Object.keys(rates);
  const prices = Object.values(rates);
  const timestamp = dayjs(timestampString).valueOf();

  if (timestamp >= +timestamps.slice(-1)[0]) {
    return prices.slice(-1)[0];
  }

  if (timestamp <= +timestamps[0]) {
    return -1;
  }

  if (timestamps.length) {
    let i = 0;
    while (+timestamps[i] <= timestamp) {
      i++;
    }

    return prices[i];
  }

  return 0;
}
