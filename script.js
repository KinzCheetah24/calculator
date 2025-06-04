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

function operate(a, b, operator) {
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

const displayContent = document.querySelector(".display .operation");
const numberBtns = document.querySelectorAll(".numberBtn");
const operatorBtns = document.querySelectorAll(".operatorBtn");
const clearBtn = document.querySelector(".clearBtn");
const equalBtn = document.querySelector(".equalBtn");
let displayNumber = "", firstNumber, secondNumber, operation = "", operationTriggered = false;

numberBtns.forEach((number) => {
    number.addEventListener("click", () => {
        if(!operationTriggered) {
            displayContent.textContent += number.textContent;
            displayNumber += number.textContent;
        } else {
            firstNumber = displayNumber;
            displayContent.textContent = number.textContent;
            displayNumber = number.textContent;
            operationTriggered = false;
        }
    })
});

operatorBtns.forEach((operator) => {
    operator.addEventListener("click", () => {
        if (!(displayNumber === "" && displayNumber === "")) {
            if (operationTriggered) {
                operation = operator.textContent;
            }else if(operation === "") {
                firstNumber = displayNumber;
                displayContent.textContent += operator.textContent;
                displayNumber = "";
                operation = operator.textContent;
            } else {
                secondNumber = displayNumber;
                displayNumber = Math.round(operate(parseFloat(firstNumber), parseFloat(secondNumber), operation) * 1000000) / 1000000;
                displayContent.textContent = displayNumber;
                operation = operator.textContent;
                operationTriggered = true;
            }
        }
    })
});

clearBtn.addEventListener("click", () => {
    displayContent.textContent = "";
    displayNumber = "", firstNumber = "", secondNumber = "", operation = "";
});

equalBtn.addEventListener("click", () => {
    secondNumber = displayNumber;
    displayNumber = Math.round(operate(parseFloat(firstNumber), parseFloat(secondNumber), operation) * 1000000) / 1000000;
    displayContent.textContent = displayNumber;
    firstNumber = "", secondNumber = "", operation = "";
    operationTriggered = true;
});
