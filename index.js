const inq = require('inquirer');
const sql = require('mysql2');
const cTable = require('console.table');

const employees_db = sql.createConnection
(
    {
        host: 'localhost',
        user: 'root',
        password: 'n1Te-S#y',
        database: 'employees_db'
    },
    console.log('Successfully connected to the employees_db database.')
);

function displayMenuOptions()
{
    /**
     * @param {string} table_to_query - The name of the desired MySQL table in the employees_db database
     */
    function get_table_data (table_to_query)
    {
        switch(table_to_query)
        {
            case 'employee':
                console.log('Querying employee table data...');
                // Preset Search Queries
                const sq_employee = 'employee.id, employee.first_name, employee.last_name';
                const sq_role = 'role.title, role.salary'

                employees_db.query(`SELECT ${sq_employee}, ${sq_role} FROM employee JOIN role ON employee.role_id = role.id`, (error, results) =>
                    {
                        error ? console.log(error) : console.table(results);
                    }
                );
                break;

            case 'role':
                
                break;

            case 'department':
                break;
        }
    }

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
            case 'View All Employees': get_table_data('employee'); break;
            case 'View All Roles': get_table_data('role'); break;
            case 'View All Departments': get_table_data('department'); break;

            // Options for Adding Data to Tables
            case 'Add Employee': qadd('employee'); break;
            case 'Add Role': qadd('role'); break;
            case 'Add Department': qadd('department'); break;

            // Option for Updating Employee Role
            case 'Update Employee Role': qupdateRole('employee'); break;
        }

        displayMenuOptions();
    });
}

displayMenuOptions();