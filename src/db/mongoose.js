const mongoose = require('mongoose')
// const validator = require('validator')

/////////////////////////////////////////////////
// Mongoose makes it easy to model and 
// manage your application data. This includes data sanitization, data validation, and more. 
// Mongoose will serve as a replacement for the native driver, providing you with a more 
// object-oriented interface. 
////////////////////////////////////////////////


// connect to the database similar to mongodb what we did
// process.env.MONGODB_URL
mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/task-manager-api",{
    useNewUrlParser : true,
    useCreateIndex: true, //when mongoose works with mongodb our index is created allowing us to access data we want to access
    useFindAndModify:false
}) 


// Create the model schema

    // const User = mongoose.model('User', { 
    //     name: { 
    //         type: String 
    //     }, 
    //     age: { 
    //         type: Number 
    //     } 
    // })

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