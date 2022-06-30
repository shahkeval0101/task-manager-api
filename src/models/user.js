const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
const { json } = require('express')
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



//create the virtual relationship, it is not stored in database, it is relationship between two entities
userSchema.virtual('tasks', {
    ref : 'tasks',
    localField : '_id',//local data
    foreignField : 'owner'//name of the field on other collection
})//virtual relationship


/////////////////////////////////////////////

// JWTs provide a nice system for 
// issuing and validating authentication tokens. The authentication token will ensure that the 
// client doesn’t need to log in every time they want to perform an operation on the server. 

/////////////////////////////////////////////

//issue token on login and signup
//methods is accessible on instances, instance methods
userSchema.methods.generateAuthToken = async function(){
    const user = this
    // process.env.JWT_SECRET
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET || "thisismynewcourse" )//authentication token
    user.tokens = user.tokens.concat({ token })
    // we will add this new token object to the array of token object
    //so if we logout the corresponding token will be deleted 
    await user.save()
    return token

}

///////////////////////////////////////////////

// Whenever we are calling the res.send it internally call this methods to convert response to json,
// we are overwritting to customize the response

///////////////////////////////////////////////

userSchema.methods.toJSON = function(){ //delete function and created toJSON method
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens  
    delete userObject.avatar 
    return userObject
}

////////////////////////////////////////

// Logging in a user is a two-step process. The user provides their email and password, and 
// the first thing to do is fetch the user by their email. From there, bcrypt is used to verify the 
// password provided matches the hashed password stored in the database. If either step 
// fails, the users won’t be able to log in. If both steps succeed, then you know the user is 
// who they say they are. 

////////////////////////////////////////

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

///////////////////////////////////////////
//Mongoose Middleware 

// Middleware allows you to register some code to run before or after a lifecycle event for 
// your model. As an example, you could use middleware to register some code to run just 
// after a user is deleted. You could also use middleware to register some code to run just 
// before the user is saved. This can be used to hash passwords just before saving users to 
// the database. 

//////////////////////////////////////////

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


//Creates the model
//First Model - Basic Version
//This is the constructor function for the model
const User = mongoose.model('User',userSchema)


module.exports = User