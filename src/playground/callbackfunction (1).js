//asynchronous fn
// setTimeout(()=>{
//   console.log("After Two Seconds")
// },2000)

//synchronous fun
// const names = ["keval","shah","lodaria"]
// const shortNames = names.filter((name)=>name.length>4)
// console.log(shortNames)

// const geocode = (address, callback)=>{
//   const data = {
//     latitude : 0,
//     longitude : 0
//   }
//   return data
// }
// const data = geocode("angeles")
// console.log(data)

// will return fine as no asynchronous call is there inside the callback fun

//simulating asynchronous call
// const geocode = (address, callback)=>{
//   setTimeout(()=>{
//     const data = {
//     latitude : 0,
//     longitude : 0
//   }
//   return data
//   },2000)
  
// }
// const data = geocode("angeles")
// console.log(data) 

// return undefined because it wont wait to complete it
//asynchronous callback function wont be executed before callstack is empty
//return doesnt work if we do asynchronous work inside our functions

//making it work
// const geocode = (address, callback)=>{
//   setTimeout(()=>{
//     const data = {
//     latitude : 0,
//     longitude : 0
//   }
//   callback(data)
//   },2000)
  
// }
// geocode("angeles",(data)=>{
//   console.log(data)
// })
//Once our functions starts doing asynchronous things no longer returns works, we take callback in, we call the callback with the values we want to send thus use it later
//This accomplishes same goal as return in synchronous function




// links.meads.io/callback
//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (a,b,callback)=>{
  setTimeout(()=>{
    callback(a+b)
  },2000)
}


add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})

