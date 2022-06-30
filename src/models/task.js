const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
        description:{
            type : String,
            trim : true,
            required : true,
        },
        completed : {
            type : Boolean,
            default : false
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            require : true,
            ref : 'User'//model name to create the relationship, indvidual task will store  the id  of  the user created
            //create ref from this field to another model
            //Now we can fetch the entire user whenever we hav access to individual task
        }
    },{
        timestamps : true
    })

//Task Collections
const Tasks = mongoose.model('tasks',taskSchema)

module.exports = Tasks