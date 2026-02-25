let current = null;
let next = null;
let operation = null;

const display = document.querySelector(".display");
const equalsButton = document.querySelector("#equals");
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) =>
  button.addEventListener("click", () => {
    if (button.value === "clear") {
      current = null;
      next = null;
      operation = null;
      display.textContent = "0";
    } else if (button.value === "plus-minus") {
      if (next !== null && operation && operation !== "equal") {
        next = (parseFloat(next) * -1).toString();
        display.textContent = current + getOperator(operation) + next;
      } else if (current !== null) {
        current = (parseFloat(current) * -1).toString();
        display.textContent = current;
      }
    } else if (button.value === "equal") {
      if (current) {
        if (next && operation) {
          if (operation === "divide" && next === "0") {
            current = null;
            next = null;
            operation = null;
            display.textContent = "Cannot divide by 0";
          } else {
            current = operate(operation, parseFloat(current), parseFloat(next));
            next = null;
            operation = "equal";
            display.textContent = current;
          }
        }
      }
    } else if (current && next && isOperation(button.value)) {
      if (operation === "divide" && next === "0") {
        current = null;
        next = null;
        operation = null;
        display.textContent = "Cannot divide by 0";
      } else {
        current = operate(operation, parseFloat(current), parseFloat(next));
        next = null;
        operation = button.value;
        display.textContent = current + getOperator(operation);
      }
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
        operation = null;
      } else {
        if (!current) {
          current = `${button.value}`;
        } else {
          current += `${button.value}`;
        }
      }
      display.textContent = current;
    }
  }),
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
      return null;
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
      return null;
  }
};
