function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Erreur : division par zéro impossible 🙃";
  }
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    default:
      return null;
  }
}

let firstNumber = "";
let operator = "";
let secondNumber = "";
let shouldResetDisplay = false;

const display = document.getElementById("display");

function updateDisplay(value) {
  display.textContent = value;
}

function evaluate() {
  if (firstNumber === "" || operator === "" || secondNumber === "") return;

  const result = operate(operator, Number(firstNumber), Number(secondNumber));

  if (typeof result === "number") {
    updateDisplay(Math.round(result * 1000) / 1000);
    firstNumber = String(Math.round(result * 1000) / 1000);
  } else {
    updateDisplay(result);
    firstNumber = "";
  }

  operator = "";
  secondNumber = "";
}

document.querySelectorAll(".digit").forEach((btn) => {
  btn.addEventListener("click", () => {
    const digit = btn.textContent;

    if (shouldResetDisplay) {
      updateDisplay("");
      if (operator === "") {
        firstNumber = "";
      }
      shouldResetDisplay = false;
    }

    if (operator === "") {
      firstNumber += digit;
      updateDisplay(firstNumber);
    } else {
      secondNumber += digit;
      updateDisplay(secondNumber);
    }
  });
});

document.querySelector(".decimal").addEventListener("click", () => {
  if (operator === "") {
    if (!firstNumber.includes(".")) {
      firstNumber += firstNumber === "" ? "0." : ".";
      updateDisplay(firstNumber);
    }
  } else {
    if (!secondNumber.includes(".")) {
      secondNumber += secondNumber === "" ? "0." : ".";
      updateDisplay(secondNumber);
    }
  }
});

document.querySelectorAll(".operator").forEach((btn) => {
  btn.addEventListener("click", () => {
    const newOp = btn.dataset.op;

    if (firstNumber === "") return;

    if (operator !== "" && secondNumber !== "") {
      evaluate();
    }

    operator = newOp;
    shouldResetDisplay = false;
  });
});

document.querySelector(".equals").addEventListener("click", () => {
  evaluate();
  shouldResetDisplay = true;
});

document.querySelector(".clear").addEventListener("click", () => {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  updateDisplay("0");
});

document.querySelector(".backspace").addEventListener("click", () => {
  if (operator === "") {
    firstNumber = firstNumber.slice(0, -1);
    updateDisplay(firstNumber || "0");
  } else {
    secondNumber = secondNumber.slice(0, -1);
    updateDisplay(secondNumber || "0");
  }
});