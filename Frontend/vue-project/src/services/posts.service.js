const login= (username, password)=>{
    return fetch("http://localhost:3333/login",
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            "username":username,
            "password":password
        })
    })
    .then(response=>{
        if(response.status===200){
            return response.json();

        }
        else if (response.status===400){
            throw "Wrong username or password entered, if not registered please go to the sign up page to register."
        }
        else {
            throw "Something went wrong"
        }
    })
    .then (responseJson=>{
        localStorage.setItem("user_id", responseJson.user_id);
        localStorage.setItem("session_token", responseJson.session_token);
        return responseJson
    })
    .catch(err=>{
        console.log(err);
        return Promise.reject(err);
    })
}

const signup=(firstname, lastname, username, password)=>{
     return fetch("http://localhost:3333/users",
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            "first_name":firstname,
            "last_name":lastname,
            "username":username,
            "password":password
        })
    })
    .then(response=>{
        if(response.status===201){
            return response.json();

        }
        else if (response.status===400){
            throw "Username already taken"
        }
        else {
            throw "Something went wrong"
        }
    })
   
    .catch(err=>{
        console.log(err);
        return Promise.reject(err);
    })
}
const logout= ()=>{
    return fetch("http://localhost:3333/logout",
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "X-Authorization":localStorage.getItem("session_token")
        }
       
    })
    .then(response=>{
        if(response.status===200){
            
            localStorage.clear("user_id");
            localStorage.clear("session_token");
            
            

        }
        else if (response.status===401){
            throw "User not logged in!!"
        }
        else {
            throw "Something went wrong"
        }
    })
    
    .catch(err=>{
        console.log(err);
        return Promise.reject(err);
    })
}
export const postService={
    login:login,
    signup:signup,
    logout:logout
}