// Select the calculator screen and keys
const calculatorScreen = document.querySelector('.calculator-screen');
const calculatorKeys = document.querySelector('.calculator-keys');

// Initialize variables
let currentInput = '';
let operator = '';
let firstOperand = null;

// Function to update the calculator screen
function updateScreen(value) {
    calculatorScreen.value = value;
}

// Function to handle number input
function handleNumber(number) {
    currentInput += number;
    updateScreen(currentInput);
}

// Function to handle operator input
function handleOperator(op) {
    if (currentInput === '') return; // Do nothing if no input
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else {
        firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
    }
    operator = op;
    currentInput = '';
    updateScreen(firstOperand);
}

// Function to perform calculations
function calculate(first, second, operator) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return first / second;
        default:
            return second;
    }
}

// Function to handle equal sign
function handleEqual() {
    if (firstOperand === null || currentInput === '') return; // Do nothing if no input
    const result = calculate(firstOperand, parseFloat(currentInput), operator);
    updateScreen(result);
    // Reset for next calculation
    currentInput = '';
    operator = '';
    firstOperand = null;
}

// Function to handle clear
function handleClear() {
    currentInput = '';
    operator = '';
    firstOperand = null;
    updateScreen('');
}

// Event listener for calculator keys
calculatorKeys.addEventListener('click', (event) => {
    const target = event.target;

    if (target.matches('button')) {
        const value = target.value;

        if (value === 'all-clear') {
            handleClear();
        } else if (value === '=') {
            handleEqual();
        } else if (['+', '-', '*', '/'].includes(value)) {
            handleOperator(value);
        } else {
            handleNumber(value);
        }
    }
});


