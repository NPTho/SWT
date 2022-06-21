const express = require('express')
require('./db/mongoose') //connect to database
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if(req.method==='GET'){
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req,res,next) => {
//     res.status(503).send("Site is currently down. Check back soon!")
// })

app.use(express.json()) //convert post data to json
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ', port)
})

// const main = async () => {
// //   const task = await Task.findById("62ab379adb39d329dfd1d724")
// //   await task.populate('owner')
// //   console.log(task.owner)

//     const user= await User.findById("62ab36a1c7e5a4284e336107")
//     await user.populate('tasks')
//     console.log(user.name, user.tasks)
// }

// main()

module.exports = app
