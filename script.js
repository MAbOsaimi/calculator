const input = document.querySelectorAll(".input");

const display = document.getElementById("display");

const calculatorOp = document.querySelectorAll(".calculator-operation");

const clearOp = document.getElementById("clear");
const deleteOp = document.getElementById("delete");
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
