"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Company = /** @class */ (function () {
    function Company() {
        this.employees = [];
        this.departments = [];
    }
    Company.prototype.addDepartment = function (department) {
        this.departments.push(department);
        console.log("Department ".concat(department.name, " added successfully."));
    };
    Company.prototype.deleteDepartment = function (departmentId) {
        this.departments = this.departments.filter(function (dept) { return dept.id !== departmentId; });
        console.log("Department with ID ".concat(departmentId, " deleted successfully."));
    };
    Company.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
        console.log("Employee ".concat(employee.name, " added successfully."));
    };
    Company.prototype.deleteEmployee = function (employeeId) {
        this.employees = this.employees.filter(function (emp) { return emp.id !== employeeId; });
        console.log("Employee with ID ".concat(employeeId, " deleted successfully."));
    };
    Company.prototype.viewDepartments = function () {
        console.log("\nDepartments:");
        this.departments.forEach(function (department) {
            console.log("ID: ".concat(department.id, ", Name: ").concat(department.name));
        });
    };
    Company.prototype.viewEmployees = function () {
        console.log("\nEmployees:");
        this.employees.forEach(function (employee) {
            console.log("ID: ".concat(employee.id, ", Name: ").concat(employee.name, ", Salary: ").concat(employee.salary, ", Department ID: ").concat(employee.departmentId));
        });
    };
    Company.prototype.viewEmployeesByDepartment = function (departmentId) {
        console.log("\nEmployees in Department ".concat(departmentId, ":"));
        var employeesInDept = this.employees.filter(function (emp) { return emp.departmentId === departmentId; });
        if (employeesInDept.length === 0) {
            console.log("No employees found in department with ID ".concat(departmentId, "."));
        }
        else {
            employeesInDept.forEach(function (employee) {
                console.log("ID: ".concat(employee.id, ", Name: ").concat(employee.name, ", Salary: ").concat(employee.salary));
            });
        }
    };
    Company.prototype.totalSalariesByDepartment = function () {
        var _this = this;
        console.log("\nTotal Salaries by Department:");
        this.departments.forEach(function (department) {
            var totalSalary = _this.employees
                .filter(function (emp) { return emp.departmentId === department.id; })
                .reduce(function (total, emp) { return total + emp.salary; }, 0);
            console.log("Department: ".concat(department.name, ", Total Salary: ").concat(totalSalary));
        });
    };
    return Company;
}());
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var company = new Company();
function showMenu() {
    console.log('\nChoose an option:');
    console.log('1. Add Department');
    console.log('2. Delete Department');
    console.log('3. Add Employee');
    console.log('4. Delete Employee');
    console.log('5. View Departments');
    console.log('6. View Employees');
    console.log('7. View Employees by Department');
    console.log('8. Calculate Total Salaries by Department');
    console.log('9. Exit');
    rl.question('\nEnter your choice: ', handleUserChoice);
}
function handleUserChoice(choice) {
    switch (choice) {
        case '1':
            rl.question('\nEnter department ID: ', function (id) {
                rl.question('Enter department name: ', function (name) {
                    company.addDepartment({ id: parseInt(id), name: name });
                    showMenu();
                });
            });
            break;
        case '2':
            rl.question('\nEnter department ID to delete: ', function (id) {
                company.deleteDepartment(parseInt(id));
                showMenu();
            });
            break;
        case '3':
            rl.question('\nEnter employee ID: ', function (id) {
                rl.question('Enter employee name: ', function (name) {
                    rl.question('Enter employee email: ', function (email) {
                        rl.question('Enter employee salary: ', function (salary) {
                            rl.question('Enter department ID: ', function (departmentId) {
                                company.addEmployee({
                                    id: parseInt(id),
                                    name: name,
                                    email: email,
                                    salary: parseFloat(salary),
                                    departmentId: parseInt(departmentId),
                                });
                                showMenu();
                            });
                        });
                    });
                });
            });
            break;
        case '4':
            rl.question('\nEnter employee ID to delete: ', function (id) {
                company.deleteEmployee(parseInt(id));
                showMenu();
            });
            break;
        case '5':
            company.viewDepartments();
            showMenu();
            break;
        case '6':
            company.viewEmployees();
            showMenu();
            break;
        case '7':
            rl.question('\nEnter department ID to view employees: ', function (id) {
                company.viewEmployeesByDepartment(parseInt(id));
                showMenu();
            });
            break;
        case '8':
            company.totalSalariesByDepartment();
            showMenu();
            break;
        case '9':
            console.log('Exiting...');
            rl.close();
            break;
        default:
            console.log('Invalid choice. Try again.');
            showMenu();
    }
}
console.log('Welcome to the Company Management System!');
showMenu();
