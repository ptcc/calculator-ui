// @flow
import { useState } from "react";
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
      let newInput = input;
      if (input.match(/^-\d*\.?\d*$/)) {
        newInput = input.slice(1);
      } else if (input.match(/^\d*\.?\d*$/)) {
        newInput = "-" + input;
      } else {
        const parts = input.split(/([-+*/])/).filter((part) => part !== "");
        const lastPart = parts.pop();
        if (lastPart === "+") newInput = parts.join("") + "-";
        else if (["*", "/"].includes(lastPart)) {
          newInput = parts.join("") + lastPart + "-";
        } else {
          const lastOp = parts.pop();
          if (lastPart === "-") {
            if (["*", "/", "+"].includes(lastOp)) {
              newInput = parts.join("") + lastOp;
            } else {
              newInput = parts.join("") + lastOp + "+";
            }
          } else if (lastOp === "+") {
            newInput = parts.join("") + "-" + lastPart;
          } else if (lastOp === "-") {
            if (["*", "/", "+"].includes(parts[parts.length - 1])) {
              newInput = parts.join("") + lastPart;
            } else {
              newInput = parts.join("") + "+" + lastPart;
            }
          } else if (["*", "/"].includes(lastOp)) {
            newInput = parts.join("") + lastOp + "-" + lastPart;
          }
        }
      }
      setInput(newInput);
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
