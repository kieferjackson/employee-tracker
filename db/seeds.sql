INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 125000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Ashley', 'Hudson', 1, NULL),
    ('Nick', 'Birdette', 2, 1),
    ('Gary', 'Weasly', 3, NULL),
    ('Benjamin', 'Shoemaker', 4, 3),
    ('Veronica', 'Bailey', 5, NULL),
    ('Kevin', 'Alfred', 6, 5);