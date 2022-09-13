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
                console.log('Querying employee table data...\n');
                // Preset Search Queries
                const sq_employee = 'employee.id, employee.first_name, employee.last_name';
                const sq_role = 'role.title, role.salary';
                const jq_role = 'JOIN role ON employee.role_id = role.id';
                const jq_department = 'JOIN department ON role.department_id = department.id';

                employees_db.query(`SELECT ${sq_employee}, ${sq_role} FROM employee ${jq_role} ${jq_department}`, (error, results) =>
                    {
                        error ? console.log(error) : console.table(results);
                    }
                );
                break;

            case 'role':
                console.log('Querying role table data...\n');

                employees_db.query(`SELECT id, title, salary FROM role`, (error, results) =>
                    {
                        error ? console.log(error) : console.table(results);
                    }
                );
                break;

            case 'department':
                console.log('Querying department table data...\n');

                employees_db.query(`SELECT id, name FROM department`, (error, results) =>
                    {
                        error ? console.log(error) : console.table(results);
                    }
                );
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
    });
}

displayMenuOptions();