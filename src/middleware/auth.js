const jwt = require('jsonwebtoken')
const User =  require('../models/user')
//This is express middleware
//This will be used to authenticate all incoming request are valid or not
//without middleware : new request => run route handler
//with middleware : new request => do something => run route handler
const auth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer','').trim()
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(token,decoded)

        const user = await User.findOne({_id: decoded._id, 'tokens.token' :  token  })//This finds the associate user
        if(!user){
            throw new Error()
        }
        // console.log("user from auth",user)
        req.token = token
        req.user = user
        next()

    }catch(error){
        console.log(error)
        res.status(401).send({error : "Please authenticate"})
    }
    
}
module.exports = auth