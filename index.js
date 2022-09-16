const inq = require('inquirer');
const qsql = require('./library/query_sql');
const af = require('./library/add_functions.js');
const cTable = require('console.table');

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
    
    inq.prompt(menu_options).then( async (answers) =>
    {
        const { choice } = answers;

        switch (choice)
        {
            // Options for viewing (employee, role, and department tables)
            case 'View All Employees':      console.table( await qsql.get_table_data('employee') );     break;
            case 'View All Roles':          console.table( await qsql.get_table_data('role') );         break;
            case 'View All Departments':    console.table( await qsql.get_table_data('department') );   break;

            // Options for Adding Data to Tables
            case 'Add Employee':    await af.addEmployee();   break;
            case 'Add Role':        await af.addRole();       break;
            case 'Add Department':  await af.addDepartment(); break;

            // Option for Updating Employee Role
            case 'Update Employee Role':    af.updateEmployeeRole(); break;
        }

        // Display the menu again to view options
        displayMenuOptions();
    });
}

async function init()
{
    displayMenuOptions();
    // console.log(await qsql.get_managers());
}

init();