const mysql = require("mysql");
const inquirer = require('inquirer');

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
    createDept()
});

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
            (err, data) => {
                if (err) throw err;
                console.log("department created!")
                createRole()
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
                title: answer.title
                salary: answer.salary
            },
            (err, data) => {
                if (err) throw err;
                console.log("role created!")
            }
        );
    });
};