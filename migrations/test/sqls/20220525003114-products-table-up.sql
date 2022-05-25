CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL NOT NULL,
    category VARCHAR(100) NOT NULL
);

INSERT INTO products(name,price,category) values ('cherry','40','fruits'),('tomatto','50','vegetables'),('watermelon','60','vegetables');