## Learning Procedure for the App
Initially run npm start. <br>
Then go to mongodb folder and run command .\mongodb\bin\mongod.exe --dbpath=mongodb-data. <br>
Go to mongodb compass and connect it. <br>
Get concepts cleared from the mongodb.js file where we are using native mongodb library and learning things from scratch. <br>
We will use mongoose because it has lot of advance features and it is easy to model and manage your application. <br>
Then we will understand callback, then replacement of callback i.e promise, then replacement of promise chaining that is async await. <br>
Learn about models. <br>
Learn about resource creation/finding/Update/Deleting for users and tasks along with middleware. <br>

Authentication --- most Important section.
1)Mongoose middleware - lifecycle event for your model
=> Hashing Password before save. <br>
2)To login - findByCredentials. <br>
3)toJson - to overwrite response. <br>
4)generateAuthToken. <br>
5)Creating Relationship between tasks and user. <br>


How to read the code. <br>
playground file for concept building on each one important are callback, promise, promise chaining, async and await. <br>
Go to index.js. <br>
mongodb.js. <br>
mongoose.js. <br>
Then router/user. <br> 
Then models/user. <br>
Then auth.js. <br>
Then router/tasks. <br>
then models/tasks. <br>



Testing. <br> 
Replace all the process.env with there original values of string. <br> 
generateAuthToken. <br>
mongoose.js. <br>
auth. <br>

Check how to create env for dev and prod in postman. <br>
Check how to set environment variable for authTOken. <br>
Check how to upload file in postman.
In postman => Body => Formdata => then dropdown select file.  <br>
Go to postman. <br>
Resource Creation. <br>
1) /users 
    - this is used for sign up of user to db, this will also generate authtoken

2) /users/login 
    - this will validate the user with username and password and then also generate authtoken and register the device.


3) /users/me - Read Profile - GET call
    - Gives User profile that is current logged in user


4) /users/me - Update Profile - Patch call
    - Updating user of logged in user

5) /users/me - Delete Profile - Delete call
    - Delete the user

6) /users/logout 62bd56dcf751e03680060afe
    - Logouts the current user by removing auth token from the list

7) /users/logoutAll
    - logouts all the user by setting auth token to empty
    - again login and new auth will be generated


8) /users/me/avatar - POST request
    - Upload the avatar to the postman

9) /users/me/avatar - Delete request
    - Delete the avatar to the postman

10) users/:id/avatar - GET request
    - GET the avatar of particular user id

Tasks. <br>
1) /tasks - POST method
    - to create a new task and for particular user and add it to db

2) /tasks - GET Method
    - fetches all the tasks created by user with pagination, filtering and sorting functionalities

3) /tasks/:id - GET method
    - fetches tasks of particular id

4) /tasks/:id - Patch method
    - Updates tasks of particular id

5) /tasks/:id - delete method
    - deletes task of particular id


## Running Flow
Open Postman. <br>
Take url from env. <br>
Add Request and take proper method get/post/patch/delete. <br>
Add body. <br>
Add authtoken. <br> 
add code in sign up/login to automate the authcode process. <br>
finally send the request. <br>
workflow of request to execute. <br>
1. Sign up. <br>
2. Login. <br>
3. Read profile. <br>
4. update the profile. <br>
5. add avatar. <br>
6. read the avatar of specific id of user. <br>
7. Create task. <br>
8. read all tasks of the user. <br>
9. read task of specific id. <br>
10. update task of specific id. <br>
11. delete task. <br>
12. delet avatar. <br>
13. delete user. <br>
14. logout. <br>
15. logout all user. <br>