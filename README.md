# .env File

create `.env` file in the root directory and set your password in `###`

```
ENV = dev

POSTGRES_DRIVER = pg
POSTGRES_HOST=127.0.0.1
POSTGRES_DB = store
POSTGRES_DB_TEST = store_test
POSTGRES_USERNAME = postgres
POSTGRES_PASSWORD = ###

JWT_PASS = knock_knock_who_is_there
BCRYPT_PASSWORD = not_your_bug_fix
RETURN_TOKEN = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NTM0MjgwNzV9.CMpEGAa-zeFAOp5bNq7QlXyI3o4M75M9Hhp9vDrynxk
SALT_ROUNDS = 10
```

## Database

database connected on port `5432`

connect to postgres database, `###` is your username

```
psql -U ###
```

create `store` and `store_test` Database

```
CREATE DATABASE store; CREATE DATABASE store_test;
```

## start project

install dependencies

```
npm install
```

migrate the database

```
db-migrate up
```

start the serve

```
npm start
```

---
