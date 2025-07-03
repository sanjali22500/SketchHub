--Creation of user table 
    CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(150),
    email VARCHAR(200) UNIQUE,
    PASSWORD VARCHAR(200),
    profile_pic VARCHAR(200),
    role ENUM('admin', 'user') DEFAULT 'user' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--Creation of images_path table  
 CREATE TABLE images_path(
    id INT AUTO_INCREMENT PRIMARY KEY,
    images_name VARCHAR(150),
    images_path VARCHAR(200) 
    );