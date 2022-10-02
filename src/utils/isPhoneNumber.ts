export function isPhoneNumber(str: string) {
  const phoneNum = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
  return phoneNum.test(str);
}
