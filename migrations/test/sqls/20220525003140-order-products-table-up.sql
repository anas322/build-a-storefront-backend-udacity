CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    order_id   INTEGER NOT NULL REFERENCES orders (id),
    product_id INTEGER NOT NULL REFERENCES products (id),
    quantity   INTEGER NOT NULL
);

INSERT INTO order_products(order_id,product_id,quantity) VALUES (1,1,5),(2,1,5);