"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Employee = /** @class */ (function () {
    function Employee(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    return Employee;
}());
var employees = [];
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function isUniqueId(id) {
    return !employees.some(function (employee) { return employee.id === id; });
}
function askForEmployeeDetails(count) {
    var employeeCounter = 0;
    function askDetails() {
        if (employeeCounter < count) {
            rl.question("Enter ID for employee ".concat(employeeCounter + 1, ": "), function (idInput) {
                var id = parseInt(idInput);
                if (!isUniqueId(id)) {
                    console.log("Error: Employee with ID ".concat(id, " already exists."));
                    askDetails();
                    return;
                }
                rl.question("Enter Name for employee ".concat(employeeCounter + 1, ": "), function (name) {
                    rl.question("Enter Email for employee ".concat(employeeCounter + 1, ": "), function (email) {
                        rl.question("Enter Password for employee ".concat(employeeCounter + 1, ": "), function (password) {
                            var newEmployee = new Employee(id, name, email, password);
                            employees.push(newEmployee);
                            console.log("Employee added: ".concat(JSON.stringify(newEmployee)));
                            employeeCounter++;
                            askDetails();
                        });
                    });
                });
            });
        }
        else {
            console.log("All employees have been added.");
            rl.close();
        }
    }
    askDetails();
}
rl.question("Enter the number of employees to add: ", function (countInput) {
    var count = parseInt(countInput);
    askForEmployeeDetails(count);
});
