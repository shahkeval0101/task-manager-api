const multer = require('multer')
//configure multer depending on our needs
const upload = multer({
    dest : 'images',
    limits :{
        fileSize:1000000, //1MB
    
    },
    fileFilter(req, file, cb){
        //use regex101.com
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('File must be word'))

        }


        cb(undefined, true)
        // cb(undefined, false)//reject upload
    }
})

//middleware from multer
app.post('/upload',upload.single('upload'),(req, res)=>{
    res.send()
},(error, req, res, next)=>{//error handling
    res.status(400).send({error:error.message})
})
//from postman
//add route, add body and in that add file,and key should be same as we put in upload.single()
