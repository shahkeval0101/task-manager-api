const jwt = require('jsonwebtoken')

const myFunction = async ()=>{
    //token consists to two parts separated by period
    //first part is base64 encoded information about the type of token used, second part is encode id we provided and timestamp third is sign
    const token = jwt.sign({_id:'abc123'}, process.env.JWT_SECRET,{expiresIn:'7 days'})//authentication token
    console.log(token)

    const data = jwt.verify(token, process.env.JWT_SECRET)
    console.log(data)
}
myFunction()