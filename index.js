// Calculation functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

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

//console.log(multiply(0.2, 3));

function showOperate(result) {
  clearVariables();
  display.innerText = result;
  a = result.toString();
}

function showDisplay(innerText) {
  display.innerText = `${a} ${operator} ${b}`;
}

function clearVariables() {
  [a, b, operator] = ['0', '', ''];
}

function clearDisplay() {
  display.innerText = '0';
}

let [a, b, operator] = ['0', '', ''];

// Event Listener
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');
const operatorList = ['+', '-', '*', '/'];

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const innerText = e.target.innerText;
    const isOperator = operatorList.includes(innerText);
    const isDecimal = display.innerText.includes('.');

    // Store operator
    if (isOperator) {
      if (a && b && operator) { // When there's a, operator, b and user clicked next operator it'll calculate
        operate(a, operator, b);
        operator = innerText;
      } else {
        operator = innerText;
      }
    }

    // Store a & b
    if (!isOperator) {
      if (!operator) {
        if (a.charAt(0) === '0') {
          if (innerText !== '.' && !isDecimal) {
            a = '';
          }
        }
        a += innerText;
      } else {
        b += innerText;
        // TODO: Add 0 if user input . after operator e.g 0.2 + .2 ???
      }
    }

    // Clear display & variables
    if (innerText === 'AC') {
      clearDisplay();
      clearVariables();
    }
    
    // Calculate
    if (innerText === '=') {
      if (a && b && operator) {
        operate(a, operator, b);
      }
    }
    
    showDisplay();
  });
});