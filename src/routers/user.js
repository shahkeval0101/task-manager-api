const express = require('express')
const router = new  express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
router.get('/test',(req, res)=>{
    res.send('From a new file')
})

//resource creation
//sign up
router.post('/users',async (req, res)=>{
    console.log("Body",req.body) // incoming body data should be accessible
    const user = new User(req.body) //creating instance
    
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(error){
        console.log("Error",error)
        res.status(400).send({error})
    }
    
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((error)=>{
    //     console.log(error)
    //     res.status(400).send(error)
    // })
})

router.post('/users/login',async (req, res)=>{
    try{
        console.log(req.body.email, req.body.password)    
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})

router.post('/users/logout',auth,async (req, res)=>{
    try{
        req.user.tokens= req.user.tokens.filter((token)=>{//filtering out all the token except the one which is there in req.token
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    }catch(error){
        console.log(error)
        res.status(500).send()        
    }
})

router.post('/users/logoutAll', auth, async (req, res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(error){
        console.log(error)
        res.status(500).send()
    }
})

//Here we are using mongoose and it is similar to mongodb, go to queries part in mongoose documentation

//model.find
router.get('/users/me' ,auth,async (req, res)=>{
    res.send(req.user)
    // try{
       
    //     const users = await User.find({})
    //     res.status(200).send(users)
    // }catch(error){
    //     res.status(500).send({error:error})
    // }

    // User.find({}).then((users)=>{
    //     res.status(200).send(users)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
})

const upload = multer({
    // dest : 'avatars',
    limits :{
        fileSize:1000000, //1MB
    
    },
    fileFilter(req, file, cb){
        //use regex101.com
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('File must be jpg, jpeg or png type'))

        }


        cb(undefined, true)
        // cb(undefined, false)//reject upload
    }
})

//authenticating before we allow to upload
router.post('/users/me/avatar',auth ,upload.single('avatar') ,async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width : 250, height : 250}).png().toBuffer()
    req.user.avatar = buffer // we can access only if we dont hav dest options and this variable will give access to the file uploaded
    await req.user.save()
    res.send()
},(error, req, res, next)=>{//error callback
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar',auth, async (req, res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', auth, async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        console.log("user",user)
        if(!user || !user.avatar){
            throw new Error("No user or No avatars exists")
        }
        res.contentType('image/png')
        res.end(user.avatar,"binary")
        res.send(user.avatar)
    }catch(error){
        console.log("Error",error)
        res.status(404).send()
    }
})

// model.findOne
// router.get('/users/:id',async (req, res)=>{
//     console.log(req.params)// gives access all the route paramaters we have provided
//     const _id = req.params.id
//     try{
//         // console.log("from update")    
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send({error : "Error"})
//         }
//         res.send(user)
//     }catch(error){
//         console.log(error)
//         res.status(500).send()
//     }
//     // User.findById(_id).then((user)=>{//no need to convert those string id into objectID mongoose does it for us
//     //     if(!user){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch((error)=>{
//     //     res.status(500).send()
//     // })
// })

router.patch('/users/me', auth,async (req, res)=>{
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({error : "Invalid Updates"})
    }
    
    //FindByIdAndUpdate
    //It bypasses mongoose and performs direct operation on database
    try{
        // const user = await User.findById(req.params.id)
        updates.forEach((update)=>{
            req.user[update] = req.body[update] //updating each value here to new value
        })
        // console.log("user from update",user)
        await req.user.save()
        
        // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new : true, runValidators : true})//will return new user
        // if(!user){
        //     return res.status(404).send({error : "Error"})
        // }
        res.send(req.user)

    }catch(error){
        console.log("error",error)
        res.status(400).send(error)// validation related issue
    }
})

router.delete('/users/me', auth, async (req, res)=>{
    // findbyidanddelete
    try{
        // const user = await User.findByIdAndDelete(req.params.id)
        
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send({error : "Error"})
        // }
        
        await req.user.remove()
        res.send(req.user)
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
})



module.exports = router