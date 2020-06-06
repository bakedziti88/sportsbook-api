const express = require('express')
const booksRouter = require('./controllers/booksRouter')
const sportsRouter = require('./controllers/sportsRouter')
const router = require('./controllers/router')

const middleware = require('./utils/middleware')

const app = express()

app.use(express.json())
app.use('/api', router)
//app.use('/api/:book', sportsRouter)

app.use(middleware.unknownEndpoint)

module.exports = app