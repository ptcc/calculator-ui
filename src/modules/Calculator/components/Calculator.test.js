import { fireEvent, render, wait, act } from "@testing-library/react";
import React from "react";
import Calculator from "./Calculator";

describe("<Calculator />", () => {
  const renderCalc = (props) => render(<Calculator {...props} />);
  it("should render a Calculator with a display and buttons", () => {
    const { getByTestId } = renderCalc();
    expect(getByTestId("calculator-display")).toBeInTheDocument();
    expect(getByTestId("calculator-buttons")).toBeInTheDocument();
  });

  it("should fill the display when clicking the buttons", () => {
    const { getByTestId } = renderCalc();
    fireEvent.click(getByTestId("calculator-button-1"));
    fireEvent.click(getByTestId("calculator-button-0"));
    fireEvent.click(getByTestId("calculator-button-+"));
    fireEvent.click(getByTestId("calculator-button-1"));

    expect(getByTestId("calculator-display")).toHaveTextContent("10+1");
  });

  it("should fill the display when pressing the keyboard", () => {
    const { getByTestId } = renderCalc();

    fireEvent.keyDown(window, { key: "2" });
    fireEvent.keyDown(window, { key: "x" });
    fireEvent.keyDown(window, { key: "3" });
    expect(getByTestId("calculator-display")).toHaveTextContent("2x3");
  });

  it("should calculate the result using the provided resolver", async () => {
    const resolver = { calculate: jest.fn(() => Promise.resolve("6")) };
    const { getByTestId } = renderCalc({ resolver });

    fireEvent.keyDown(window, { key: "2" });
    fireEvent.keyDown(window, { key: "x" });
    fireEvent.keyDown(window, { key: "3" });
    fireEvent.keyDown(window, { key: "=" });

    expect(resolver.calculate).toHaveBeenCalledWith("2*3");
    act(() => {});
    await wait(() =>
      expect(getByTestId("calculator-display")).toHaveTextContent("6")
    );
  });

  it("should show an error message", async () => {
    const resolver = {
      calculate: jest.fn(() => Promise.resolve({ error: "ERROR" })),
    };
    const { getByTestId } = renderCalc({ resolver });

    fireEvent.keyDown(window, { key: "=" });

    act(() => {});
    await wait(() => {
      expect(getByTestId("calculator-display-error")).toBeInTheDocument(
        "ERROR"
      );
    });
  });

  it("should ignore unknown keys", async () => {
    const { getByTestId } = renderCalc();

    fireEvent.keyDown(window, { key: "A" });
    fireEvent.keyDown(window, { key: "2" });
    fireEvent.keyDown(window, { key: "x" });
    fireEvent.keyDown(window, { key: "_" });
    fireEvent.keyDown(window, { key: "3" });

    expect(getByTestId("calculator-display")).toHaveTextContent("2x3");
  });

  it('should ignore invalid expression leading button presses',()=>{
    const { getByTestId } = renderCalc();
    fireEvent.click(getByTestId("calculator-button-1"));
    fireEvent.click(getByTestId("calculator-button-."));
    fireEvent.click(getByTestId("calculator-button-."));
    fireEvent.click(getByTestId("calculator-button-5"));
    fireEvent.click(getByTestId("calculator-button-0"));
    fireEvent.click(getByTestId("calculator-button-."));
    fireEvent.click(getByTestId("calculator-button-*"));
    fireEvent.click(getByTestId("calculator-button-*"));
    fireEvent.click(getByTestId("calculator-button--"));
    fireEvent.click(getByTestId("calculator-button-2"));

    expect(getByTestId("calculator-display")).toHaveTextContent("1.50x-2");
  })
});
