class Calculator {
    constructor(previousOperandTextElem, currentOperandTextElem) {
        this.previousOperandTextElem = previousOperandTextElem;
        this.currentOperandTextElem = currentOperandTextElem;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand += number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return;
        }
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let result;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(previous) || isNaN(current)) {
            return;
        }
        switch (this.operation) {
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            case '*':
                result = previous * current;
                break;
            case '÷':
                result = previous / current;
                break;
            default:
                return;
        }
        this.readyToReset = true;
        this.currentOperand = result;
        this.previousOperand = '';
        this.operation = undefined;
    }

    updateDisplay() {
        this.currentOperandTextElem.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation) {
            this.previousOperandTextElem.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElem.innerText = '';
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('ru', {maximumFractionDigits: 0});
        }

        if (decimalDigits !== undefined) {
             return `${integerDisplay},${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
}

const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');
const previousOperandTextElem = document.querySelector('[data-previous-operand]');
const currentOperandTextElem = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElem, currentOperandTextElem)

numberBtns.forEach(button => {
    button.addEventListener('click', () => {

        if(calculator.previousOperand === "" &&
            calculator.currentOperand !== "" &&
            calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }

        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

allClearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

equalsBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});
