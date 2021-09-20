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
let keyDown = false;

// Link functions to correct keys
keysArray.forEach(key => {
    key.addEventListener('click', (key) => {
        keyDown = false;
        if (key.target.classList.contains("number")) {
            selectNumber(key);
        } else if (key.target.classList.contains("operator")) {
            selectOperator(key);
        } else if (key.target.id === "equals") {
            selectEquals(key);
        } else if (key.target.id === "reset") {
            clearAll();
        }
    });
})

// Get input
function getInput(key) {
    return keyDown ? key.key : key.target.textContent;
    // return key.target.textContent;
}

// Store first number
function storeNumber() {
    numberArray.push(temporaryStorage);
    temporaryStorage = "";
}

// Display input/output
function updateDisplay(key) {
    if (key.target.id === "equals" || key.target.id === "reset" || key.key === "Enter" || key.key === "=") {
        console.log("test");
    } else {
        inputDisplay.textContent += getInput(key);
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
    if (key.target.textContent === "." || key.key === ".") {
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

// Keyboard support
window.addEventListener('keydown', e => {
    keyDown = true;
    if (e.key >= 0 && e.key <= 9 || e.key === ".") {
        selectNumber(e);
    } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        selectOperator(e);
    } else if (e.key === "Enter" || e.key === "=") {
        selectEquals(e);
    }
})

function selectNumber(e) {
    // If a result is already present, clear everything.
    // User can start new expression without clicking RESET
    if (result) { clearAll(); }
    // If the number already is a decimal, stop user from adding more '.'
    if (!checkDecimal(e)) {
        temporaryStorage += getInput(e);
        updateDisplay(e);
    }
}

function selectOperator(e) {
    // Only allow operators if a number is already present
    if (numberArray[0] || temporaryStorage || temporaryStorage === 0) {
        operator = getInput(e);
        storeNumber();
        result = null;
        updateDisplay(e);
    } else { console.log("Enter a number first") }
}

function selectEquals(e) {
    if (numberArray[0]) {
        calculateExpression();
        updateDisplay(e);
    }
}