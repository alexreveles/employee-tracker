USE employee_db;

INSERT INTO department (name)
VALUES 
('HR'),
('Marketing'),
('Sales'),
('Janitor');

INSERT INTO role (title, salary, department_id)
VALUES
('HR Manager', 50000, 1),
('HR Specialist', 30000, 1),
('Intern HR', 10000, 1),
('Marketing Manager', 25000, 2),
('Intern Marketing', 8000, 2),
('Sales Manager', 45000, 3),
('Sales Manager', 35000, 3),
('Intern Sales', 12000, 3),
('Manager Janitor', 13000, 4),
('Janitor', 7000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, NULL),
('Alex', 'Rodriguez', 1, 2),
('Lebron', 'James', 1, 2),
('Kyrie', 'Irving', 2, NULL),
('Derek', 'Jeter', 2, 4),
('Bryce', 'Harper', 3, NULL),
('Mookie', 'Betts', 3, 7),
('Robinson', 'Cano', 3 ,8),
('Gary', 'Sanchez', 4, NULL),
('Aaron', 'Judge', 4, 10);
