<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="../../assets/user.png" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="handleSubmit">
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username:</label>
          <div class="mt-2">
            <input id="username" type="text" name="username" v-model="username" placeholder="Your Username"
              class="pl-2 pr-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password:</label>
          <div class="mt-2">
            <input id="password" type="password" name="password" v-model="password" placeholder="Your Password"
              class="pl-2 pr-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

          </div>
        </div>

        <div>
          <button
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
            in</button>
        </div>
        <div v-if="error">
          <p class="text-red-500">{{ error }} <router-link to="/users" class="text-blue-600 hover:underline">Sign Up</router-link></p>
        </div>
      </form>


    </div>
  </div>
</template>



<script>
import { postService } from '../../services/posts.service';
export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
      submitted: true,
      showing: localStorage.getItem('session_token')

    }
  },

  methods: {


    handleSubmit(e) {
      this.showing = this.showing
      e.preventDefault();
      this.error = ""


      if (this.submitted && !this.username) {
        this.error = "Username cannot be empty"

      }
      else if (this.submitted && !this.password) {
        this.error = "Input password cannot be empty"

      }

      else {

        console.log(this.username + this.password);

        postService.login(this.username, this.password)
          .then(result => {
            console.log("Auth successful")



            this.$router.push("/")
          })
          .catch(error => {
            this.error = error;
            this.submitted = false;


          })



      }
    }
  }
}
</script>

<style lang="scss" scoped></style>