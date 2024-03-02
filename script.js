import { parser } from "./parser.js";

const input = document.querySelectorAll(".input");

const inputDisplay = document.getElementById("input");
const resultDisplay = document.getElementById("result");

const clearOp = document.getElementById("clear");
const deleteOp = document.getElementById("delete");
const evaluateOp = document.getElementById("evaluate");
const lastAnswerOp = document.getElementById("last-answer");
let lastAnswer = "0";

/* TODO: add keyboard support, implement store functionality, add more operations. */
for (const inputAble of input) {
  inputAble.addEventListener("click", () => {
    inputDisplay.textContent += inputAble.textContent.trim();
  });
}

deleteOp.addEventListener("click", () => {
  inputDisplay.textContent = inputDisplay.textContent.slice(0, -1);
});

clearOp.addEventListener("click", () => {
  inputDisplay.textContent = "";
});

evaluateOp.addEventListener("click", () => {
  const input = inputDisplay.textContent.replaceAll("Ans", lastAnswer);
  const result = parser(input);
  resultDisplay.textContent = result;
  lastAnswer = result;
});

lastAnswerOp.addEventListener("click", () => {
  inputDisplay.textContent += "Ans";
});
