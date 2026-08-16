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
    // Arrondir pour éviter l'overflow d'affichage
    updateDisplay(Math.round(result * 1000) / 1000);
    firstNumber = String(Math.round(result * 1000) / 1000);
  } else {
    // cas division par 0 (message d'erreur)
    updateDisplay(result);
    firstNumber = "";
  }

  operator = "";
  secondNumber = "";
}

// Boutons chiffres
document.querySelectorAll(".digit").forEach((btn) => {
  btn.addEventListener("click", () => {
    const digit = btn.textContent;

    if (shouldResetDisplay) {
      firstNumber = "";
      updateDisplay("");
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

// Bouton décimal
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

// Boutons opérateurs
document.querySelectorAll(".operator").forEach((btn) => {
  btn.addEventListener("click", () => {
    const newOp = btn.dataset.op;

    if (firstNumber === "") return; // rien entré encore

    if (operator !== "" && secondNumber !== "") {
      // on a déjà un calcul en attente -> on l'évalue avant de continuer
      evaluate();
    }

    operator = newOp;
  });
});

// Bouton =
document.querySelector(".equals").addEventListener("click", () => {
  evaluate();
  shouldResetDisplay = true;
});

// Bouton clear
document.querySelector(".clear").addEventListener("click", () => {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  updateDisplay("0");
});

// Bouton backspace
document.querySelector(".backspace").addEventListener("click", () => {
  if (operator === "") {
    firstNumber = firstNumber.slice(0, -1);
    updateDisplay(firstNumber || "0");
  } else {
    secondNumber = secondNumber.slice(0, -1);
    updateDisplay(secondNumber || "0");
  }
});
console.log(operate("+", 3, 5)); // test — devrait afficher 8