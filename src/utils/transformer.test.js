import { camelToUnderscore } from "./transformer";

describe("Test suite of camelToUnderScore", () => {
  it("Should match all camel case concurrencies in thiefExpensiveAndLongDescription", () => {
    expect(camelToUnderscore("thiefExpensiveAndLongDescription")).toBe(
      "thief_expensive_and_long_description"
    );
  });
});
