import * as readline from 'readline';

interface IEmployee {
    id: number;
    name: string;
    email: string;
    password: string;
}

class Employee implements IEmployee {
    constructor(
        public id: number, 
        public name: string, 
        public email: string, 
        public password: string
    ) {}
}

const employees: Employee[] = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function isUniqueId(id: number): boolean {
    return !employees.some(employee => employee.id === id);
}

function askForEmployeeDetails(count: number): void {
    let employeeCounter = 0;

    function askDetails() {
        if (employeeCounter < count) {
            rl.question(`Enter ID for employee ${employeeCounter + 1}: `, (idInput) => {
                const id = parseInt(idInput);
                if (!isUniqueId(id)) {
                    console.log(`Error: Employee with ID ${id} already exists.`);
                    askDetails(); 
                    return;
                }
                rl.question(`Enter Name for employee ${employeeCounter + 1}: `, (name) => {
                    rl.question(`Enter Email for employee ${employeeCounter + 1}: `, (email) => {
                        rl.question(`Enter Password for employee ${employeeCounter + 1}: `, (password) => {
                            const newEmployee = new Employee(id, name, email, password);
                            employees.push(newEmployee);
                            console.log(`Employee added: ${JSON.stringify(newEmployee)}`);
                            employeeCounter++;
                            askDetails(); 
                        });
                    });
                });
            });
        } else {
            console.log("All employees have been added.");
            rl.close();
        }
    }
    askDetails();
}

rl.question("Enter the number of employees to add: ", (countInput) => {
    const count = parseInt(countInput);
    askForEmployeeDetails(count);
});
