//CRUD Operations
// const mongodb = require('mongodb') //native driver used to connect mongodb to node
// const MongoClient =  mongodb.MongoClient //function necessary to connect to the database to perform crud operations
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')//destructuring directly

const connectionURL = "mongodb://127.0.0.1:27017" //local host slows down writing this ip works fine
const databaseName = "task-manager"//database name and can be any


// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client)=>{//connect to particular url and callback method
    if(error){
        return console.log("Unable to connect database")
    }
    // console.log("database connected successfully!")

    const db = client.db(databaseName)//name of the db you want to manipulate

//insert single document in users collection
//db.collection is used to get a reference to the collection you are tyring to manipulate   
   
    // db.collection('users').insertOne({
    //     _id:id,
    //     name:'Vikram',
    //     age:33
    // },(error, result)=>{
    //     if(error){
    //         return console.log("unable to insert user")
    //     }
    //     console.log(result.ops, result.insertedCount)//array of document
    // })



//Insert Many

    // db.collection('users').insertMany([
    //     {
    //         name:'Jen',
    //         age:29
    //     },
    //     {
    //         name:'Gunter',
    //         age:30
    //     }
    // ],(error, result)=>{
    //     if(error){
    //         return console.log("Unable to Insert")
    //     }
    //     console.log(result.ops)

    // })



//Task Collection

    // db.collection('tasks').insertMany([
    //     {
    //         description:'Task 1',
    //         completed:true
    //     },
    //     {
    //         description:'Task 2',
    //         completed:false
    //     },
    //     {
    //         description:'Task 3',
    //         completed:false
    //     }

    // ],(error, result)=>{
    //     if(error){
    //         return console.log("Unable to Insert tasks")
    //     }
    //     console.log(result.ops)
    // })


//Fetching Data

//Single document Find

    // db.collection('users').findOne({_id : new ObjectID("629663f9094c150858547f53")},(error, user)=>{
    //     if(error){
    //         return console.log("Unable to Fetch")
    //     }
    //     console.log(user)

    // })


//Multiple document 

    // db.collection('users').find({age : 23}).toArray((error, users)=>{
    //     console.log(users)
    // })

    // db.collection('users').find({age : 23}).count((error, count)=>{
    //     console.log(count)
    // })

//Find For Tasks collection

//Find all the incompleted task in the collection
    
    // db.collection('tasks').find({completed : false}).toArray((error, tasks)=>{
    //     if(error){
    //         return console.log("Unable to Fetch ")
    //     }
    //     console.log(tasks)
    // })

//Find the last task by its id

    // db.collection('tasks').findOne({ _id : new ObjectID("629660749b64f53324713d42")}, (error , task)=>{
    //     if(error){
    //         return console.log("Unable to Fetch")
    //     }
    //     console.log(task)
    // })

//Updating document

////////////////////////////////////////////////
// Promises provide a much needed 
// alternative to the traditional callback pattern.     
////////////////////////////////////////////////

    //Updating Name
    // $set    Sets the value of a field in a document.
    
    // db.collection('users').updateOne({ _id : new ObjectID("6296574fe3f40d1370164e0d")}, {
    //     $set:{//update the value
    //         name : "Mike"
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    //Incrementing age with specific value

    // $inc = Increments the value of the field by the specified amount.

    // db.collection('users').updateOne({ _id : new ObjectID("6296574fe3f40d1370164e0d")}, {
    //     $inc:{//update the value
    //         age : 1 //incrementing value by one
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

//Update Operators 
    
    //Update Many
    // db.collection('tasks').updateMany({completed : false},
    //     {
    //         $set:{
    //             completed:true
    //         }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })



//Delete Operators

    //deleteMany
    //     db.collection('users').deleteMany({age:23}).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    //delete one 
    db.collection('tasks').deleteOne({description : "Task 1"}).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })



})
