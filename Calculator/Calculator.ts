import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu(): void {
  console.log('\nSelect an operation:');
  console.log('1. Addition (+)');
  console.log('2. Subtraction (-)');
  console.log('3. Multiplication (*)');
  console.log('4. Division (/)');
  console.log('5. Exit');
  rl.question('\nEnter your choice: ', handleUserChoice);
}

function handleUserChoice(choice: string): void {
  switch (choice) {
    case '1':
      performOperation('Addition', (a, b) => a + b);
      break;
    case '2':
      performOperation('Subtraction', (a, b) => a - b);
      break;
    case '3':
      performOperation('Multiplication', (a, b) => a * b);
      break;
    case '4':
      performOperation('Division', (a, b) => {
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

function performOperation(operation: string, operationFn: (a: number, b: number) => number): void {
  rl.question('\nEnter the first number: ', (firstNumInput) => {
    const firstNum = parseFloat(firstNumInput);
    if (isNaN(firstNum)) {
      console.log('Invalid number. Try again.');
      return showMenu();
    }

    rl.question('Enter the second number: ', (secondNumInput) => {
      const secondNum = parseFloat(secondNumInput);
      if (isNaN(secondNum)) {
        console.log('Invalid number. Try again.');
        return showMenu();
      }

      const result = operationFn(firstNum, secondNum);
      console.log(`\nResult of ${operation}: ${result}`);
      showMenu();
    });
  });
}

console.log('Welcome to the Interactive Calculator!');
showMenu();
