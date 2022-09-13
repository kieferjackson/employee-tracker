const inq = require('inquirer');
const qsql = require('./library/query_sql');

function displayMenuOptions()
{
    // Array containing all main menu options
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
        name: 'choice'
    }
    
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
            case 'Add Employee': qsql.qadd('employee'); break;
            case 'Add Role': qsql.qadd('role'); break;
            case 'Add Department': qsql.qadd('department'); break;

            // Option for Updating Employee Role
            case 'Update Employee Role': qsql.qupdateRole('employee'); break;
        }
    });
}

displayMenuOptions();