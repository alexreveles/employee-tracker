// ------------------------------------------ Dependencies ------------------------------------------- //
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const fs = require("fs");

// const { response } = require("express");
// require('dotenv').config();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your MySQL username
  user: "root",
  // Your MySQL password
  password: "",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId);
  init();
});

// ------------------------------------------ function to initialize application  ------------------------------------------- //

function init() {
  inquirer
    .prompt({
      type: "list",
      name: "start",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Add Employee Role",
        "Remove Role",
        "Add New Department",
        "Remove Department",
        "Update Employee Manager",
      ],
    })
    .then(function (response) {
      switch (response.start) {
        case "View All Employees":
          displayEmployees();
          break;

        case "View All Departments":
          viewDepartments();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Employees By Department":
          displayEmByDep();
          break;

        case "View All Employees By Manager":
          displayEmByManager();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Update Employee Role":
          updateEmpRole();
          break;

        case "Add Employee Role":
          AddRole();
          break;

        case "Remove Role":
          removeRole();
          break;

        case "Add New Department":
          addDepartment();
          break;

        case "Remove Department":
          removeDept();
          break;

        case "Update Employee Manager":
          updateEmpManager();
          break;
      }
    });
}

// ------------------------------------------ Function to display all employees By first_name, last_name, role_id, manager_id  ------------------------------------------- //

const displayEmployees = () => {
  connection.query(
    ` SELECT employee.first_name, employee.last_name, role.title, CONCAT(manager.first_name, '', manager.last_name) manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id;`,
    (err, data) => {
      if (err) throw err;
      console.table(data);
      init();
    }
  );
};

// ------------------------------------------ Function to display all departments By name  ------------------------------------------- //

const viewDepartments = () => {
  connection.query(
    `SELECT department.name, department.id FROM department;`,
    (err, data) => {
      if (err) throw err;
      console.table(data);
      init();
    }
  );
};

// ------------------------------------------ Function to display all roles By title, salary, department_id  ------------------------------------------- //

const viewRoles = () => {
  connection.query(
    `SELECT role.title, role.salary, role.id, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id;`,
    (err, data) => {
      if (err) throw err;
      console.table(data);
      init();
    }
  );
};

// ------------------------------------------ Function to Add Employee ------------------------------------------- //


const addEmployee =  () => {

	
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter employee first name",
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter employee last name",
      },
      {
        type: "list",
        name: "role_id",
        message: "Please select employee title",
        choices: [
			{name: 'HR Manager', value: 1},
			{name: 'HR Specialist', value: 2},
			{name:'Intern HR', value: 3},
			{name:'Marketing Manager', value: 4},
			{name:'Intern Marketing', value: 5},
			{name:'Sales Manager', value: 6},
			{name:'Intern Sales', value: 7},
			{name:'Manager Janitor', value: 8},
			{name:'Janitor', value: 9}
		]
      },
      {
        type: "input",
        name: "manager_id",
        message: "Please enter employee manager id",
		choices: [ 
			{name: 'John Doe', value: 1},
			{name: 'Alex Rodriguez', value: 2},
			{name: 'Lebron James', value: 3},
			{name: 'Kyrie Irving', value: 4},
			{name: 'Derek Jeter', value: 5},
			{name: 'Bryce Harper', value: 6},
			{name: 'Mookie Betts', value: 7},
			{name: 'Robinson Cano', value: 8},
			{name: 'Gary Sanchez', value: 9},
			{name: 'Aaron Judge', value: 10}
		]
      },
    ])
    .then((employee) => {
      const addQuery = `INSERT INTO employee SET ?`;
      connection.query(addQuery, [employee], (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
      });
    });
};

// ------------------------------------------ Function to Update Employee Role ------------------------------------------- //
function updateEmpRole() {
	let query = ("SELECT * FROM employee");
  
	connection.query(query, (err, response) => {
  
	  const employees = response.map(function (element) {
		return {
		  name: `${element.first_name} ${element.last_name}`,
		  value: element.id
		}
	  });
  
	  inquirer.prompt([{
		type: "list",
		name: "employeeId",
		message: "Which employees role do you want to update",
		choices: employees
	  }])
		.then(input1 => {
		  connection.query("SELECT * FROM role", (err, data) => {
  
			const roles = data.map(function (role) {
			  return {
				name: role.title,
				value: role.id
			  }
			});
  
			inquirer.prompt([{
			  type: "list",
			  name: "roleId",
			  message: "What's the new role",
			  choices: roles
			}])
			  .then(input2 => {
				const query1 = `UPDATE employee
		  SET employee.role_id = ? 
		  WHERE employee.id = ?`
				connection.query(query1, [input2.roleId, input1.employeeId], function (err, res) {
				  var tempPosition;
				  // will return the updated position
				  for (var k = 0; k < roles.length; k++) {
					if (roles[k].value == input2.roleId) {
					  tempPosition = roles[k].name;
					}
				  }
				  // will return the employee
				  var tempName;
				  for (var g = 0; g < employees.length; g++) {
					if (employees[g].value == input1.employeeId) {
					  tempName = employees[g].name;
					}
				  }
  
				  if (res.changedRows === 1) {
					console.log(`Successfully updated ${tempName} to position of ${tempPosition}`);
				  } else {
					console.log(`Error: ${tempName}'s current position is ${tempPosition}`)
				  }
				  // console.log(res.changedRows);
				  init();
				})
			  })
		  })
		})
	})
  };

// ------------------------------------------ Function to Add Employee Role ------------------------------------------- //
function AddRole() {
	let query1 = `SELECT * FROM role`
	connection.query(query1, (err, data) => {
	  if (err) throw err
	  inquirer.prompt([
		{
		  type: "input",
		  name: "roleId",
		  message: "Please enter id for new role"
		}, {
		  type: "input",
		  name: "role",
		  message: "Please enter title of new role"
		}, {
		  type: "input",
		  name: "salary",
		  message: "Please enter salary for new role"
		}, {
		  type: "input",
		  name: "deptId",
		  message: "Please enter department id for new role"
		}])
		.then(function (answers) {
		  let query2 = `INSERT INTO role VALUES (?,?,?,?)`
		  connection.query(query2, [answers.roleId, answers.role, answers.salary, answers.deptId], function (err) {
			if (err) throw err;
			console.log(`${answers.role} added as new role`)
			init();
		  })
		})
	})
  }
  

// ------------------------------------------ Function to Add New Department ------------------------------------------- //
function addDepartment() {
	let query1 = `SELECT * FROM department`
	connection.query(query1, (err, res) => {
	  if (err) throw err
	  inquirer.prompt([{
		type: "input",
		name: "deptId",
		message: "Please enter id for new department"
	  }, {
		type: "input",
		name: "deptName",
		message: "Please enter name for new department"
	  }])
		.then(answers => {
		  let query2 = `INSERT INTO department VALUES (?,?)`
		  connection.query(query2, [answers.deptId, answers.deptName], (err) => {
			if (err) throw err
			console.log(`${answers.deptName} added as a new department`)
			init();
		  })
		})
	})
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------------------ (Extra Credit) Function to View All Employees By Department ------------------------------------------- //
// employee including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// const displayEmByDep = () => {
// connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title FROM role LEFT JOIN department on role.department_id = department.id;`,
// (err, data) => {
// 	if (err) throw err;
// 	console.table(data);
// 	init();
// })

// };

// ------------------------------------------  (Extra Credit) Function to View All Employees By Manager ------------------------------------------- //
// const displayEmByManager = () => {
// connection.query(`SELECT ;`,
// (err, data) => {
// 	if (err) throw err;
// 	console.table(data);
// 	init();
// })
// };

// ------------------------------------------ (Extra Credit) Function to Remove Employee ------------------------------------------- //
// const removeEmployee = () => {
// connection.query(`SELECT ;`,
// (err, data) => {
// 	if (err) throw err;
// 	console.table(data);
// 	init();
// })
// };

// ------------------------------------------  (Extra Credit) Function to Remove Department ------------------------------------------- //
// const removeDept = () => {
// connection.query(`SELECT ;`,
// (err, data) => {
// 	if (err) throw err;
// 	console.table(data);
// 	init();
// })
// };

// ------------------------------------------ (Extra Credit) Function to Remove Role  ------------------------------------------- //

// const removeRole = () => {
// connection.query(`SELECT ;`,
// (err, data) => {
// 	if (err) throw err;
// 	console.table(data);
// 	init();
// })
// };

// ------------------------------------------ (Extra Credit) Function to Update Employee Manager ------------------------------------------- //
// const updateEmpManager = () => {
// connection.query(`SELECT ;`,
// (err, data) => {
// 	if (err) throw err;
// 	console.table(data);
// 	init();
// })
// };

// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

// ------------------------------------------  ------------------------------------------- //
