let current = undefined;
let next = undefined;
let operation = undefined;

const display = document.querySelector(".display");
const equalsButton = document.querySelector("#equals");
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) =>
  button.addEventListener("click", () => {
    if (button.value === "clear") {
      current = undefined;
      next = undefined;
      operation = undefined;
      display.textContent = "0";
    } else if (button.value === "equal") {
      if (current) {
        if (next && operation) {
          current = operate(operation, parseFloat(current), parseFloat(next));
          next = undefined;
          operation = "equal";
          display.textContent = current;
        }
      }
    } else if (current && next && isOperation(button.value)) {
      current = operate(operation, parseFloat(current), parseFloat(next));
      next = undefined;
      operation = button.value;
      display.textContent = current + getOperator(operation);
    } else if (current && isOperation(button.value)) {
      operation = button.value;
      display.textContent = current + getOperator(operation);
    } else if (current && operation && operation !== "equal") {
      if (!next) {
        next = `${button.value}`;
      } else {
        next += `${button.value}`;
      }
      display.textContent = current + getOperator(operation) + next;
    } else if (!isNaN(parseInt(button.value))) {
      if (operation === "equal") {
        current = `${button.value}`;
        operation = undefined;
      } else {
        if (!current) {
          current = `${button.value}`;
        } else {
          current += `${button.value}`;
        }
      }
      display.textContent = current;
    }
  })
);

const operate = (operation, firstNumber, secondNumber) => {
  switch (operation) {
    case "add":
      return firstNumber + secondNumber;
    case "subtract":
      return firstNumber - secondNumber;
    case "multiply":
      return firstNumber * secondNumber;
    case "divide":
      return parseFloat((firstNumber / secondNumber).toFixed(2));
    default:
      return undefined;
  }
};

const isOperation = (value) => {
  return ["add", "subtract", "multiply", "divide", "equal"].includes(value);
};

const getOperator = (operation) => {
  switch (operation) {
    case "add":
      return "+";
    case "subtract":
      return "-";
    case "multiply":
      return "×";
    case "divide":
      return "÷";
    default:
      return "undefined";
  }
};
