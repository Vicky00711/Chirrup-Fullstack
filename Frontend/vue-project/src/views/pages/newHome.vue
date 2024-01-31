<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Chirrup Website</h1>
        <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn
          asymmetrical gentrify, subway tile poke farm-to-table.</p>
      </div>
      <div v-if="!posts.length">
        <div class="text-center">
          <h1 class="mb-4 text-6xl font-semibold text-red-500">NO POSTS</h1>
          <p class="mb-4 text-lg text-gray-600">Oops! Looks like you haven't posted anything.</p>
          <div class="animate-bounce">
            <svg class="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8">
              </path>
            </svg>
          </div>
          <p class="mt-4 text-gray-600">Let's get you back to <router-link link to="/addposts" class="text-blue-500">ADD
              POST</router-link>.</p>
        </div>
      </div>
    </div>
    <div v-if="posts.length">

      <section class="text-gray-600 body-font overflow-hidden">
        <div v-for="post in posts" :key="post.post_id"
          class="container px-5 py-24 mx-auto border mb-5 rounded-md shadow-lg hover:bg-gray-200  hover:shadow-lg hover:scale-300">

          <div class="-my-8 divide-y-2 divide-gray-100">
            <div class="py-8 flex flex-wrap md:flex-nowrap">
              <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span class="font-semibold title-font text-gray-700">POST: {{ post.post_id }}</span>
                <span class="mt-1 text-gray-500 text-sm">{{ new Date(post.timestamp).toLocaleString() }}</span>
                <span class="mt-1 text-gray-500 text-sm">{{ "Likes: " + post.likes.length }}</span>
              </div>
              <div class="md:flex-grow">
                <p class="leading-relaxed ">{{ post.text }}</p>
                <router-link :to="'/posts/' + post.post_id"
                  class="text-indigo-500 inline-flex items-center mt-4 cursor-pointer hover:scale-110">Post Details
                  <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </router-link>


              </div>
            </div>


          </div>

        </div>
      </section>


    </div>

  </section>
</template>

<script>


import { postService1 } from '../../services/posts1.service';
export default {
  data() {
    return {
      posts: [],
      error: "",
      loading: true,
    }
  },
  mounted() {

    postService1.getFeed()

      .then(posts => {

        this.posts = posts
        console.log(posts)

        if (localStorage.getItem('reloaded')) {
          // The page was just reloaded. Clear the value from local storage
          // so that it will reload the next time this page is visited.
          localStorage.removeItem('reloaded');
        } else {
          // Set a flag so that we know not to reload the page twice.
          localStorage.setItem('reloaded', '1');
          location.reload();
        }



      })
      .catch(error => this.error = error);
  }

}
</script>

<style lang="scss" scoped></style>