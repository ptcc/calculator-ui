// @flow
import { useCallback, useEffect, useState } from "react";

function useKeyPress(
  targetKey: string,
  handler: (string) => void,
  argument: string
) {
  const [pressed, setPressed] = useState(false);

  const upHandler = useCallback(
    ({ key }: { key: string }) => {
      if (key.toUpperCase() === targetKey.toUpperCase()) {
        setPressed(false);
      }
    },
    [targetKey]
  );

  const downHandler = useCallback(
    ({ key }: { key: string }) => {
      if (key.toUpperCase() === targetKey.toUpperCase()) {
        setPressed(true);

        handler(argument);
      }
    },
    [targetKey, handler, argument]
  );

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, upHandler]); // Empty array ensures that effect is only run on mount and unmount

  return pressed;
}

export { useKeyPress };
