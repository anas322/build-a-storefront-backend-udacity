import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  ENV,
} = process.env

const client = new Pool({
  host: POSTGRES_HOST,
  database: ENV == 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
})

ENV == 'dev'
  ? console.log('-------------------DEV-------------------')
  : console.log('-------------------TEST------------------')
export default client
