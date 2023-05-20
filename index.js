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

let a = '', 
    b = '',
    operator = '';

function operate(a, op, b) {
  calculate = {
    '+': add(a, b),
    '-': subtract(a, b),
    '*': multiply(a, b),
    '/': divide(a, b)
  };

  return calculate[op];
}
//console.log(operate(a, operator, b));


// Event Listener
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');
const operatorList = ['+', '-', '*', '/'];
const utilityList = ['=', 'AC'];

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // Show the clicked button
    display.innerText += e.target.innerText;

    // Store the variable if operator button is clicked
    if (operatorList.includes(e.target.innerText)) {
      operator = e.target.innerText;
      console.log(operator);
    }

    // Store the variable if num button is clicked
    if (operatorList.includes(e.target.innerText) === false && utilityList.includes(e.target.innerText) === false) {
      if (!operator) {
        a += e.target.innerText;
        console.log(a)
      } else {
        b += e.target.innerText;
        console.log(b)
      }
    }

    
    if (utilityList.includes(e.target.innerText)) {
      if (e.target.innerText === '=') {
        const calc = operate(parseFloat(a), operator, parseFloat(b));
        display.innerText = calc;
      } else {
        display.innerText = '';
        a = '';
        b = '';
        operator = '';
      }
    }

    // TODO
    // Disable = input?
  });
});