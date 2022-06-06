const bcrypt = require('bcryptjs')
//keval -> jajflkalf -> keval ====Encryption algorithm can be brought to original
//keval ->jajflkalf ====hashing algorithm cannot be reversed
const myFunction = async ()=>{
    const password = 'Keval#123'
    const hashedPassword = await bcrypt.hash(password, 8)//how many time algorithm is runned, it strikes balance between security and speed
    console.log(password, hashedPassword)

    const isMatch = await bcrypt.compare("Keval#123", hashedPassword) //returning promise so await
    console.log(isMatch)

}
myFunction()