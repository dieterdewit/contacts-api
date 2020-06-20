CREATE DATABASE contacts_management;

CREATE TABLE users (
    user_id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    token VARCHAR(100)
);

CREATE TABLE contacts (
    contact_id INT(12) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(6),
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(100),
    image_uri TEXT,
    updated_on DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE phones (
    phone_id INT(18) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    contact_id INT(12),
    phone_number TEXT NOT NULL,
    phone_tag VARCHAR(10),
    FOREIGN KEY (contact_id) REFERENCES contacts(contact_id)
);


