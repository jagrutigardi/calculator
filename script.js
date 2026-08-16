const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const historyList = document.getElementById("history-list");
const clearHistory = document.getElementById("clear-history");
let expression = "";
buttons.forEach(button => {
    button.addEventListener("click", function () {
        const value = this.textContent;
        if(value === "C") {
            expression = "";
            display.value = "";
            return;
        }
                if (value === "DEL") {
            expression = expression.slice(0, -1);
            display.value = expression;
            return;
        }
               if (value === "=") {
            calculate();
            return;
        }
                expression += value;
        display.value = expression;
    });
});
function calculate() {
    if (expression === "") {
        return;
    }
    try {
                if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
            throw new Error("Invalid expression");
        }
        const result = Function("return " + expression)();
        if (!Number.isFinite(result)) {
            throw new Error("Invalid calculation");
        }
 // Add to history
        const historyItem = document.createElement("li");
        historyItem.textContent = expression + " = " + result;

        if (
            historyList.children.length === 1 &&
            historyList.children[0].textContent === "No history yet..."
        ) {
            historyList.innerHTML = "";
        }
        historyList.appendChild(historyItem);
        display.value = result;
        expression = result.toString();
    } catch (error) {
        display.value = "Error";
        expression = "";
    }
}
clearHistory.addEventListener("click", function () {
    historyList.innerHTML = "<li>No history yet...</li>";
});