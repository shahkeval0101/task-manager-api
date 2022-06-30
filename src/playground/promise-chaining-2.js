require('../db/mongoose')
const Task = require('../models/task')


///////////////////////////////////////////////
// Promise chaining is a syntax that allows you 
// to chain together multiple asynchronous tasks in a specific order. This is great for complex 
// code where one asynchronous task needs to be performed after the completion of a 
// different asynchronous task. 
//////////////////////////////////////////////

    // Task.findByIdAndDelete('62975733bee6031e50b0f038').then((task)=>{
    //     console.log(task)
    //     return Task.countDocuments({completed : false})
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{ 
    //     console.log(error)
    // })


const deleteTaskAndCount = async (id) =>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
    return count
}

deleteTaskAndCount('6297a8c2796cf1379cb5437f').then((count)=>{
    console.log("count",count)
}).catch((error)=>{
    console.log("Error", error)
})
