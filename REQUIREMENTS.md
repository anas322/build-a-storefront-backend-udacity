# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: `'products/' [GET]`
- Show: `'products/:id' [GET]`
- [OPTIONAL] Products by category: `'/products/category/:cat' [GET]`
- Create (args: Product)[token required]: `'/products' [POST] (token)`
- [additional] Delete: `'/products/:name [DELETE]`

#### Users

- Index [token required]: `'/users' [GET] `
- Show [token required]: `'/users/:id' [GET] `
- Create (args: User): `'/users' [POST] `
- [additional] Delete [token required]: `'/users/:username' [DELETE] `

#### Orders

- Index [token required]: `'/orders/:id' [GET] `
- Current Order by user [token required]: `'/orders/user/:id/current' [GET] `
- [OPTIONAL] Completed Orders by user [token required]: `'/orders/user/:id/complete' [GET] `
- Create (args: Order): `'/orders/create' [POST] `
- [additional] Delete [token required]: `'/orders/:order_id/delete' [DELETE] `

## Data Shapes

#### Product

Table: _products_

- id `SERIAL PRIMARY KEY`
- name `VARCHAR`
- price `INTEGER`

#### User

Table: _users_

- id `SERIAL PRIMARY KEY`
- username `VARCHAR`
- firstname `VARCHAR`
- lastname `VARCHAR`
- password `VARCHAR`

#### Orders

Table: _orders_

- id `SERIAL PRIMARY KEY`
- user_id `INTEGER` `REFERENCES users(id)`
- status `BOOLEAN`

Table: _order_products_

- order_id `INTEGER` `REFERENCES orders(id)`
- product_id `INTEGER` `REFERENCES products(id)`
- quantity `INTEGER`
