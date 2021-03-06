DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL(10,4),
    department_id SMALLINT UNSIGNED NULL REFERENCES department(id),
    manager_id SMALLINT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(255),
    role_id SMALLINT UNSIGNED NULL REFERENCES role(id),
    manager_id INT,
    PRIMARY KEY (id)
);