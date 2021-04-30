export function formatNumber(num: number, options?: object): string {
  if(!num) return '';

  return num.toLocaleString('en-US', options);
}