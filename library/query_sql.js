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

/**
  * Displays the results of the query to the console
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

            return new Promise( (resolve, reject) =>
            {
                employees_db.query(`SELECT ${sq_employee}, ${sq_role} FROM employee ${jq_role} ${jq_department}`, (error, results) =>
                    {
                        if (error) 
                        {
                            console.log(error);
                            return reject(error);
                        }

                        console.log(results);
                        return resolve(results);
                    }
                );
            });

        case 'role':
            console.log('Querying role table data...\n');

            return new Promise( (resolve, reject) =>
            {
                employees_db.query(`SELECT id, title, salary FROM role`, (error, results) =>
                    {
                        if (error) 
                        {
                            console.log(error);
                            return reject(error);
                        }

                        console.log(results);
                        return resolve(results);
                    }
                );
            });

        case 'department':
            console.log('Querying department table data...\n');

            return new Promise( (resolve, reject) =>
            {
                employees_db.query(`SELECT id, name FROM department`, (error, results) =>
                    {
                        if (error) 
                        {
                            console.log(error);
                            return reject(error);
                        }

                        console.log(results);
                        return resolve(results);
                    }
                );
            });
    }
}

function get_role_titles()
{
    function parseRoleArray(roles)
    {
        let parsedRoles = [];

        for (let i = 0 ; i < roles.length ; i++)
        {
            parsedRoles[i] = roles[i].title;
        }

        return parsedRoles;
    }

    return new Promise( (resolve, reject) =>
    {
        employees_db.query(`SELECT title FROM role`, (error, results) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }

                console.log(results);
                return resolve(parseRoleArray(results));
            }
        );
    });
}

function get_departments()
{

}

/**
  * Adds a new data entry to a selected table
  * @param {string} table_to_query - The name of the desired MySQL table in the employees_db database
  * @param {Object} data - The data to be added to the desired table, contained within an object
  */
function qadd(table_to_query, data)
{
    switch(table_to_query)
    {
        case 'employee':
            const { first_name, last_name, title, manager_fname, manager_lname } = data;

            // Query for the Role ID based on the response given
            employees_db.query(`SELECT id FROM role WHERE title = '${title}'; SELECT id FROM employee WHERE first_name = '${manager_fname}' AND last_name = '${manager_lname}'`, (error, results) =>
                {
                    error ? console.log(error) : () =>
                    {
                        role_id = results[0].id;
                    }
                }
            );

            console.log(role_id);
            // employees_db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)`, (error, results) =>
            //     {
            //         error ? console.log(error) : console.table(results);
            //     }
            // );
            break;

        case 'role':
            employees_db.query(`SELECT id, title, salary FROM role`, (error, results) =>
                {
                    error ? console.log(error) : console.table(results);
                }
            );
            break;

        case 'department':
            const { name } = data;

            employees_db.query(`INSERT INTO department (name) VALUES ('${name}')`, (error, results) =>
                {
                    error ? console.log(error) : console.log(`The ${name} Department was successfully added.`);
                }
            );
            break;
    }
}

module.exports = { get_table_data, qadd, get_role_titles };