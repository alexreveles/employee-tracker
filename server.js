// ------------------------------------------ Dependencies ------------------------------------------- //
const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const fs = require('fs');
const db = express();

require('dotenv').config();


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: '',
    database: 'employee_db'
});

connection.connect(err => {
	if (err) throw err;
	inquirer.prompt([
		{
			type: 'list',
			message: 'What would you like to do?',
			name: 'You_choosen',
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Roles',
                'Search for Employee',
                'Search for Employee by Manager',
                'Remove Employee',
                'Remove Department'

            ]
		},
		{
			type: 'input',
			message: 'What ?',
			name: ''
		}
	]).then(data => {
		console.log(data);
		// save to db
		const query = connection.query(
			'INSERT INTO users SET ?',
			[ data ],
			(err, res) => {
				if (err) throw err;
				console.log('Done!');
				connection.end();
			}
		);
		console.log(query.sql);
	}).catch(err => {if (err)throw err});
});


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




