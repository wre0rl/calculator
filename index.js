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
  return a / b;
}

function operate(a, op, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  const operators = {
    '+': add(a, b),
    '-': subtract(a, b),
    '*': multiply(a, b),
    '/': divide(a, b)
  };

  showOperate(operators[op]);
}

function showOperate(res) {
  clearVariable();
  display.innerText = res;
  a = res;
}

function showDisplay(innerText) {
  display.innerText = `${a} ${operator} ${b}`;
}

function clearVariable() {
  a = '';
  b = '';
  operator = '';
}

function clearDisplay() {
  display.innerText = '';
}

let a = '';
let b = '';
let operator = '';

// Event Listener
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');
const operatorList = ['+', '-', '*', '/'];

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    let innerText = e.target.innerText;

    // Store operator
    if (operatorList.includes(innerText)) {
      if (a && b && operator) { // When there's a, operator, b and user clicked next operator it'll calculate
        operate(a, operator, b);
        let previousOperator = innerText;
        operator = previousOperator;
      } else {
        operator = innerText;
      }
    }

    // Store a & b
    if (!operatorList.includes(innerText)) {
      if (operator) {
        b += innerText;
      } else {
        a += innerText;
      }
    }

    if (innerText === 'AC') {
      clearDisplay();
      clearVariable();
    } else if (innerText === '=') {
      if (a && b && operator) {
        operate(a, operator, b);
      }
    } else {
      showDisplay();
    }
  });
});