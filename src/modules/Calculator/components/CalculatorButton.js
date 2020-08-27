// @flow
import React from "react";
import { useKeyPress } from "../../Core/hooks/useKeyPress";

type Props = {
  onButtonPress: (string) => void,
  command: string,
  text: string,
  hotkey: string,
};

const CalculatorButton = ({ onButtonPress, command, text, hotkey }: Props) => {
  const pressed = useKeyPress(hotkey, onButtonPress, command);
  return (
    <button
      key={command}
      className={`calculator__button calculator__button-${text} ${
        pressed ? "calculator__button--pressed" : ""
      }`}
      data-testid={`calculator-button-${command}`}
      data-command={command}
      onClick={() => onButtonPress(command)}
    >
      {text}
    </button>
  );
};

export default CalculatorButton;
