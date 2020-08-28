import { changeLastSign } from "./expression";

describe("changeLastSign", () => {
  test("from empty input", () => {
    expect(changeLastSign("")).toBe("-");
  });

  test("back to empty input", () => {
    expect(changeLastSign("-")).toBe("");
  });

  test("from positive integer", () => {
    expect(changeLastSign("42")).toBe("-42");
  });

  test("from negative integer", () => {
    expect(changeLastSign("-42")).toBe("42");
  });

  test("from positive float", () => {
    expect(changeLastSign("42.00")).toBe("-42.00");
  });

  test("from negative float", () => {
    expect(changeLastSign("-42.00")).toBe("42.00");
  });

  test("ending in operation", () => {
    expect(changeLastSign("10*")).toBe("10*-");
    expect(changeLastSign("10*-")).toBe("10*");
    expect(changeLastSign("10/")).toBe("10/-");
    expect(changeLastSign("10/-")).toBe("10/");
    expect(changeLastSign("10+")).toBe("10-");
    expect(changeLastSign("10-")).toBe("10+");
  });

  test("ending in --", () => {
    expect(changeLastSign("10--")).toBe("10-");
  });

  test("ending in a number preceeded by --", () => {
    expect(changeLastSign("10--4.2")).toBe("10-4.2");
  });

  test("composite expression ending in a number", () => {
    expect(changeLastSign("10*4.2")).toBe("10*-4.2");
    expect(changeLastSign("10*-4.2")).toBe("10*4.2");
    expect(changeLastSign("10/4.2")).toBe("10/-4.2");
    expect(changeLastSign("10/-4.2")).toBe("10/4.2");
    expect(changeLastSign("10+4.2")).toBe("10-4.2");
    expect(changeLastSign("10-4.2")).toBe("10+4.2");
  });
});
