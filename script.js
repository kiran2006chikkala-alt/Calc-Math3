let display = document.getElementById("display");
let currentInput = "";
let isDegrees = true;

function updateDisplay() {
  display.innerText = currentInput || "0";
}

function appendNumber(num) {
  currentInput += num;
  updateDisplay();
}

function appendChar(char) {
  currentInput += char;
  updateDisplay();
}

function appendOperator(op) {
  currentInput += op;
  updateDisplay();
}

function appendConstant(constant) {
  currentInput += eval(constant).toString();
  updateDisplay();
}

function getLastNumber() {
  const match = currentInput.match(/([0-9.]+)$/);
  return match ? match[0] : "";
}

function appendFunction(func) {
  const lastNumber = getLastNumber();
  let value = parseFloat(lastNumber);

  if (isNaN(value)) return;

  if (isDegrees && ["sin", "cos", "tan"].includes(func)) {
    value = (value * Math.PI) / 180;
  }

  let result;

  switch (func) {
    case "sin": result = Math.sin(value); break;
    case "cos": result = Math.cos(value); break;
    case "tan": result = Math.tan(value); break;
    case "sec": result = 1 / Math.cos(value); break;
    case "cosec": result = 1 / Math.sin(value); break;
    case "cot": result = 1 / Math.tan(value); break;

    case "asin": result = Math.asin(value); break;
    case "acos": result = Math.acos(value); break;
    case "atan": result = Math.atan(value); break;

    case "asec": result = Math.acos(1 / value); break;
    case "acosec": result = Math.asin(1 / value); break;

    case "log": result = Math.log10(value); break;
    case "ln": result = Math.log(value); break;

    default: return;
  }

  if (isDegrees && ["asin", "acos", "atan", "asec", "acosec"].includes(func)) {
    result = result * (180 / Math.PI);
  }

  currentInput = currentInput.replace(lastNumber, result);
  updateDisplay();
}

function clearDisplay() {
  currentInput = "";
  updateDisplay();
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    const result = eval(currentInput);
    currentInput = result.toString();
    updateDisplay();
  } catch (e) {
    display.innerText = "Error";
    currentInput = "";
  }
}

function toggleDegRad() {
  isDegrees = !isDegrees;
  document.getElementById("mode").innerText = isDegrees ? "DEG" : "RAD";
}
