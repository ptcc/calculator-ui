// @flow
import React, { useMemo } from "react";
import ExpressionDisplayer from "./ExpressionDisplayer";
import { parse } from "../utils/expression";

type Props = {
  input: string,
  error: string,
};

const CalculatorDisplay = ({ input, error }: Props) => {
  const parsed = useMemo(() => parse(input || "0"), [input]);
  return (
    <section className="calculator-display" data-testid="calculator-display">
      {error && (
        <div
          className="calculator-display__error"
          data-testid="calculator-display-error"
        >
          {error}
        </div>
      )}
      <div className="calculator-display__current">
        <ExpressionDisplayer expression={parsed} />
      </div>
    </section>
  );
};

export default CalculatorDisplay;
