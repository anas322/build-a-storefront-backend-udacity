import express from 'express'
import { routes } from './routes'

const app = express()
const port = 3000

app.use(express.json())

routes(app)

app.listen(port, () => {
  console.log('server working :)')
})

export default app
