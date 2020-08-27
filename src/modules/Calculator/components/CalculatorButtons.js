// @flow
import React from "react";
import CalculatorButton from "./CalculatorButton";
import { useKeyPress } from "../../Core/hooks/useKeyPress";

const buttons = [
  { hotkey: "C", text: "C", command: "CLEAR" },
  { hotkey: "Backspace", text: "⌫", command: "DELETE" },
  { hotkey: "±", text: "⁺⁄₋", command: "SIGN" },
  { hotkey: "+", text: "+", command: "+" },
  { hotkey: "7", text: "7", command: "7" },
  { hotkey: "8", text: "8", command: "8" },
  { hotkey: "9", text: "9", command: "9" },
  { hotkey: "-", text: "-", command: "-" },
  { hotkey: "4", text: "4", command: "4" },
  { hotkey: "5", text: "5", command: "5" },
  { hotkey: "6", text: "6", command: "6" },
  { hotkey: "x", text: "x", command: "*" },
  { hotkey: "1", text: "1", command: "1" },
  { hotkey: "2", text: "2", command: "2" },
  { hotkey: "3", text: "3", command: "3" },
  { hotkey: "/", text: "/", command: "/" },
  { hotkey: "0", text: "0", command: "0" },
  { hotkey: ".", text: ".", command: "." },
  { hotkey: "=", text: "=", command: "=" },
];

type Props = {
  onButtonPress: (string) => void,
};

const CalculatorButtons = ({ onButtonPress }: Props) => {
  useKeyPress("Enter", onButtonPress, "=");
  useKeyPress("*", onButtonPress, "*");
  return (
    <section className="calculator-buttons" data-testid="calculator-buttons">
      {buttons.map(({ hotkey, text, command }) => (
        <CalculatorButton
          key={text}
          command={command}
          text={text}
          hotkey={hotkey}
          onButtonPress={onButtonPress}
        />
      ))}
    </section>
  );
};
export default CalculatorButtons;
