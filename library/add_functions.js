const inq = require('inquirer');
const qsql = require('./query_sql');

async function addEmployee()
{
    // Query for the Role Titles and Managers with their respective IDs
    const roles_info = await qsql.get_role_titles();
    const managers_info = await qsql.get_managers();
    // Add option for employees without a manager
    managers_info.managers.push('No manager at this time');


    // Array containing all questions for adding a new employee
    const add_employee_questions = 
    [
        // Employee First Name
        {
            type: 'input',
            message: 'What is your first name?',
            name: 'first_name'
        },
        // Employee Last Name
        {
            type: 'input',
            message: 'What is your last name?',
            name: 'last_name'
        },
        // Employee Role
        {
            type: 'list',
            message: 'What is your role title?',
            choices: roles_info.titles,
            name: 'title'
        },
        // Employee's Manager
        {
            type: 'list',
            message: 'Who is your manager?',
            choices: managers_info.managers,
            name: 'manager'
        }
    ];

    return new Promise( (resolve, reject) =>
    {
        inq.prompt(add_employee_questions).then( async (answers) =>
        {
            // Assign the ID of the given role by the using the role title as the key for roles_info
            answers.role_id = roles_info[answers.title];

            // Assign the ID of the given manager by the using the manager's name as the key for managers_info
            if (answers.manager === 'No manager at this time')
            {
                answers.manager_id = 'NULL';
            }
            else
            {
                answers.manager_id = managers_info[answers.manager];
            }

            return resolve( await qsql.qadd('employee', answers));
        });
    });
}

async function addRole()
{
    // Query for Departments for names and respective IDs
    const departments_info = await qsql.get_departments();

    // Array containing all questions for adding a new role
    const add_role_questions = 
    [
        // Role Title
        {
            type: 'input',
            message: "What is the role's title?",
            name: 'title'
        },
        // Role Salary
        {
            type: 'input',
            message: "What is the role's annual salary?",
            name: 'salary'
        },
        // Role Department
        {
            type: 'list',
            message: 'Which department does the role belong to?',
            choices: departments_info.names,
            name: 'role_department'
        }
    ];

    return new Promise( (resolve, reject) =>
    {

        inq.prompt(add_role_questions).then( async (answers) =>
        {
            // Assign the ID of the given department by the using the department name as the key for departments_info
            answers.department_id = departments_info[answers.role_department];

            return resolve( await qsql.qadd('role', answers));
        });
    });
}

function addDepartment()
{
    // Array containing all questions for adding a new department
    const add_department_questions = 
    [
        // Department Name
        {
            type: 'input',
            message: "What is the department's name?",
            name: 'name'
        }
    ];

    return new Promise( (resolve, reject) =>
    {
        inq.prompt(add_department_questions).then( async (answers) =>
        {
            return resolve( await qsql.qadd('department', answers));
        });
    });
}

async function updateEmployeeRole()
{
    // Query for Employees, Roles, and Managers for names, titles, and respective IDs
    const employees_info = await qsql.get_employees();
    const roles_info = await qsql.get_role_titles();
    const managers_info = await qsql.get_managers();
    // Add option for employees without a manager
    managers_info.managers.push('No manager at this time');

    // Array containing all questions for adding a new role
    const update_role_questions = 
    [
        // Employee to Update
        {
            type: 'list',
            message: "Which employee's role needs to be updated?",
            choices: employees_info.employees,
            name: 'employee'
        },
        // New Role
        {
            type: 'list',
            message: "Which is their updated role title?",
            choices: roles_info.titles,
            name: 'title'
        },
        // Updated Employee Manager
        {
            type: 'list',
            message: 'Which of the following are the employees updated manager?',
            choices: managers_info.managers,
            name: 'manager'
        }
    ];

    return new Promise( (resolve, reject) =>
    {

        inq.prompt(update_role_questions).then( async (answers) =>
        {
            // Assign the ID of the given employee by the using the employee name as the key for employees_info
            answers.employee_id = employees_info[answers.employee];

            // Assign the ID of the given role by the using the role title as the key for roles_info
            answers.role_id = roles_info[answers.title];

            // Assign the ID of the given manager by the using the manager's name as the key for managers_info
            if (answers.manager === 'No manager at this time')
            {
                answers.manager_id = 'NULL';
            }
            else
            {
                answers.manager_id = managers_info[answers.manager];
            }

            return resolve( await qsql.qupdateRole(answers));
        });
    });

    
}

module.exports = { addEmployee, addRole, addDepartment, updateEmployeeRole }