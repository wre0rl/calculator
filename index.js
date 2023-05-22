// Calculation functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (a, operator, b) => {
  [a, b] = [parseFloat(a), parseFloat(b)];

  const result = Math.round(operators[operator](a, b) * 1000000) / 1000000;
  clearVariables();
  showDisplay(result.toString());
}

const showDisplay = (result) => {
  let text = '';

  if (result) {
    text = result;
    [a, result] = [result, ''];
  } else {
    text = `${a} ${operator} ${b}`;
  }

  display.innerText = text;
};

const clearDisplay = () => {
  display.innerText = '';
};

const clearVariables = () => {
  [a, b, operator] = ['', '', ''];
};

const operators = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide
};

let [a, b, operator] = ['', '', ''];

// Event Listener
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    let currentText = e.target.innerText;
    const isOperator = [...Object.keys(operators)].includes(currentText);
    const isNegative = (currentText === '-');
    const isDecimal = (currentText === '.');
    const isPercentage = (currentText === '%');
    const isDelete = (currentText === 'DEL');
    const isAC = (currentText === 'AC');
    const isEqual = (currentText === '=');

    // Store operator
    if (isOperator) {
      if (a && b && operator) {
        operate(a, operator, b);
      }
      
      if (!a && isNegative) {
        a += currentText;
      }

      if (a && a !== '-') {
        operator = currentText;
      }
    }

    // Store a & b
    if (!isOperator && !isEqual) {
      let currentOperand = (operator) ? b : a;

      if (isDecimal && currentOperand.charAt(0) === '') {
        currentOperand += '0';
      }

      if (isDecimal) {
        if (currentOperand.includes('.')) {
          currentText = '';
        }
      }
      
      if (!isDelete)  { // Don't store DEL in string
        currentOperand += currentText;
        // If user delete a decimal e.g 0.5 to 0 then input 1 or another number it'll reset the 0 so it doesn't become 01
        if (currentOperand.charAt(0) === '0' && currentOperand.charAt(1) !== '.') {
          currentOperand = currentText;
        }
      }

      // Convert to percentage
      if (isPercentage) {
        currentOperand = currentOperand.slice(0, -1);
        currentOperand = divide(parseFloat(currentOperand), 100).toString();
        if (isNaN(currentOperand)) { // Fix 2 + % = NaN
          currentOperand = 0;
        }
      }

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

    // Delete a char at display & variables
    if (isDelete) {
      if (a && !operator) {
        a = a.slice(0, -1);
      }

      if (operator && !b) {
        operator = operator.slice(0, -1);
      }

      if (b) {
        b = b.slice(0, -1);
      }
    }
    
    showDisplay();
  });
});