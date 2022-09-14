const inq = require('inquirer');
const qsql = require('./library/query_sql');

function displayMenuOptions()
{
    // Array containing all main menu options
    const menu_options = 
    [
        {
            type: 'list',
            message: 'Please select an option: ',
            choices:
            [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department'
            ],
            name: 'choice'
        }
    ];
    
    inq.prompt(menu_options).then( (answers) =>
    {
        const { choice } = answers;

        switch (choice)
        {
            // Options for viewing (employee, role, and department tables)
            case 'View All Employees': qsql.get_table_data('employee'); break;
            case 'View All Roles': qsql.get_table_data('role'); break;
            case 'View All Departments': qsql.get_table_data('department'); break;

            // Options for Adding Data to Tables
            case 'Add Employee': addEmployee(); break;
            case 'Add Role': addRole(); break;
            case 'Add Department': addDepartment(); break;

            // Option for Updating Employee Role
            case 'Update Employee Role': updateEmployeeRole(); break;
        }
    });
}

function addEmployee()
{
    // Array containing all main menu options
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

    qsql.qadd('role');
}

function addDepartment()
{

    qsql.qadd('department')
}

function updateEmployeeRole()
{

    qsql.qupdateRole('employee')
}

console.log('Logging Role Titles: ', qsql.get_role_titles());