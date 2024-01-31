
<template>
  <div class="bg-indigo-500 border shadow-lg">
    <nav class="
        container
        px-6
        py-8
        mx-auto
        md:flex md:justify-between md:items-center
      ">
      <div class="flex items-center justify-between">
        <router-link to="/">
          <div class="hover:scale-110"><img src="../assets/blog.png" alt="blog icon" class="mx-auto h-10 w-auto " />Blogs
          </div>
        </router-link>

        <!-- Mobile menu button -->
        <div @click="toggleNav" class="flex md:hidden">
          <button type="button" class="
              text-black
              hover:text-gray-400
              
            ">
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
              </path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <ul :class="showMenu ? 'flex' : 'hidden'" class="
          flex-col
          mt-8
          space-y-4
          md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0
        ">


        <router-link to="/">
          <li class="text-white hover:text-indigo-100 hover:scale-110 cursor-pointer">Home</li>
        </router-link>
        <router-link v-show="!loggedIn" to="/users">
          <li class="text-white hover:scale-110 hover:text-indigo-100 cursor-pointer">Sign Up</li>
        </router-link>

        <router-link to="/profile">
          <li class="text-white hover:text-indigo-100 hover:scale-110 cursor-pointer">Profile</li>
        </router-link>
        <router-link to="/search">
          <li class="text-white hover:text-indigo-100 hover:scale-110 cursor-pointer">Search</li>
        </router-link>
        <button v-show="loggedIn" v-on:click="handleSubmit">
          <li
            class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 hover:scale-110 rounded text-base mt-4 md:mt-0">
            Logout</li>
        </button>

        <router-link v-show="!loggedIn" to="/login"
          class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 hover:scale-110 rounded text-base mt-4 md:mt-0">
          <li class="text-black hover:text-indigo-400 cursor-pointer">Login</li>

          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            class="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </router-link>
      </ul>
    </nav>
  </div>

  <routerView />
</template>




<script>
import { postService } from '../services/posts.service';
import { ref } from 'vue';
export default {

  data() {
    return {
      loggedIn: false,

    }
  },
  setup() {
    let showMenu = ref(false);
    const toggleNav = () => (showMenu.value = !showMenu.value);
    return { showMenu, toggleNav };
  },
  mounted() {
    this.loggedIn = localStorage.getItem('session_token') != null
  },
  methods: {


    handleSubmit(e) {



      if (this.loggedIn) {
        postService.logout()
          .then(result => {
            console.log("Logout successful")
            this.loggedIn = false
            this.$router.push("/login")
          })
          .catch(error => {
            this.error = error;



          })
      }


    },

  }
}
</script>

<style scoped></style>




