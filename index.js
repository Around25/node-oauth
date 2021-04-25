const express = require('express')
const bodyParser = require('body-parser')
const { promisify } = require('util')
require('dotenv').config()

const authMiddleware = require('./auth')
const app = express()

app.use(bodyParser.json())
app.use(authMiddleware)

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

const startServer = async () => {
  const port = process.env.SERVER_PORT || 8080
  await promisify(app.listen).bind(app)(port)
  console.log(`Listening on port ${port}`)
}

startServer()