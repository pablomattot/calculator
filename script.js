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

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#equals");
const output = document.querySelector("#output");
const opDisplay = document.querySelector("#op-display");

let displayValue = "";
let storedValue = "";
let action = "";
let result;

function numberListener() {
    numbers.forEach(number => {
        number.addEventListener('click', number => {
            displayValue += number.target.textContent;
            // getKey(number);
            changeDisplay();
        })
    })
}

function operatorListener() {
    operators.forEach(operator => {
        operator.addEventListener('click', operator => {
            action = operator.target.textContent;
            storeNumber();
            changeDisplay();
        })
    })
}

function storeNumber() {
    storedValue = displayValue;
    displayValue = "";
}

// function getKey(input) {
    
//     changeDisplay();
// }

function changeDisplay() {
    display.textContent = displayValue;
    opDisplay.textContent = action;
    output.textContent = result;
}

numberListener();
operatorListener();

equals.addEventListener('click', () => {
    result = operate(action, storedValue, displayValue);
    storedValue = "";
    displayValue = "";
    action = "";
    changeDisplay();
});