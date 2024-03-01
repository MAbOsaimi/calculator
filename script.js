const input = document.querySelectorAll(".input");

const display = document.getElementById("display");

const calculatorOp = document.querySelectorAll(".calculator-operation");

const clearOp = document.getElementById("clear");
const deleteOp = document.getElementById("delete");
const evaluate = document.getElementById("evaluate");
for (const inputAble of input) {
  inputAble.addEventListener("click", () => {
    display.textContent += inputAble.textContent;
  });
}

clearOp.addEventListener("click", () => {
  display.textContent = "";
});

deleteOp.addEventListener("click", () => {
  display.textContent = display.textContent.slice(0, -1);
});

evaluate.addEventListener("click", () => {
  const result = parser(display.textContent());
});

const opening = "([";
const closing = ")]";
const operations = "-+*/^";
/* TODO: Validate input*/

function parser(input) {
  // const expectedPattern = /\d+[{-+*/^()[]}+]d+/g;
  const exp = input.replaceAll(/−|+|×|÷/g, (op) => {
    switch (op) {
      case "−":
        return "-";
      case "+":
        return "+";
      case "×":
        return "*";
      case "÷":
        return "/";
    }
  });
  if (
    operations.indexOf(exp.chartAt(0)) >= 0 ||
    operations.indexOf(exp.charAt(exp.length - 1)) >= 0
  ) {
    return "Syntax Error";
  }

  const postfixExp = convertInfixToPostfix(exp);
  return evaluate(postfixExp);
}

function convertInfixToPostfix(infixExp) {
  let buffer = "";
  let operators = [];
  for (const char of infixExp) {
    if (/\d/.test(char)) {
      buffer += char;
      continue;
    }
    if (
      operations.indexOf(char) >= 0 ||
      opening.indexOf(char) >= 0 ||
      closing.indexOf(char) >= 0
    ) {
      let top = operators.at(-1);
      switch (char) {
        case "(":
        case "[":
          operators.push(char);
          break;
        case ")":
        case "]":
          while (opening.indexOf(top) != closing.indexOf(char)) {
            buffer += operators.pop();
            top = operators.at(-1);
          }
          operators.pop();
          break;
        case operations.indexOf(char) != -1:
          const currentPrec = getPrecedence(c);
          while (operators.length > 0 && opening.indexOf(top) === -1) {
            let topPrec = getPrecedence(top);
            if (currentPrec <= topPrec) {
              buffer += operators.pop();
            } else {
              break;
            }
          }
          operators.push(char);
      }
    }
  }
  while (operators.length > 0) {
    buffer += operators.pop();
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

evaluate(postfixExp){

}
