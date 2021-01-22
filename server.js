const mysql = require("mysql");
const inquirer = require('inquirer');
const { start } = require("repl");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start()
});

// Start Function -----------------------------------------------
function start() {
    inquirer.prompt([
        {
            name: "options",
            message: "What would you like to do?",
            type: "list",
            choices: ["Create", "View", "Delete"]
        }
    ]).then(answer => {
        switch (answer) {
            case "Create":
                createOption()
                break;
            case "View":
                viewOptions()
                break;
            case "Delete":
                deleteOptions()
                break;
            default:
                console.log("Something went wrong, please reload application")
        }
    });
}

// --------------------------------------------------------------


// Create Functions ---------------------------------------------

function createOption() {
    inquirer.prompt([
        {
            name: "options",
            message: "What would you like to create?",
            type: "list",
            choices: ["Department", "Role", "Employee"]
        }
    ]).then(answer => {
        switch (answer) {
            case "Department":
                createDept()
                break;
            case "Role":
                createRole()
                break;
            case "Employee":
                createEmployee()
                break;
            default:
                console.log("Something went wrong, please reload application")
        }
    });
}

function createDept() {
    inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "Which department is the employee in?"
        }
    ]).then(answer => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.deptName
            },
            (err) => {
                if (err) throw err;
                console.log("department created!")
                start()
            }
        );
    });
};

function createRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the employee's title?"
        },
        {
            type: "number",
            name: "salary",
            message: "What is the employee's salary?"
        }
    ]).then(answer => {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary
            },
            (err) => {
                if (err) throw err;
                console.log("role created!")
                start()
            }
        );
    });
};

function createEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the employee's title?"
        },
        {
            type: "number",
            name: "salary",
            message: "What is the employee's salary?"
        },
    ]).then(answer => {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary
            },
            (err) => {
                if (err) throw err;
                console.log("role created!")
                start()
            }
        );
    });
};


// ---------------------------------------------------------



// View Functions ------------------------------------------



function viewOptions() {
    inquirer.prompt([
        {
            name: "options",
            message: "What would you like to view?",
            type: "list",
            choices: ["Departments", "Roles", "Employees"]
        }
    ]).then(answer => {
        switch (answer) {
            case "Departments":
                viewDept()
                break;
            case "Roles":
                viewRole()
                break;
            case "Employees":
                viewEmployee()
                break;
            default:
                console.log("Something went wrong, please reload application")
        }
    });
};



function viewDept() {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res)
    })
};

function viewRole() {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res)
    })
};

function viewEmployee() {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.table(res)
    })
}
// -------------------------------------------------------------------




// Delete Functions ---------------------------------------------------

function deleteOptions() {
    inquirer.prompt([
        {
            name: "options",
            message: "What would you like to Delete?",
            type: "list",
            choices: ["Department", "Role", "Employee"]
        }
    ]).then(answer => {
        switch (answer) {
            case "Department":
                deleteDept()
                break;
            case "Role":
                deleteRole()
                break;
            case "Employee":
                deleteEmployee()
                break;
            default:
                console.log("Something went wrong, please reload application")
        }
    });
};

function deleteDept() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;

        const nameOfDept = res.map(dept => ({ name: dept.name, value: dept.id }))
        inquirer.prompt([
            {
                type: "list",
                message: "Which item would you like to bid on?",
                name: "deptName",
                choices: nameOfDept
            },
        ]).then(data => {
            connection.query("DELETE FROM department WHERE id = ?", [data.deptName] , (err) => {
                if (err) {
                    throw err;
                }
                console.log("succesfully deleted!")
            })
        })
    });
};

function deleteRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;

        const nameOfRole = res.map(role => ({ name: role.name, value: role.id }))
        inquirer.prompt([
            {
                type: "list",
                message: "Which item would you like to bid on?",
                name: "roleName",
                choices: nameOfRole
            },
        ]).then(data => {
            connection.query("DELETE FROM role WHERE id = ?", [data.roleName] , (err) => {
                if (err) {
                    throw err;
                }
                console.log("succesfully deleted!")
            })
        })
    });
};

function deleteEmployee() {
    connection.query("SELECT * FROM ", function (err, res) {
        if (err) throw err;

        const nameOfEmp = res.map(emp => ({ name: emp.name, value: emp.id }))
        inquirer.prompt([
            {
                type: "list",
                message: "Which item would you like to bid on?",
                name: "empName",
                choices: nameOfEmp
            },
        ]).then(data => {
            connection.query("DELETE FROM employee WHERE id = ?", [data.empName], (err) => {
                if (err) {
                    throw err;
                }
                console.log("succesfully deleted!")
            })
        })
    });
};