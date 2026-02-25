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
    } else if (button.value === "decimal") {
      if (current && operation && operation !== "equal") {
        if (!next) {
          next = "0.";
        } else if (!next.includes(".")) {
          next += ".";
        }
        display.textContent = current + getOperator(operation) + next;
      } else {
        if (operation === "equal") {
          current = "0.";
          operation = null;
        } else {
          if (current === null) {
            current = "0.";
          } else if (!current.includes(".")) {
            current += ".";
          }
        }
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

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (
    !isNaN(parseInt(key)) ||
    ["+", "-", "*", "/", "Enter", "=", "Escape", "Backspace", "."].includes(key)
  ) {
    event.preventDefault();
  }

  let button = null;

  if (!isNaN(parseInt(key))) {
    button = Array.from(buttons).find((btn) => btn.value === key);
  } else if (key === "+") {
    button = Array.from(buttons).find((btn) => btn.value === "add");
  } else if (key === "-") {
    button = Array.from(buttons).find((btn) => btn.value === "subtract");
  } else if (key === "*") {
    button = Array.from(buttons).find((btn) => btn.value === "multiply");
  } else if (key === "/") {
    button = Array.from(buttons).find((btn) => btn.value === "divide");
  } else if (key === "Enter" || key === "=") {
    button = Array.from(buttons).find((btn) => btn.value === "equal");
  } else if (key === "Escape") {
    button = Array.from(buttons).find((btn) => btn.value === "clear");
  } else if (key === "Backspace") {
    if (next !== null && operation && operation !== "equal") {
      if (next.length > 1) {
        next = next.slice(0, -1);
      } else {
        next = null;
      }
      display.textContent = next
        ? current + getOperator(operation) + next
        : current + getOperator(operation);
    } else if (current !== null && operation !== "equal") {
      if (current.length > 1) {
        current = current.slice(0, -1);
      } else {
        current = null;
      }
      display.textContent = current || "0";
    }
  } else if (key === ".") {
    button = Array.from(buttons).find((btn) => btn.value === "decimal");
  }

  if (button) {
    button.click();
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 100);
  }
});
