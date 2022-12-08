//----------------------------------------------Global Variables--------------------------------------------------------//
const allButtons = document.querySelectorAll(`button`);
const digits = document.querySelectorAll(`#digits > button`);
const operations = document.querySelectorAll(`#operations > button`);
const clearButton = document.querySelector(`#clear`);
const computeButton = document.querySelector(`#compute`);
const displayP = document.querySelector(`#display`);
const dotButton = document.querySelector(`#dot`);
const backspaceButton = document.querySelector(`#backspace`);

let input = [];
const operatorList = [`+`, `-`, `*`, `/`];
let isPreviousResult = false;

//-------------------------------------------------Event listeners------------------------------------------------------//
allButtons.forEach((button) => {
    button.addEventListener(`click`, isPreviousError);
});

digits.forEach((button) => {
    button.addEventListener(`click`, () => {
        digitFunctionality(button.textContent);
    });
});

operations.forEach((button) => {
    button.addEventListener(`click`, () => {
        operationFunctinoality(button.textContent);
    });
});

clearButton.addEventListener(`click`, clearFunctionality);

computeButton.addEventListener(`click`, compute);

dotButton.addEventListener(`click`, dotFunctionality);

backspaceButton.addEventListener(`click`, backspaceFunctionality);

// document.addEventListener(`keyup`, (event) => {
//     if (isFinite(event.key)) {

//     }
// })

//-------------------------------------------------Event Listener Functions----------------------------------------------//
function compute() {
    if (input.length >= 3) {
        isPreviousResult = true;
        try {
            let result = Math.round(operate(input[1], input[0], input[2]) * 100) / 100;
            input = [result];
            displayResult(result);
            
        }
        catch (e) {
            input=[];
            dotButton.addEventListener(`click`, dotFunctionality);
            displayP.textContent = e;
        }
    }
}

function clearFunctionality() {
    isPreviousResult = false;
    dotButton.addEventListener(`click`, dotFunctionality);
    displayP.textContent = ``;
    input = [];
}

function dotFunctionality() {
    if (isPreviousResult) {
        displayP.textContent = ``;
        input = [];
    } else {
        dotButton.removeEventListener(`click`, dotFunctionality);
    }

    isPreviousResult = false;

    if (input.length === 0) {
        input.push(`0.`);
        displayP.insertAdjacentText('beforeend', dotButton.textContent);
        return;
    }

    let previous = input[input.length - 1];
    if (operatorList.includes(previous)) {
        input.push(`0.`);
    } 
    else {
        input.pop();
        input.push(previous+ `.`);
    }
    displayP.insertAdjacentText('beforeend', dotButton.textContent);
}

function backspaceFunctionality() {
    if (input.length === 0){
        return;
    }

    let previous = input.pop();
    if (isPreviousResult){
        displayP.textContent = displayP.textContent.slice(0, -previous.length);
        dotButton.addEventListener(`click`, dotFunctionality);
    } else {
        if (previous.slice(-1, previous.length) === `.` || previous === `.`) {
            console.log(`hello`)
            dotButton.addEventListener(`click`, dotFunctionality);
        }
        displayP.textContent = displayP.textContent.slice(0, -1);
        if (previous.length > 1){
            input.push(previous.slice(0, -1));
        }
    } 
}

function isPreviousError() {
    if (displayP.textContent.slice(0,5) === `Error`) {
        displayP.textContent = ``;
    }
}

//-------------------------------------------------Helper functions-----------------------------------------------------//
function addInput(newInput) {
    if(input.length == 0 && !operatorList.includes(newInput)) {
        input.push(newInput);
        return;
    }

    if (input.length == 0 && operatorList.includes(newInput)) {
        throw `Error: First input cannot be an operator. Input has been cleared.`;
    }
    
    let previous = input[input.length - 1];
    
    if(!operatorList.includes(previous) && !operatorList.includes(newInput)) {
        input.pop();
        input.push(previous + newInput);
    }
    else if (operatorList.includes(previous) && operatorList.includes(newInput)){
        throw `Error: Two consecutive operators. Input has been cleared.`;
    }
    else {
        input.push(newInput);
    }
}

function earlyComputeCheck() {
    if (input.length > 2) {
        compute();
        isPreviousResult = false;
    }
}

function displayResult(result) {
    displayP.textContent = result;
}

function operate(operator, operandL, operandR) {
    switch (operator) {
        case `+`: return add(parseFloat(operandL), parseFloat(operandR));
        case `-`: return subtract(parseFloat(operandL), parseFloat(operandR));
        case `*`: return multiply(parseFloat(operandL), parseFloat(operandR));
        case `/` : return divide(parseFloat(operandL), parseFloat(operandR));
    }
}

function digitFunctionality(digit) {
    if (isPreviousResult) {
        displayP.textContent = ``;
        input = [];
    } 

    isPreviousResult = false;
    addInput(`${digit}`);
    displayP.insertAdjacentText('beforeend', `${digit}`);
}

function operationFunctinoality(operator) {
    dotButton.addEventListener(`click`, dotFunctionality);
    isPreviousResult = false;
    try {
        earlyComputeCheck();
        addInput(operator);
        displayP.insertAdjacentText('beforeend', operator);
    } catch (e) {
        input=[];
        displayP.textContent = e;
    }
}

//---------------------------------------------------Simple Mathematical functions--------------------------------------//
function add(operandL, operandR) {
    return operandL + operandR;
}

function subtract(operandL, operandR) {
    return operandL - operandR;
}

function multiply(operandL, operandR) {
    return operandL * operandR;
}

function divide(operandL, operandR) {
    if (operandR === 0){
        throw `Error: Can't divide by zero. Input has been cleared.`;
    }
    return operandL / operandR;
}
