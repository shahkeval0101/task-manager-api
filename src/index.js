const express = require('express')
const app = express()
require('./db/mongoose') // since we dont want any output we just want to ensure that node is connected to mongodb
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const auth = require('./middleware/auth')

const port = process.env.PORT


app.use(express.json())//parse incoming json as object so that we can directly use those object
app.use(userRouter)
app.use(taskRouter)



app.listen(port, ()=>{
    console.log("Server is up and running on " + port)
})




    