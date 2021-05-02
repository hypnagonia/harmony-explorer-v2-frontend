export function formatNumber(num: number, options?: object): string {
  if(num === undefined) return '';

  return num.toLocaleString('en-US', options);
}

export function reintervate(func: () => any, interval: number) {
  const res = func();
  if(res instanceof Promise) {
    res.then(() => setTimeout(() => reintervate(func, interval), interval))
  } else {
    setTimeout(() => reintervate(func, interval), interval);
  }
};