const pet = {
    'name':'hale'
}
console.log(JSON.stringify(pet))
pet.toJSON = function(){
    console.log(this)
    return this
}

//Whenever we send o/p to res.send it is implicitly calling json.stringify
//whenever we call json.stringify toJSON will be called and in that we can manipulate how we want to output and what we want to output