import { isNumber } from "./isNumber";

describe("IsNumber fn testing", () => {
  test("True, number", () => {
    const result = isNumber(5);
    expect(result).toBe(true);
  });

  test("True, number", () => {
    const result = isNumber("56");
    expect(result).toBe(true);
  });


  test("False, not number", () => {
    const result = isNumber("asd");
    expect(result).toBe(false);
  });
});
