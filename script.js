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
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const displayValue = document.querySelector("#display");
const process = document.querySelector("#equals");
const outputDisplay = document.querySelector("#output");
const reset = document.querySelector("#reset")

let action = "";
let temporaryStorage = "0";
let numberArray = [];
let result;

// Add event listener to all the numbers and decimal sign
// onclick verify whether the number already is a decimal. If true, you can't add another dot
// Store the number in the temporary storage variable send it to getInput
numbers.forEach(number => {
    number.addEventListener('click', number => {
        if (number.target.textContent === ".") {
            if (temporaryStorage.includes(".")) {
                console.log("already decimal");
            } else {
                getInput(number);
                temporaryStorage += number.target.textContent;
            }
        } else {
            getInput(number);
            temporaryStorage += number.target.textContent;
        }
    });
});

// Add an eventlistener to each operator
// if an action (operator) has already been assigned, run the calculate function
// Send the given opertor to getInput and store it in the action variable
// Run storeNumber()
operators.forEach(operator => {
    operator.addEventListener('click', operator => {
        if (action) {
            calculate();
        }

        getInput(operator);
        action = operator.target.textContent;
        storeNumber();
    });
});

// Add the input to the display
function getInput(key) {
    displayValue.textContent += `${key.target.textContent}`;
}

// Store the temporarily stored number in an array to allow another number to be stored
function storeNumber() {
    numberArray.push(temporaryStorage);
    temporaryStorage = "";
}

// If the requirements (numbers inputted and operator chosen) are met, run the calculate function
process.addEventListener('click', () => {
    if (numberArray[0] && action && temporaryStorage) {
        calculate();
    } else { console.log("insert numbers and operator first") }
});

// Set the result variable to the result of the operate function
// Update the display
// Store the result in temporarystorage so it can be used again if necessary
// Empty the action variable to allow another to be picked
// Empty the numberArray to allow new numbers to be stored
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

// Change the output display to the result and clear the input display
function updateDisplay() {
    outputDisplay.textContent = `${result}`;
    displayValue.textContent = "";
}

// Hard clear everything to reset the calculator
reset.addEventListener('click', clearAll);

function clearAll() {
    temporaryStorage = "0";
    numberArray.splice(0, numberArray.length);
    action = "";
    result = null;
    displayValue.textContent = "";
    outputDisplay.textContent = "";
}