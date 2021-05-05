import React, { useEffect } from "react";

export function ONE_USDT_Rate() {
  useEffect(() => {
    const rates = {} as Record<string, number>;
    fetch("https://api.binance.com/api/v3/klines?symbol=ONEUSDT&interval=1d")
      .then((_res) => _res.json())
      .then((res) => {
        res.forEach((t: Array<string | number>) => {
          rates[String(t[0])] = Number(t[1]);
        });
        window.localStorage.setItem('ONE_USDT_rates', JSON.stringify(rates))
      });
    return () => {};
  }, []);
  return null;
}

export function getNearestPriceForTimestamp(timestamp: number) {
  const rates = JSON.parse(window.localStorage.getItem('ONE_USDT_rates') || '{}') as Record<string, number>;
  const timestamps = Object.keys(rates);
  const prices = Object.values(rates);

  if(timestamp >= +timestamps.slice(-1)[0]) {
    return prices.slice(-1)[0];
  }

  if(timestamp <= +timestamps[0]) {
    return prices[0];
  }

  if(timestamps.length) {
    let i = 0;
    while(+timestamps[i] <= timestamp) {
      i++;
    }

    console.log(i);

    return prices[i];
  }

  return 0;
}
