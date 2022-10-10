import { isPhoneNumber } from './isPhoneNumber';

describe("isPhoneNumber fn testing", () => {
  test("True, phoneNumber", () => {
    const result = isPhoneNumber("+55 84 91234-4321");
    expect(result).toBe(true);
  });

  test("False, not phoneNumber", () => {
    const result = isPhoneNumber("sasx");
    expect(result).toBe(false);
  });
});
