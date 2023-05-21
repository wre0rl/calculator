// Calculation functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(a, op, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  const operators = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide
  };

  const result = Math.round(operators[op](a, b) * 1000000) / 1000000;
  clearVariables();
  showDisplay(result);
}

function showDisplay(result) {
  if (result) {
    result = result.toString();
    display.innerText = result;
    a = result;
    result = '';
  } else {
    display.innerText = `${a} ${operator} ${b}`;
  }
}

function clearDisplay() {
  display.innerText = '';
}

function clearVariables() {
  [a, b, operator] = ['', '', ''];
}

let [a, b, operator] = ['', '', ''];

// Event Listener
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');
const operatorList = ['+', '-', '*', '/'];

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    let currentText = e.target.innerText;
    const isOperator = operatorList.includes(currentText);
    const isDecimal = (currentText === '.');
    const isAC = (currentText === 'AC');
    const isEqual = (currentText === '=');

    // Store operator
    if (isOperator) {
      if (a && b && operator) {
        operate(a, operator, b);
      }
      operator = currentText;
    }

    // Store a & b
    if (!isOperator) {
      let currentOperand = (operator) ? b : a;

      if (isDecimal && currentOperand.charAt(0) === '') {
        currentOperand += '0';
      }

      if (isDecimal) {
        if (currentOperand.includes('.')) {
          currentText = '';
        }
      }

      currentOperand += currentText;
      if (operator) {
        b = currentOperand;
      } else {
        a = currentOperand;
      }
    }

    // Calculate
    if (isEqual) {
      if (a && b && operator) {
        operate(a, operator, b);
      }
    }

    // Clear display & variables
    if (isAC) {
      clearDisplay();
      clearVariables();
    }
    
    showDisplay();
  });
});