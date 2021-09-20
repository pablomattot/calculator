// Math functions
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

// Query Selectors
const keysArray = Array.from(document.querySelector(".keyboard").children);
const inputDisplay = document.querySelector("#display");
const outputDisplay = document.querySelector("#output");

let temporaryStorage = "";
let numberArray = [];
let operator = "";
let result;

// Link functions to correct keys
keysArray.forEach(key => {
    key.addEventListener('click', (key) => {
        if (key.target.classList.contains("number")) {
            // If a result is already present, clear everything.
            // User can start new expression without clicking RESET
            if (result) { clearAll(); }
            // If the number already is a decimal, stop user from adding more '.'
            if (!checkDecimal(key)) {
                temporaryStorage += getInput(key);
                updateDisplay(key);
            }
        } else if (key.target.classList.contains("operator")) {
            // Only allow operators if a number is already present
            if (numberArray[0] || temporaryStorage || temporaryStorage === 0) {
                operator = getInput(key);
                storeNumber();
                result = null;
                updateDisplay(key);
            } else {console.log("Enter a number first")}
        } else if (key.target.id === "equals") {
            calculateExpression();
            updateDisplay(key);
        } else if (key.target.id === "reset") {
            clearAll();
        }
    });
})

// Get input
function getInput(key) {
    return key.target.textContent;
}

// Store first number
function storeNumber() {
    numberArray.push(temporaryStorage);
    temporaryStorage = "";
}

// Display input/output
function updateDisplay(key) {
    if (key.target.classList.contains("number") || key.target.classList.contains("operator")) {
        inputDisplay.textContent += getInput(key);

    } else {
        console.log("not a number or operator");
    }
    if (result || result === 0) {
        outputDisplay.textContent = result;
    }
}

// Evaluate expression
function calculateExpression() {
    let a = numberArray[0];
    let b = temporaryStorage;
    result = roundNumber(operate(operator, a, b));

    temporaryStorage = result;
    numberArray.splice(0, numberArray.length);

    return roundNumber(operate(operator, a, b));
}

// Round Result
function roundNumber(number) {
    return +number.toFixed(6);
}

// Check whether number is decimal
function checkDecimal(key) {
    if (key.target.textContent === ".") {
        if (temporaryStorage.includes(".")) {
            console.log("already decimal");
            return true;
        }
    }
}

// Reset calculator
function clearAll() {
    result = null;
    temporaryStorage = "";
    numberArray.splice(0, numberArray.length);
    inputDisplay.textContent = "";
    outputDisplay.textContent = "";
}