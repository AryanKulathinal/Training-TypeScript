import * as readline from 'readline';

type Employee = {
  id: number;
  name: string;
  email: string;
  salary: number;
  departmentId: number;
};

type Department = {
  id: number;
  name: string;
};

class Company {
  private employees: Employee[] = [];
  private departments: Department[] = [];

  
  public addDepartment(department: Department): void {
    this.departments.push(department);
    console.log(`Department ${department.name} added successfully.`);
  }

  public deleteDepartment(departmentId: number): void {
    this.departments = this.departments.filter(dept => dept.id !== departmentId);
    console.log(`Department with ID ${departmentId} deleted successfully.`);
  }

 
  public addEmployee(employee: Employee): void {
    this.employees.push(employee);
    console.log(`Employee ${employee.name} added successfully.`);
  }


  public deleteEmployee(employeeId: number): void {
    this.employees = this.employees.filter(emp => emp.id !== employeeId);
    console.log(`Employee with ID ${employeeId} deleted successfully.`);
  }

  
  public viewDepartments(): void {
    console.log("\nDepartments:");
    this.departments.forEach(department => {
      console.log(`ID: ${department.id}, Name: ${department.name}`);
    });
  }

  
  public viewEmployees(): void {
    console.log("\nEmployees:");
    this.employees.forEach(employee => {
      console.log(`ID: ${employee.id}, Name: ${employee.name}, Salary: ${employee.salary}, Department ID: ${employee.departmentId}`);
    });
  }

  
  public viewEmployeesByDepartment(departmentId: number): void {
    console.log(`\nEmployees in Department ${departmentId}:`);
    const employeesInDept = this.employees.filter(emp => emp.departmentId === departmentId);
    if (employeesInDept.length === 0) {
      console.log(`No employees found in department with ID ${departmentId}.`);
    } else {
      employeesInDept.forEach(employee => {
        console.log(`ID: ${employee.id}, Name: ${employee.name}, Salary: ${employee.salary}`);
      });
    }
  }

  
  public totalSalariesByDepartment(): void {
    console.log("\nTotal Salaries by Department:");

    this.departments.forEach(department => {
      const totalSalary = this.employees
        .filter(emp => emp.departmentId === department.id)
        .reduce((total, emp) => total + emp.salary, 0);
      
      console.log(`Department: ${department.name}, Total Salary: ${totalSalary}`);
    });
  }
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const company = new Company();

function showMenu(): void {
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

function handleUserChoice(choice: string): void {
  switch (choice) {
    case '1':
      rl.question('\nEnter department ID: ', (id) => {
        rl.question('Enter department name: ', (name) => {
          company.addDepartment({ id: parseInt(id), name });
          showMenu();
        });
      });
      break;
    case '2':
      rl.question('\nEnter department ID to delete: ', (id) => {
        company.deleteDepartment(parseInt(id));
        showMenu();
      });
      break;
    case '3':
      rl.question('\nEnter employee ID: ', (id) => {
        rl.question('Enter employee name: ', (name) => {
          rl.question('Enter employee email: ', (email) => {
            rl.question('Enter employee salary: ', (salary) => {
              rl.question('Enter department ID: ', (departmentId) => {
                company.addEmployee({
                  id: parseInt(id),
                  name,
                  email,
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
      rl.question('\nEnter employee ID to delete: ', (id) => {
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
      rl.question('\nEnter department ID to view employees: ', (id) => {
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
