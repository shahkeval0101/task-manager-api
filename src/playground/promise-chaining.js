require('../db/mongoose')
const User = require('../models/user')

//find the userid and update it to particular value and after that count number of instances of that value
//available in mongoose doc in api section in model
//with promise chaining


    // User.findByIdAndUpdate('62974e99aa06043444c40abc',{age : 1}).then((user)=>{
    //     console.log(user)
    //     return User.countDocuments({age : 1})
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(result)
    // })


//changing promise chaining to async and await
const updateAgeAndCount = async (id, age) =>{
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    return count
}
updateAgeAndCount('62974e99aa06043444c40abc',4).then((count)=>{
    console.log(count)
}).catch((error)=>{
    console.log(error)
})
