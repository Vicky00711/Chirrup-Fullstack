const getFeed = () => {
  const token = localStorage.getItem("session_token");
  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers["X-Authorization"] = token;
  }

  return fetch("http://localhost:3333/feed", {
    method: "GET",
    headers: headers
  })
  .then((response) => {
    if(response.status===200){
            
            return response.json();
        }
       else if(response.status===500){
           throw "Seomething went wrong"
        }
  })
  .catch((error) => {
    console.log(error)
        return Promise.reject(error)
  });
};

export const postService1 = {
  getFeed,
};
