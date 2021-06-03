export function formatNumber(num: number, options?: object): string {
  if (num === undefined) return "";

  return num.toLocaleString("en-US", options);
}

export function reintervate(
  func: () => any,
  interval: number
): number | Promise<number> {
  const res = func();
  if (res instanceof Promise) {
    return res.then(() =>
      window.setTimeout(() => reintervate(func, interval), interval)
    );
  } else {
    return window.setTimeout(() => reintervate(func, interval), interval);
  }
}

export function calculateFee(transaction: any) {
  const fee =
    isNaN(transaction.gas) || isNaN(transaction.gasPrice)
      ? 0
      : (Number(transaction.gas) * Number(transaction.gasPrice)) /
        10 ** 14 /
        10000;

  return Intl.NumberFormat("en-US", { maximumFractionDigits: 18 }).format(fee);
  //return Math.round(fee * 10 ** 9) / 10 ** 9;
}
