import { parser } from "./parser.js";

const input = document.querySelectorAll(".input");

const inputDisplay = document.getElementById("input");
const resultDisplay = document.getElementById("result");

const clearOp = document.getElementById("clear");
const deleteOp = document.getElementById("delete");
const evaluate = document.getElementById("evaluate");

/* TODO: add keyboard support, implement last answer and store functionality, add more operations. */
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

evaluate.addEventListener("click", () => {
  const result = parser(inputDisplay.textContent);
  resultDisplay.textContent = result;
});
