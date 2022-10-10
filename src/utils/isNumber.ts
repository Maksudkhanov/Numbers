export function isNumber(arg: any): boolean {
  return !isNaN(parseFloat(arg)) && !isNaN(arg - 0);
}
