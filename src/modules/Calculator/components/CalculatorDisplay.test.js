import { render } from "@testing-library/react";
import React from "react";
import CalculatorDisplay from "./CalculatorDisplay";

describe("<CalculatorDisplay />", () => {
  const renderComponent = (props) => render(<CalculatorDisplay {...props} />);
  it("should render 0 by default", () => {
    const { container } = renderComponent();
    expect(container).toHaveTextContent("0");
  });

  it("should render * as x", () => {
    const { container } = renderComponent({ input: "10*3.5" });
    expect(container).toHaveTextContent("10x3.5");
  });

  it("should render Infinity as ∞", () => {
    const { container } = renderComponent({ input: "Infinity" });
    expect(container).toHaveTextContent("∞");
  });

  it("should render NaN as 'Impossible'", () => {
    const { container } = renderComponent({ input: "NaN" });
    expect(container).toHaveTextContent("Impossible");
  });

});
