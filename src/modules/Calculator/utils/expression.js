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
  // negative number
  if (input.match(/^-\d*\.?\d*$/)) return input.slice(1);
  //positive number
  if (input.match(/^\d*\.?\d*$/)) return "-" + input;

  const parts = input.split(/([-+*/])/).filter((part) => part !== "");
  const lastPart = parts.pop();

  //ending in +
  if (lastPart === "+") return parts.join("") + "-";
  //ending in * or /
  if (["*", "/"].includes(lastPart)) return parts.join("") + lastPart + "-";

  const lastOp = parts.pop();
  //ending in -
  if (lastPart === "-") {
    //ending in - with an operator before
    if (["*", "/", "+", '-'].includes(lastOp)) return parts.join("") + lastOp;
    //ending in - with a number before
    return parts.join("") + lastOp + "+";
  }
  //ending in a number
  //with a + before
  if (lastOp === "+") return parts.join("") + "-" + lastPart;
  //with a - before
  if (lastOp === "-") {
    //the - is preceeded by an operator
    if (["*", "/", "+", '-'].includes(parts[parts.length - 1]))
      return parts.join("") + lastPart;
    //the - is preceded by a number
    return parts.join("") + "+" + lastPart;
  }
  //with a * or a / before
  if (["*", "/"].includes(lastOp))
    return parts.join("") + lastOp + "-" + lastPart;

  return input;
};

export { parse, changeLastSign };
export type { Expression };
