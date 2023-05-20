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

const a = 3, 
      b = 3,
      operator = 'multiply';

function operate(a, op, b) {
  calculate = {
    'add': add(a, b),
    'subtract': subtract(a, b),
    'multiply': multiply(a, b),
    'divide': divide(a, b)
  };

  return calculate[op];
}

console.log(operate(a, operator, b));


// Event Listener
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    display.textContent += e.target.textContent;
  });
});