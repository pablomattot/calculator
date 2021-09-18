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


numbers.forEach(number => {
    number.addEventListener('click', number => getInput(number));
});

operators.forEach(operator => {
    operator.addEventListener('click', operator => getInput(operator));
});

function getInput(key) {
    displayValue.textContent += `${key.target.textContent}`;
}


// const display = document.querySelector("#display");
// const numbers = document.querySelectorAll(".number");
// const operators = document.querySelectorAll(".operator");
// const equals = document.querySelector("#equals");
// const output = document.querySelector("#output");

// let displayValue = "";
// let storedValue = "";
// let storedFirstValue = "";
// let action = "";
// let result;

// function numberListener() {
//     numbers.forEach(number => {
//         number.addEventListener('click', number => {
//             displayValue += number.target.textContent;
//             changeDisplay();
//         })
//     })
// }

// function operatorListener() {
//     operators.forEach(operator => {
//         operator.addEventListener('click', operator => {
//             action = operator.target.textContent;
//             storeNumber();
//             changeDisplay();
//         })
//     })
// }

// function storeNumber() {
//     if(storedFirstValue === "") {
//         storedFirstValue = displayValue;
//         displayValue = "";
//     } else {
//         storedValue = displayValue;
//     }

// }

// function changeDisplay() {
//     display.textContent = displayValue;
//     display.textContent += action;
//     output.textContent = result;
// }

// numberListener();
// operatorListener();

// equals.addEventListener('click', () => {
//     storeNumber();
//     console.log(`${storedFirstValue} and ${storedValue}`);
//     result = operate(action, storedFirstValue, storedValue);
//     storedValue = "";
//     storedFirstValue = "";
//     displayValue = "";
//     action = "";
//     changeDisplay();
// });