import client from "./calculatorAPIClient";

describe("calculatorAPIClient", () => {
  describe("client.evaluate(expression)", () => {
    it("should fetch the evaluate endpoint", () => {
      window.fetch = jest.fn(() => Promise.resolve({ json: () => {} }));

      client.evaluate("2+2");
      expect(window.fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_ADDRESS}/evaluate/2%2B2`
      );
    });

    it("should not fetch with empty expressions", async () => {
      window.fetch = jest.fn();
      const result = await client.evaluate("");
      expect(window.fetch).not.toHaveBeenCalled();
      expect(result.value).toBe("");
    });
  });
});
