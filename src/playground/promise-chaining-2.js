require('../db/mongoose')
const Task = require('../models/task')


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
