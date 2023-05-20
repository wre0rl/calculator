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
    // Store the variable if operator button is clicked
    if (a) {
      if (operatorList.includes(e.target.innerText)) {
        operator = e.target.innerText;
        console.log(operator);
        display.innerText += operator;
      }
    }

    // Store the variable if num button is clicked
    if (operatorList.includes(e.target.innerText) === false && utilityList.includes(e.target.innerText) === false) {
      display.innerText += e.target.innerText;
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
        if (a && b && operator) {
          display.innerText += e.target.innerText;
          const calc = operate(parseFloat(a), operator, parseFloat(b));
          display.innerText = calc;
          a = calc; // Store the operate result for next calculation
          // Reset the variable
          b = '';
          operator = '';
        }
      } else {
        display.innerText = '';
        a = '';
        b = '';
        operator = '';
      }
      
    }
    
    // TODO
    // Do this 12 + 7 - 5 * 3 = 42
    // fix display (change into array for better styling support?)
    // REfactor?
  });
});