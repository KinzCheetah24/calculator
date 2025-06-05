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
const backSpaceBtn = document.querySelector(".backSpaceBtn")
const equalBtn = document.querySelector(".equalBtn");
let displayNumber = "", firstNumber, secondNumber, operation = "", operationTriggered = false;

numberBtns.forEach((number) => {
    addEventListener("keypress", (e) => {
        if (e.key === number.textContent) {
            number.click();
        }
    });
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
    addEventListener("keydown", (e) => {
        if (e.key === operator.textContent) {
            operator.click();
        }
    });

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
                firstNumber = "", secondNumber = "";
                operationTriggered = true;
            }
        }
    });
});

clearBtn.addEventListener("click", () => {
    addEventListener("keydown", (e) => {
        if (e.key === "sdfasfsdf") {
            clearBtn.click();
        }
    });

    displayContent.textContent = "";
    displayNumber = "", firstNumber = "", secondNumber = "", operation = "";
});

backSpaceBtn.addEventListener("click", () => {
    if (!operationTriggered) {
        if(!(displayContent.textContent.slice(displayContent.textContent.length - 1) === "") && displayContent.textContent.slice(displayContent.textContent.length - 1) === operation) {
            operation = "";
        }
        displayContent.textContent = displayContent.textContent.substring(0, displayContent.textContent.length - 1);
        displayNumber = displayContent.textContent;
        if(!(displayContent.textContent.slice(displayContent.textContent.length - 1) === "") && displayContent.textContent.slice(displayContent.textContent.length - 1) === operation) {
            secondNumber = "";
            displayNumber = "";
        }
    }
});

equalBtn.addEventListener("click", () => {
    secondNumber = displayNumber;
    displayNumber = Math.round(operate(parseFloat(firstNumber), parseFloat(secondNumber), operation) * 1000000) / 1000000;
    displayContent.textContent = displayNumber;
    firstNumber = "", secondNumber = "", operation = "";
    operationTriggered = true;
});

addEventListener("keydown", (e) => {
    if (e.key === "Delete") {
        clearBtn.click();
    } else if (e.key === "Enter") {
        equalBtn.click();
    } else if(e.key === "Backspace") {
        backSpaceBtn.click();
    }
});