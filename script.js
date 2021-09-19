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

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const displayValue = document.querySelector("#display");
const process = document.querySelector("#equals");
const outputDisplay = document.querySelector("#output");
const reset = document.querySelector("#reset")

let action = "";
let temporaryStorage = "";
let numberArray = [];
let result;


numbers.forEach(number => {
    number.addEventListener('click', number => {
        getInput(number);
        temporaryStorage += number.target.textContent;
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', operator => {
        if(action) {
            calculate();
        }

        getInput(operator);
        action = operator.target.textContent;
        storeNumber();
    });
});

function getInput(key) {
    displayValue.textContent += `${key.target.textContent}`;
}

function storeNumber() {
    numberArray.push(temporaryStorage);
    temporaryStorage = "";
}

process.addEventListener('click', () => {
    calculate();
});

function calculate() {
    storeNumber();

    let a = numberArray[0];
    let b = numberArray[1];

    result = operate(action, a, b);
    updateDisplay();

    temporaryStorage = result;
    action = "";
    numberArray.splice(0, numberArray.length);
}

function updateDisplay() {
    outputDisplay.textContent = `${result}`;
    displayValue.textContent = "";
}

reset.addEventListener('click', clearAll);

function clearAll() {
    temporaryStorage = "";
    numberArray.splice(0, numberArray.length);
    action = "";
    result = null;
    displayValue.textContent = "";
    outputDisplay.textContent = "";
}