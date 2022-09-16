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
        let parsedRoles = { titles: [] };

        // Save all titles in their own array in the 'titles' property, and use that title as a key for its associated ID
        for (let i = 0 ; i < roles.length ; i++)
        {
            let role_title = roles[i].title;

            parsedRoles.titles[i] = role_title;
            parsedRoles[role_title] = roles[i].id;
        }

        return parsedRoles;
    }

    return new Promise( (resolve, reject) =>
    {
        employees_db.query(`SELECT title, id FROM role`, (error, results) =>
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

function get_managers()
{
    function parseManagersArray(managers)
    {
        let parsedManagers = { managers: [] };

        // Combine first and last name for managers, and use their resultant full name as the key to access their ID
        for (let i = 0 ; i < managers.length ; i++)
        {
            let full_name = `${managers[i].first_name} ${managers[i].last_name}`;
            
            parsedManagers.managers[i] = full_name;
            parsedManagers[full_name] = managers[i].id;
        }

        return parsedManagers;
    }

    return new Promise( (resolve, reject) =>
    {
        employees_db.query(`SELECT first_name, last_name, id FROM employee WHERE manager_id IS NULL`, (error, results) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }

                console.log(results);
                return resolve(parseManagersArray(results));
            }
        );
    });
}

function get_employees()
{
    function parseEmployeesArray(employees)
    {
        let parsedEmployees = { employees: [] };

        // Combine first and last name for managers, and use their resultant full name as the key to access their ID
        for (let i = 0 ; i < employees.length ; i++)
        {
            let full_name = `${employees[i].first_name} ${employees[i].last_name}`;
            
            parsedEmployees.employees[i] = full_name;
            parsedEmployees[full_name] = employees[i].id;
        }

        return parsedEmployees;
    }

    return new Promise( (resolve, reject) =>
    {
        employees_db.query(`SELECT first_name, last_name, id FROM employee`, (error, results) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }

                console.log(results);
                return resolve(parseEmployeesArray(results));
            }
        );
    });
}

function get_departments()
{
    function parseDepartmentArray(departments)
    {
        let parsedDepartments = { names: [] };

        // Save all department names in their own array in the 'names' property, and use that name as a key for its associated ID
        for (let i = 0 ; i < departments.length ; i++)
        {
            let department_name = departments[i].name;

            parsedDepartments.names[i] = department_name;
            parsedDepartments[department_name] = departments[i].id;
        }

        return parsedDepartments;
    }

    return new Promise( (resolve, reject) =>
    {
        employees_db.query(`SELECT name, id FROM department`, (error, results) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }

                console.log(results);
                return resolve(parseDepartmentArray(results));
            }
        );
    });
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
            const { first_name, last_name, role_id, manager_id } = data;
            const INSERT_INTO_employee = 'INSERT INTO employee (first_name, last_name, role_id, manager_id)';
            const employee_VALUES_TO_INSERT = `VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id});`;

            return new Promise( (resolve, reject) =>
            {
                employees_db.query(`${INSERT_INTO_employee} ${employee_VALUES_TO_INSERT}`, (error, results) =>
                    {
                        if (error) 
                        {
                            console.log(error);
                            return reject(error);
                        }

                        console.log(`${first_name} ${last_name} was successfully added.`);
                        return resolve(results);
                    }
                );
            });

        case 'role':
            const { title, salary, department_id } = data;
            const INSERT_INTO_role = 'INSERT INTO role (title, salary, department_id)';
            const role_VALUES_TO_INSERT = `VALUES ('${title}', ${salary}, ${department_id});`;

            return new Promise( (resolve, reject) =>
            {
                employees_db.query(`${INSERT_INTO_role} ${role_VALUES_TO_INSERT}`, (error, results) =>
                    {
                        if (error) 
                        {
                            console.log(error);
                            return reject(error);
                        }

                        console.log(`The ${title} role was successfully added.`);
                        return resolve(results);
                    }
                );
            });

        case 'department':
            const { name } = data;

            return new Promise( (resolve, reject) =>
            {
                employees_db.query(`INSERT INTO department (name) VALUES ('${name}')`, (error, results) =>
                    {
                        if (error) 
                        {
                            console.log(error);
                            return reject(error);
                        }

                        console.log(`The ${name} Department was successfully added.`);
                        return resolve(results);
                    }
                );
            });
    }
}

function qupdateRole(data)
{
    const { employee_id, role_id, manager_id } = data;
    const UPDATE_employee = `UPDATE employee`;
    const SET_employee = `SET role_id = ${role_id}, manager_id = ${manager_id}`;
    const WHERE_employee = `WHERE id = ${employee_id}`;

    return new Promise( (resolve, reject) =>
    {
        employees_db.query(`${UPDATE_employee} ${SET_employee} ${WHERE_employee}`, (error, results) =>
            {
                if (error) 
                {
                    console.log(error);
                    return reject(error);
                }

                console.log(`${data.employee} was successfully updated.`);
                return resolve(results);
            }
        );
    });
}

module.exports = { get_table_data, qadd, qupdateRole, get_role_titles, get_managers, get_employees, get_departments };