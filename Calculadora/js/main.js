const previousOperationText = document.querySelector("#previous-operations");

const currentOperationText = document.querySelector("#current-operations");

const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    //,currentOperationText
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperations = "";
        //currentOperations
    };
    //adiciona digito na tela da calculadora
    addDigit(digit) {
        //Operação atual ja tem uma ","
        if (digit === "," && this.currentOperationText.innerText.includes(",")) {
            return;
        }
        //currentOperations
        this.currentOperations = digit;
        this.updateScreen()

    }

    //Processar todas operações da calculadora
    processOperation(operation) {
        //checar se o currentvalue está vazio
        if (this.currentOperationText.innerText === "" && operation !== "AC") {
            //previousOperationText
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        //obter valor atual e anterior
        let operationValue;     //previousOperationText
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":           //previous
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case '÷':
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "x":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "AC":
                this.processClearCurrentOperator();
                break;
            case "=":
                this.processEqualOperator();
                break;
            case '%':
                operationValue = previous / 100;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            default:
                return;

        }
    }



    //alterar valores da tela da calculadora
    updateScreen(operationValue = null, operations = null, current = null, previous = null) {

        // console.log(operationValue, operations, current, previous);

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperations;
        } else {
            //verifique if valor é zero, if for apenas adicione o valor atual
            if (previous === 0) {
                operationValue = current
            }
            //adicionar valor atual ao anterior
            //previousOperationText
            this.previousOperationText.innerText = `${operationValue} ${operations} `;
            this.currentOperationText.innerText = "";

        }
    };

    changeOperation(operation) {

        const mathOperations = ["x", '÷', "+", "-"];
        if (!mathOperations.includes(operation)) {
            return;
        }
        //previousOperationText                 //previousOperationText     
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    //limpar operação
    processClearCurrentOperator() {
        this.currentOperationText.innerText = "";
        //previousOperationText
        this.previousOperationText.innerText = "";
    };
    //igualdade
    processEqualOperator() {
        //previousOperationText
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
    processPorcentagem() {
        operationValue = previous / 100;
        this.updateScreen(operationValue, operation, current, previous);
    }
};
//previousOperationText
const calc = new Calculator(previousOperationText, currentOperationText);



buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        const value = event.target.innerText;

        if (+value >= 0 || value === ",") {
            calc.addDigit(value);

        } else {
            calc.processOperation(value);
        }
    });
});

