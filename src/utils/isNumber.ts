export function isNumber(arg: any) {
  return !isNaN(parseFloat(arg)) && !isNaN(arg - 0);
}
