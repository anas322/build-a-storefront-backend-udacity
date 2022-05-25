CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    password VARCHAR NOT NULL
);


INSERT INTO users(username,firstname,lastname,password) values ('user1','test','test','password'),('user2','test','test','password');