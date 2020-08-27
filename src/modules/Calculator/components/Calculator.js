// @flow
import React from "react";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorButtons from "./CalculatorButtons";
import { useCalculator } from "../hooks/useCalculator";
import calculate from "../utils/calculateWithAPI";
import type { Resolver } from "../utils/resolver";
import "../styles/calculator.css";

type Props = {
  resolver?: Resolver,
};

const Calculator = ({ resolver = { calculate } }: Props) => {
  const { input, error, handleButtonPress } = useCalculator(resolver);

  return (
    <div className="calculator__container">
      <CalculatorDisplay input={input} error={error} />
      <CalculatorButtons onButtonPress={handleButtonPress} />
    </div>
  );
};

export default Calculator;
