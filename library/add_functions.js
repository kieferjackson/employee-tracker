const inq = require('inquirer');
const qsql = require('./library/query_sql');

function addEmployee()
{
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
            message: 'What is your role?',
            choices: qsql.get_role_titles(),
            name: 'role'
        },
        // Employee's Manager
        {
            type: 'list',
            message: 'Who is your manager?',
            choices: qsql.get_managers(),
            name: 'manager'
        }
    ];

    qsql.qadd('employee');
}

function addRole()
{
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
            choices: qsql.get_role_titles(),
            name: 'role_department'
        }
    ];

    qsql.qadd('role');
}

function addDepartment()
{
    // Array containing all questions for adding a new department
    const add_department_questions = 
    [
        // Department Name
        {
            type: 'input',
            message: "What is the department's name",
            name: 'name'
        }
    ];

    inq.prompt(add_department_questions).then( (answers) =>
    {
        qsql.qadd('department', answers);
    });
}

function updateEmployeeRole()
{

    qsql.qupdateRole('employee')
}

module.exports = { addEmployee, addRole, addDepartment, updateEmployeeRole }