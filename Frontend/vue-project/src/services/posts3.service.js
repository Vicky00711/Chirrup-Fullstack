

const search=(params)=>{
          return fetch(`http://localhost:3333/search?q=` + params)
    
    .then((response)=>{
        if(response.status===200){
            return response.json();
        }
        else if(response.status===400){
            throw "Bad request"
        }
        else {
            throw "Seomething went wrong"
        }
    })
    .then ((resJson)=>{
        return resJson
        
    })
    .catch((error)=>{
        console.log(error)
        return Promise.reject(error)
    })
}

const getSingleUser=(user_id)=>{
    return fetch (`http://localhost:3333/users/` + user_id,{
        headers:{
             "Content-Type":"application/json",
            "X-Authorization":localStorage.getItem("session_token")
        }
    })
    .then((response)=>{
        if(response.status===200){
            return response.json();
        }
        else if(response.status===404){
            throw "User not found"
        }
        else {
            throw "Seomething went wrong"
        }
    })
    .then ((resJson)=>{
        return resJson
        
    })
    .catch((error)=>{
        console.log(error)
        return Promise.reject(error)
    })
}

const followsomeone= (id)=>{
     return fetch (`http://localhost:3333/users/` + id + `/follow`,{
        method:"POST",
        headers:{
             "Content-Type":"application/json",
            "X-Authorization":localStorage.getItem("session_token")
        }
    })
    .then((response)=>{
        if(response.status===200){
            return 
        }
        else if (response.status===403){
            
           throw "Already following this user"
        }
       else if (response.status===404){
           throw "User not found"
        }
        else if(response.status===401){
            throw "Not Authorized!! Please login before following someone"
        }
        else {
            throw "Something went wrong"
        }
        
    })
    .then ((resJson)=>{
        return resJson})
    .catch((error)=>{
        
        return Promise.reject(error)
    })
    
}

const unfollowsomeone= (id)=>{
     return fetch (`http://localhost:3333/users/` + id + `/follow`,{
        method:"DELETE",
        headers:{
             "Content-Type":"application/json",
            "X-Authorization":localStorage.getItem("session_token")
        }
    })
    .then((response)=>{
        if(response.status===200){
            return 
        }
        else if (response.status===403){
            
           throw "Cannot unfollow user that you are not following!!"
        }
        else if (response.status===404){
           throw "User not found"
        }
       
        else if(response.status===401) {
            throw "Not Authorized!! Please login to unfollow."
        }
        else {
            throw "Something went wrond"
        }
        
        
    })
    .then ((resJson)=>{
        return resJson})
    .catch((error)=>{
        
        return Promise.reject(error)
    })
    
}


export const postService3={
    search,
    getSingleUser,
    followsomeone,
    unfollowsomeone
} 