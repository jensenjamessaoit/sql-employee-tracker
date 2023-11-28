// import db and inquirer
const db = require("./config/connection");
const inquirer = require("inquirer");

const menu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "what would you like to do?",
        name: "response",
        choices: [
          {
            name: "view all departments",
            value: "viewAllDepartments",
          },
          {
            name: "view all roles",
            value: "viewAllRoles",
          },
          {
            name: "view all employees",
            value: "viewAllEmployees",
          },
          {
            name: "add a department",
            value: "addDepartment",
          },
          {
            name: "add a role",
            value: "addRole",
          },
          {
            name: "add an employee",
            value: "addEmployee",
          },
          {
            name: "update an employee role",
            value: "updateEmployeeRole",
          },
          {
            name: "quit",
            value: "quit",
          },
        ],
      },
    ])
    .then((response) => {
      console.log(response);
      switch (response.response) {
        case "viewAllDepartments":
          viewDepartments();
          break;
        case "viewAllRoles":
          viewRoles();
          break;
        case "viewAllEmployees":
          viewEmployees();
          break;
        case "addDepartment":
          addDepartment();
          break;
        case "addRole":
          addRole();
          break;
        case "addEmployee":
          addEmployee();
          break;
        case "updateEmployeeRole":
          updateEmployeeRole();
          break;
        default:
          db.end();
      }
    });
};

// view all functions
const viewDepartments = () => {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    console.log("\nviewing all departments...");
    console.table(results);
  });
  menu();
};

const viewRoles = () => {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    console.log("\nviewing all roles...");
    console.table(results);
  });
  menu();
};

const viewEmployees = () => {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    console.log("\nviewing all employees...");
    console.table(results);
  });
  menu();
};

// add functions
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you are adding?",
        name: "newDepartment",
      },
    ])
    .then((response) => {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        [response.newDepartment],
        (err, results) => {
          if (err) throw err;
          console.log("Sucess!! New department added.");
          menu();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the title of the role you are adding?",
        name: "newRoleTitle",
      },
      {
        type: "input",
        message: "What is the salary of this role?",
        name: "newRoleSalary",
      },
      {
        type: "input",
        message:
          "What is the ID of the department you are adding the role into?",
        name: "newRoleDepartment",
      },
    ])
    .then((response) => {
      db.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [
          // response,
          response.newRoleTitle,
          response.newRoleSalary,
          response.newRoleDepartment,
        ],
        (err, results) => {
          if (err) throw err;
          console.log("Success!! New role added.");
          menu();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new employee's first name?",
        name: "newEmpFirst",
      },
      {
        type: "input",
        message: "What is the new employee's last name?",
        name: "newEmpLast",
      },
      {
        type: "input",
        message: "What is the ID of the new employee's role?",
        name: "newEmpRole",
      },
      {
        type: "input",
        message: "What is the ID of the new employee's manager?",
        name: "newEmpManager",
      },
    ])
    .then((response) => {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          response.newEmpFirst,
          response.newEmpLast,
          response.newEmpRole,
          response.newEmpManager,
        ],
        (err, results) => {
          if (err) throw err;
          console.log("Success!! New employee added.");
          menu();
        }
      );
    });
};

const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "What is the ID of the employee whose role you wish to change?",
        name: "empId",
      },
      {
        type: "input",
        message:
          "What is the ID of the role you wish to change this employee to?",
        name: "roleId",
      },
    ])
    .then((response) => {
      db.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [parseInt(response.roleId), parseInt(response.empId)],
        (err, results) => {
          if (err) throw err;
          console.log("Success!! Employee role updated");
          menu();
        }
      );
    });
};

menu();
