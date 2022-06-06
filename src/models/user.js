const { next } = require('mongodb/lib/operations/cursor_ops')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
//middleware is the way to customize the mongoose model
//We can register the function before or after the events occur
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        //minlength : 7
        validate(value){
            if(value.length < 6){
                throw new Error("Length should be greater than 6")
            }
            else if(value.toLowerCase().includes("password")){
                throw new Error("password cannot string 'password'")
            }
        }
    },
    age : {
        type: Number,
        default : 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be positive number')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }],
    avatar :{
        type : Buffer
    }
},{
    timestamps:true
}) //pass the model

//First Model - Basic Version
//This is the constructor function for the model

//create the virtual relationship, it is not stored in database, it is relationship between two entities
userSchema.virtual('tasks', {
    ref : 'tasks',
    localField : '_id',//local data
    foreignField : 'owner'//name of the field on other collection
})//virtual relationship


//methods is accessible on instances, instance methods
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)//authentication token
    
    user.tokens = user.tokens.concat({ token })
    await user.save()
    
    return token

}

userSchema.methods.toJSON = function(){ //delete function and created toJSON method
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens  
    delete userObject.avatar 
    return userObject
}


//set a reusable function on statics, it is accessible on model, called model methods
userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})
    // console.log("user from login",user)
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}


//using middleware, this is hook function that we want to run before or after some event, in ourcase it is save event
userSchema.pre('save', async function(next){//here we have this binding and so we cannot use arrow function
    const user = this //this gives access to the user we want to save

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next() // to know the end of the asynchronous function
})

//Delete user tasks when user is removed
userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({owner : user._id})
    next()
})



const User = mongoose.model('User',userSchema)


module.exports = User