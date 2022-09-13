const inq = require('inquirer');
const sql = require('mysql2');

const employees_db = sql.createConnection
(
    {
        host: 'localhost',
        user: 'root',
        password: 'n1Te-S#y',
        database: 'employees_db'
    },
    console.log('Successfully connect to the employees_db database.')
);

function displayMenuOptions()
{
    const menu_options =
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
        name: 'option'
    }
    
    inq.prompt(menu_options).then( (answers) =>
    {
        const { option } = answers;

        switch (option)
        {
            // Options for viewing (employee, role, and department tables)
            case 'View All Employees': qdisplay('employee'); break;
            case 'View All Roles': qdisplay('role'); break;
            case 'View All Departments': qdisplay('department'); break;

            // Options for Adding Data to Tables
            case 'Add Employee': qadd('employee'); break;
            case 'Add Role': qadd('role'); break;
            case 'Add Department': qadd('department'); break;

            // Option for Updating Employee Role
            case 'Update Employee Role': qupdateRole('employee'); break;
        }
    });
}