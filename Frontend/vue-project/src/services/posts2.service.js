const getSinglePost = (id) => {
  return fetch(`http://localhost:3333/posts/` + id)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        throw "User not found";
      } else {
        throw "Seomething went wrong";
      }
    })
    .then((resJson) => {
      return resJson;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};
const add_post = (text) => {
  return fetch("http://localhost:3333/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization":localStorage.getItem('session_token')
    },
    body: JSON.stringify({
      text: text,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else if (response.status === 500) {
        throw "Seomething went wrong";
      } else if (response.status === 400) {
        throw "Cannot send a empty post!!";
      }
      else if (response.status === 401) {
        throw "Not authorized";
      }
      
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};
const edit_post = (id,text) => {
  return fetch("http://localhost:3333/posts/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization":localStorage.getItem('session_token')
    },
    body: JSON.stringify({
      text: text,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("ok");
      } else if (response.status === 500) {
        throw "Seomething went wrong";
      } else if (response.status === 400) {
        throw "Cannot send an empty post!!";
      }
      else if (response.status === 401) {
        throw "Unauthorized...Login with same username to edit the post!!";
      }
       else if (response.status === 403) {
        throw "You can only edit the posts authored by you. Please login with the same username to edit the post!!";
      }
       else if (response.status === 404) {
        throw "Not found";
      }
     
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

const delete_post = (id) => {
  return fetch("http://localhost:3333/posts/" + id, {
    method: "DELETE",
    headers: {
     
      "X-Authorization":localStorage.getItem('session_token')
    }
    
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("ok")
      } else if (response.status === 500) {
        throw "Seomething went wrong";
      } else if (response.status === 400) {
        throw "Bad Request";
      }
      else if (response.status === 401) {
        throw "Not authorized!! Login with your username and password to delete the post.";
      }
      else if (response.status === 403) {
        throw "You can only delete your own posts!! Cannot delete a post authored by someone else!!";
      }
      
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

const like_post=(id)=>{
  return fetch("http://localhost:3333/posts/" + id + "/like", {
    method: "POST",
    headers: {
     
      "X-Authorization":localStorage.getItem('session_token')
    }
    
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("ok")
      } else if (response.status === 500) {
        throw "Seomething went wrong";
      } else if (response.status === 404) {
        throw "Not found.";
      }
      else if (response.status === 401) {
        throw "Not authorized!! Login with your username and password to like the post.";
      }
      else if (response.status === 403) {
        throw "Already liked this post!! Cannot like a post twice.";
      }
      
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

const dislike_post=(id)=>{
  return fetch("http://localhost:3333/posts/" + id + "/like", {
    method: "DELETE",
    headers: {
     
      "X-Authorization":localStorage.getItem('session_token')
    }
    
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("ok")
      } else if (response.status === 500) {
        throw "Seomething went wrong";
      } else if (response.status === 404) {
        throw "Not found.";
      }
      else if (response.status === 401) {
        throw "Not authorized!! Login with your username and password to dislike the post.";
      }
      else if (response.status === 403) {
        throw "Cannot dislike a post which you have not liked yet!!";
      }
      
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

export const postService2 = {
  getSinglePost,
  add_post,
  delete_post,
  like_post,
  dislike_post,
  edit_post
};
