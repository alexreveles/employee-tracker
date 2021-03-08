// ------------------------------------------ Dependencies ------------------------------------------- //
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const fs = require('fs');

// const { response } = require("express");
// require('dotenv').config();


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: '',
    database: 'employee_db'
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("Connected as id " + connection.threadId);
	init();
  });

// ------------------------------------------ function to initialize application  ------------------------------------------- //

function init() {
	inquirer.prompt({
		type: "list",
		name: "start",
		message: "What would you like to do?",
		choices: ["View All Employees", "View All Departments", "View All Roles", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Add Employee Role", "Remove Role", "Add New Department", "Remove Department", "Update Employee Manager"]
	})
	.then(function(response) {
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
	})
};


// ------------------------------------------ Function to display all employees By first_name, last_name, role_id, manager_id  ------------------------------------------- //

const displayEmployees = () => {
connection.query(` SELECT employee.first_name, employee.last_name, role.title, CONCAT(manager.first_name, '', manager.last_name) manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id;`,
( err, data) => {
	if (err) throw err;
	console.table(data);
	init();
})
};

// ------------------------------------------ Function to display all departments By name  ------------------------------------------- //

const viewDepartments = () => {
connection.query(`SELECT department.name, department.id FROM department;`, 
(err, data) => {
	if (err) throw err;
	console.table(data);
	init();
})
};


// ------------------------------------------ Function to display all roles By title, salary, department_id  ------------------------------------------- //

const viewRoles = () => { 
connection.query(`SELECT role.title, role.salary, role.id, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id;`,
(err, data) => {
	if (err) throw err;
	console.table(data);
	init();
})
};




// ------------------------------------------ Function to Add Employee ------------------------------------------- //
	const addEmployee = () => {
	connection.query(`SELECT employee.first_name, employee.last_name, role.id, CONCAT(manager.first_name, '', manager.last_name) manager ;`, 
	(err, data) => {
		if (err) throw err;
		console.table(data);
		init();
	})	
	};



// ------------------------------------------ Function to Update Employee Role ------------------------------------------- //
	const updateEmpRole = () => {
	connection.query(`SELECT ;`, 
	(err, data) => {
		if (err) throw err;
		console.table(data);
		init();
	})	
	};

// ------------------------------------------ Function to Add Employee Role ------------------------------------------- //
	const AddRole = () => {
	connection.query(`SELECT ;`, 
	(err, data) => {
		if (err) throw err;
		console.table(data);
		init();
	})	
	};

// ------------------------------------------ Function to Add New Department ------------------------------------------- //
	const addDepartment = () => {
	connection.query(`SELECT ;`, 
	(err, data) => {
		if (err) throw err;
		console.table(data);
		init();
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




