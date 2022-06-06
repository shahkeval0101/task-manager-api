//login auth
if(pm.response.code === 200){
    pm.environment.set('authToken', pm.response.json().token)
}

//create user auth
if(pm.response.code === 201){
    pm.environment.set('authToken', pm.response.json().token)
}
//will be there for both lsogin and signup(create user)
//pre-request-script - it is to run something before req 
//tests - to run something after response is received