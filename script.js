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
    b = Number(b)
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

const screenInput = document.querySelector("#input");
const keyboard = document.querySelector(".keyboard");
const keys = Array.from(keyboard.children);

let displayValue = "";

keys.forEach(key => {
    key.addEventListener('click', key => {
        getKey(key)
        changeDisplay();
    })
})

function getKey(key) {
    displayValue += key.target.textContent;
}

function changeDisplay() {
    screenInput.textContent = displayValue;
}