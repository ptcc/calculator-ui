// @flow
import React, { Fragment } from "react";
import type { Expression } from "../utils/expression";

type Props = {
  expression: Expression,
};

const operatorDisplayMap: { [string]: string } = { "*": "x" };
const numberDisplayMap: { [string]: string } = { NaN: "Impossible", Infinity: "∞" };
const formatOperator = (operator: string) =>
  operatorDisplayMap[operator] || operator;
const formatNumber = (value) => numberDisplayMap[value] || value;

const ExpressionDisplayer = ({ expression }: Props) =>
  expression.type === "operator" ? (
    <span className="expression-displayer__operation">
      {expression.operands.map((operand, index, { length }) => (
        <Fragment key={`operand${index}`}>
          <ExpressionDisplayer expression={operand} />
          {index !== length - 1 && (
            <span className="expression-displayer__operator">
              {formatOperator(expression.operator)}
            </span>
          )}
        </Fragment>
      ))}
    </span>
  ) : expression.type === "number" ? (
    <span className="expression-displayer__number">
      {formatNumber(expression.value) || null}
    </span>
  ) : null;

export default ExpressionDisplayer;
