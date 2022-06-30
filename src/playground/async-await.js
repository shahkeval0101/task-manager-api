const add = (a,b)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      if(a<0 || b<0){
        return reject("Numbers should not be negative")
      }
      resolve(a+b)
    })
  })
}

//calling add multiple times
const doWork = async ()=>{
  // throw new Error("something went wrong")
  // return "Keval"
  
  //with await it is treated as standard sync function
  //code looks sync to perform async task
  const sum = await add(1,99)
  const sum2 = await add(sum,15)
  const sum3 = await add(sum2,3)
  return sum3
}

// console.log(doWork())//undefined
// console.log(doWork())//here dowork is returning promise and that promise is fulfilled with the value undefined
//async function always return promise and value is returned what we want to return 
//so it will be string fulfilled with value keval

doWork().then((result)=>{
  console.log("result",result)
}).catch((error)=>{
  console.log("error",error)
})
//If we throw error then catch will be called


//is advantageous over promise chaining
//also having values is same is difficult we cant have access hav all values