CREATE TYPE mood AS ENUM ('active','complete');

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    status mood NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE 
);

-- INSERT INTO orders(user_id,status) VALUES (1,'active'),(1,'complete');