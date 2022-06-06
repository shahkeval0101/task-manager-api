const express = require('express')
const app = express()
app.use((req, res, next)=>{
    if(req.method === 'GET'){
        res.send("GET requests are disabled")
    }else{
        next()
    }
    console.log(req.method, req.path)
    next()
})

app.use((req, res, next)=>{
    res.status(503).send("Site is under maintainence")
})