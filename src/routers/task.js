const express = require('express')
const router = new  express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')
const Tasks = require('../models/task')

//create new task
router.post('/tasks', auth ,async (req, res)=>{
    // const task = new Task(req.body)
    //Initially authenticated and then returned user, now we will create new obj with req.body and add owner variable
    const task = new Task({
        ...req.body,
        owner : req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(error){
        res.status(400).send(error)
    }
})

//get the array of the documents
//GET /tasks?completed=false/true ... filter
//limit skip...pagination
// /tasks?limit=10&skip=0 ==first page
// /tasks?limit=10&skip=10 ==second page, will page skip first 10 and show next 10
// /tasks?limit=2&skip=0 first two task
// /tasks?limit=2&skip=1 two task and skip first two
// GET /tasks?sortBy=createdAt_desc/asc

router.get('/tasks', auth, async(req, res)=>{
    const match = {}
    if(req.query.completed){
        match.completed = req.query.completed==="true"?true:false //as this is a string value so we will have to set it manually
    }

    const sort = {}
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc'?-1:1
    }
        try{
        // const tasks = await Task.find({ owner : req.user._id})
        // await req.user.populate('tasks').execPopulate()
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit : parseInt(req.query.limit),//if isnt provided or wrong thing and ignored by mongoose
                skip : parseInt(req.query.skip),
                sort 
            }
        }).execPopulate()
        res.send(req.user.tasks)

    }catch(error){
        res.status(500).send()
    }
})

router.get('/tasks/:id',auth, async(req, res)=>{
    const _id = req.params.id
    console.log(_id)
    try{
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner : req.user._id})
        if(!task){
            return res.status(404).send({error : "Error"})
        }
        res.send(task)
    }catch(error){
        console.log(error)
        res.status(500).send()
    }

})


router.patch('/tasks/:id', auth, async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description","completed"]
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({error : "Invalid Updates"})
    }

    try{
        const task = await Task.findOne({ _id : req.params.id, owner : req.user._id})
        // const task = await Task.findById(req.params.id)

       

        // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new : true, runValidators : true})//will return new user
        
        if(!task){
            return res.status(404).send({error : "Error"})
        }
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save()
        res.send(task)

    }catch(error){
        console.log(error)
        res.status(400).send(error) 
    }
})


router.delete('/tasks/:id', auth, async (req, res)=>{
    // findbyidanddelete
    try{
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id: req.params.id, owner : req.user._id})
        if(!task){
            return res.status(404).send({error : "Error"})
        }
        res.send(task)
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
})
module.exports = router