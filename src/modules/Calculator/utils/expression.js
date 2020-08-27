// @flow
type Expression =
  | {|
      operands: Array<Expression>,
      operator: string,
      type: "operator",
    |}
  | {| type: "number", value: string |};

const parse = (str: string) =>
  parseOperator("+", str) ||
  parseOperator("-", str) ||
  parseOperator("/", str) ||
  parseOperator("*", str) ||
  parseNumber(str);

const parseOperator = (operator, str) =>
  str.includes(operator) && {
    type: "operator",
    operator,
    operands: str.split(operator).map<Object>(parse),
  };

const parseNumber = (str) => ({ type: "number", value: str });

const changeLastSign = (input: string) => {
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
  return newInput;
};

export { parse, changeLastSign };
export type { Expression };
