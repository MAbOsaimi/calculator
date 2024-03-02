const opening = "([";
const closing = ")]";
const operations = "-+*/^";

/*TODO: Handle negative numbers and decimals */
export function parser(input) {
  if (/^[+-]?\d+(\.\d+)?$/.test(input)) {
    // This checks if the input is a number that may start with "0", "-" or "+",
    // followed by one or more digits, and optionally a decimal point followed by at least one digit.
    // For example, it matches inputs like "-132.71", "+123", "0.456", etc.
    return parseFloat(input);
  }
  const exp = input.replaceAll(/×|÷/g, (op) => {
    switch (op) {
      case "×":
        return "*";
      case "÷":
        return "/";
    }
  });
  if (!checkBalancedBrackets(exp)) {
    return "Syntax Error";
  }
  const postfixExp = convertInfixToPostfix(exp);
  return evaluatePostfix(postfixExp);
}

function checkBalancedBrackets(exp) {
  const brackets = [];
  for (const char of exp) {
    if (opening.includes(char)) {
      brackets.push(char);
    }
    if (closing.includes(char)) {
      if (
        brackets.length === 0 ||
        opening.indexOf(brackets.pop()) != closing.indexOf(char)
      ) {
        return false;
      }
    }
  }
  return brackets.length === 0;
}

function convertInfixToPostfix(exp) {
  let buffer = "";
  const operators = [];
  for (const char of exp) {
    if (/\d/.test(char)) {
      buffer += char;
      continue;
    }
    if (
      operations.includes(char) ||
      opening.includes(char) ||
      closing.includes(char)
    ) {
      buffer += " ";
      let top = operators.at(-1);
      switch (char) {
        case "(":
        case "[":
          operators.push(char);
          break;
        case ")":
        case "]":
          while (opening.indexOf(top) != closing.indexOf(char)) {
            buffer += " " + operators.pop() + " ";
            top = operators.at(-1);
          }
          operators.pop();
          break;
        default:
          if (operations.includes(char)) {
            const currentPrec = getPrecedence(char);
            while (operators.length > 0 && !opening.includes(top)) {
              let topPrec = getPrecedence(top);
              if (currentPrec > topPrec) {
                break;
              }
              buffer += " " + operators.pop() + " ";
            }
            operators.push(char);
          }
      }
    }
  }
  while (operators.length > 0) {
    buffer += " " + operators.pop() + " ";
  }
  return buffer;
}

function getPrecedence(op) {
  switch (op) {
    case "^":
      return 3;
    case "*":
    case "/":
      return 2;
    case "+":
    case "-":
      return 1;
  }
}

function evaluatePostfix(postfixExp) {
  const numbers = [];
  let number = "";

  for (const char of postfixExp) {
    if (operations.indexOf(char) != -1) {
      const right = numbers.pop();
      const left = numbers.pop();
      numbers.push(evaluateStringExpression(`${left},${char},${right}`));
      continue;
    }
    if (char != " ") {
      number += char;
    }
    if (char === " " && number != "") {
      numbers.push(number);
      number = "";
    }
  }
  return isNaN(numbers[0]) ? "Syntax Error" : numbers[0];
}

function evaluateStringExpression(strExp) {
  const exp = strExp.split(",");
  const operand1 = exp[0];
  const operator = exp[1];
  const operand2 = exp[2];
  switch (operator) {
    case "/":
      return parseFloat(operand1) / parseFloat(operand2);
    case "*":
      return parseFloat(operand1) * parseFloat(operand2);
    case "+":
      return parseFloat(operand1) + parseFloat(operand2);
    case "-":
      return parseFloat(operand1) - parseFloat(operand2);
  }
}
