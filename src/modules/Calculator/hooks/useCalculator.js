// @flow
import { useState } from "react";
import { changeLastSign } from "../utils/expression";
import type { Resolver } from "../utils/resolver";

const validateInput = (input) =>
  /^(-|(-?\d+\.?\d*([-+/*]-?\d+\.?\d*)*[-+/*]?-?))$/.test(input);

const useCalculator = (resolver: Resolver) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const commands: { [string]: () => Promise<void> | void } = {
    "=": async () => {
      const value = await resolver.calculate(input);
      if (value.error) setError(value.error);
      else if (typeof value === "string") setInput(value);
    },
    CLEAR: () => {
      setInput("");
      setError("");
    },
    DELETE: () => {
      const newInput = validateInput(input) ? input.slice(0, -1) : "";
      setInput(newInput);
      setError("");
    },
    SIGN: () => {
      setInput(changeLastSign(input));
    },
  };

  const handleButtonPress = (char: string) => {
    if (char.match(/[-+*/0-9.]/)) {
      const newInput = validateInput(input) ? `${input}${char}` : char;
      if (validateInput(newInput)) {
        setInput(newInput);
        setError("");
      }
    } else {
      commands[char]();
    }
  };

  return { input, error, handleButtonPress };
};

export { useCalculator };
