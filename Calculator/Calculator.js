"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function showMenu() {
    console.log('\nSelect an operation:');
    console.log('1. Addition (+)');
    console.log('2. Subtraction (-)');
    console.log('3. Multiplication (*)');
    console.log('4. Division (/)');
    console.log('5. Exit');
    rl.question('\nEnter your choice: ', handleUserChoice);
}
function handleUserChoice(choice) {
    switch (choice) {
        case '1':
            performOperation('Addition', function (a, b) { return a + b; });
            break;
        case '2':
            performOperation('Subtraction', function (a, b) { return a - b; });
            break;
        case '3':
            performOperation('Multiplication', function (a, b) { return a * b; });
            break;
        case '4':
            performOperation('Division', function (a, b) {
                if (b === 0) {
                    console.log("Error: Cannot divide by zero!");
                    showMenu();
                    return 0;
                }
                return a / b;
            });
            break;
        case '5':
            console.log('Exiting...');
            rl.close();
            break;
        default:
            console.log('Invalid choice. Try again.');
            showMenu();
    }
}
function performOperation(operation, operationFn) {
    rl.question('\nEnter the first number: ', function (firstNumInput) {
        var firstNum = parseFloat(firstNumInput);
        if (isNaN(firstNum)) {
            console.log('Invalid number. Try again.');
            return showMenu();
        }
        rl.question('Enter the second number: ', function (secondNumInput) {
            var secondNum = parseFloat(secondNumInput);
            if (isNaN(secondNum)) {
                console.log('Invalid number. Try again.');
                return showMenu();
            }
            var result = operationFn(firstNum, secondNum);
            console.log("\nResult of ".concat(operation, ": ").concat(result));
            showMenu();
        });
    });
}
console.log('Welcome to the Interactive Calculator!');
showMenu();
