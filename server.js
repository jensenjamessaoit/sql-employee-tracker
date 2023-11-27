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
      switch (response.option) {
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
  console.log("viewing all departments...");
  db.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    console.table(results);
  });
  menu();
};

const viewRoles = () => {
  console.log("viewing all roles...");
  db.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    console.table(results);
  });
  menu();
};

const viewEmployees = () => {
  console.log("viewing all employees...");
  if (err) throw err;
  console.table(results);
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
        "INSERT INTO department ?",
        [
          {
            name: response.newDepartment,
          },
        ],
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
        type: "list",
        message: "What is the name of the department you are adding?",
        name: "newRoleDepartment",
        choices: [],
      },
    ])
    .then((response) => {});
};
