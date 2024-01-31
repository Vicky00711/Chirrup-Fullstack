import {createRouter, createWebHistory} from 'vue-router';

import PostDetails from "../views/pages/PostDetails.vue"
import Search from "../views/pages/Search.vue"
import UserDetails from "../views/pages/UserDetails.vue"
import Login from "../views/pages/Login.vue"
import AddPost from "../views/pages/AddPost.vue"
import EditPost from "../views/pages/EditPost.vue"
import Signup from "../views/pages/Signup.vue"
import newHome from "../views/pages/newHome.vue"
import Profile from "../views/pages/Profile.vue"

// Assuming this code is in your router setup file

const ifAuthenticated = (to, from, next) => {
    const loggedIn = localStorage.getItem('session_token');
    if (loggedIn) {
       next();
       return ;
    } else {
        next('/login');
    }
};









const routes =[
    
    
    {path:"/", component:newHome},
   
    {path:"/posts/:id", component:PostDetails},
    {path:"/delete/:id", component:PostDetails, beforeEnter:ifAuthenticated},
    {path:"/dislike/:id", component:PostDetails, beforeEnter:ifAuthenticated},
    {path:"/like/:id", component:PostDetails, beforeEnter:ifAuthenticated},
    
    {path:"/search", component:Search},
    {path:"/user/:id", component:UserDetails},
    {path:"/user/follow/:id", component:UserDetails, beforeEnter:ifAuthenticated},
    {path:"/user/unfollow/:id", component:UserDetails, beforeEnter:ifAuthenticated},
    {path:"/addposts", component:AddPost},
    {path:"/profile", component:Profile, beforeEnter:ifAuthenticated},
    {path:"/edit/:id", component:EditPost, beforeEnter:ifAuthenticated},
    {path:"/login",component:Login},
   
    
    {path:"/users",component:Signup}

    ]

    

    const router= createRouter({
        history:createWebHistory(),
        routes,
    })
  

    export default router;
