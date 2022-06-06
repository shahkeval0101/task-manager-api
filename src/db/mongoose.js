const { mongo } = require('mongoose')
const mongoose = require('mongoose')
// const validator = require('validator')

// connect to the database similar to mongodb what we did
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser : true,
    useCreateIndex: true, //when mongoose works with mongodb our index is created allowing us to access data we want to access
    useFindAndModify:false
}) 



// create instance of the model and create document

    // const me = new User({
    //     name : '        Amit ',
    //     age : 29,
    //     email : "mike@gmail.cOM",
    //     password : "            amit#12345"
    // })


// to save we will use methods on the instance
    // me.save().then(()=>{
    //     console.log(me)
    // }).catch((error)=>{
    //     console.log(error)
    // })


//creating task instance 

    // const task = new Tasks({
    //     description : "Task3                ",
    //     completed : true
    // })
    // task.save().then(()=>{
    //     console.log(task)
    // }).catch((error)=>{
    //     console.log(error)
    // })