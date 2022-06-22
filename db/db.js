const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('../src/routers/user')
const taskRouter = require('../src/routers/task')
const app = express()
const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api-for-test')

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


app.listen(port, () => {
    console.log('Server is up on port ', port)
})

module.exports = app

//--reporter mochawesome