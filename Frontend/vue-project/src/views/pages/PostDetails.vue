<template>
    <div class="bg-white overflow-hidden shadow rounded-lg border">
        <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Post Details
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                This is some information about the post.
            </p>

        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Author
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ firstname + " " + lastname }}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Username
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ username }}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Date
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ date }}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Post Text
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ posts.text }}
                        <router-link :to="'/dislike/' + posts.post_id">
                        <button @click="dislike"
                            class="py-1.5 px-3 hover:text-red-600 float-right ml-3 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384">
                                </path>
                            </svg>

                        </button>
                        </router-link>
                        <router-link :to="'/like/' + posts.post_id">
                        <button @click="like"
                            class="py-1.5 px-3 hover:text-green-600 float-right hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z">
                                </path>
                            </svg>

                        </button>
                        </router-link>


                    </dd>


                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Number of Likes
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ count }}
                    </dd>
                </div>

                <div v-for="liked in likedUsers" :key="liked.user_id"
                    class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Liked By Username <br>
                        Full Name

                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ liked.username }} <br>
                        {{ liked.first_name + " " + liked.last_name }}
                    </dd>
                </div>
            </dl>
        </div>

    </div>
    <div class="mt-4">

    <router-link :to="'/delete/' + posts.post_id">
        <button @click="deletePost"
            class="content-center text-white py-2 px-4 ml-5 mb-3 uppercase rounded bg-red-500 hover:bg-red-700 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
            Delete Post
        </button>

</router-link>


    </div>
    <div v-if="error" class="text-red-500 ml-5 mt-3 mb-3">{{ error }}</div>
</template>

<script>

import { postService2 } from '../../services/posts2.service';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            posts: {},
            error: "",
            count: "",
            firstname: "",
            lastname: "",
            username: "",
            date: "",
            likedUsers: []
        }
    },
    created() { this.getPost() },


    methods: {
        getPost() {
            postService2.getSinglePost(this.$route.params.id)
                .then(posts => {

                    this.posts = posts
                    this.firstname = posts.author.first_name
                    this.lastname = posts.author.last_name
                    this.username = posts.author.username
                    this.userId = posts.author.user_id

                    this.count = posts.likes.length
                    this.date = new Date(posts.timestamp).toDateString()
                    this.likedUsers = posts.likes

                })
                .catch(error => this.error = error);
        },
        deletePost() {
            postService2.delete_post(this.$route.params.id)
                .then(() => {
                    Swal.fire({

                        icon: "success",
                        title: "Success",
                        text: "Successfully Deleted!! Redirecting to home page",
                        showConfirmButton: false,

                    });
                    setTimeout(() => {
                        this.$router.push("/");
                    }, 2000); // 2000 milliseconds (2 seconds) delay
                })
                .catch((error) => {
                    Swal.fire({

                        icon: "error",
                        title: "Oops...",
                        text: error,
                        showConfirmButton: false,

                    });
                })
        },
        like() {
            postService2.like_post(this.$route.params.id)
                .then(() => {

                    this.getPost()
                    this.error = ""
                })
                .catch((error) => {
                    Swal.fire({

                        icon: "error",
                        title: "Oops...",
                        text: error,
                        showConfirmButton: false,

                    });
                    this.error = error
                })
        },
        dislike() {
            postService2.dislike_post(this.$route.params.id)
                .then(() => {

                    this.getPost()

                    this.error = ""
                })
                .catch((error) => {
                    Swal.fire({

                        icon: "error",
                        title: "Oops...",
                        text: error,
                        showConfirmButton: false,

                    });
                    this.error = error
                })
        }
    }

}
</script>

<style lang="scss" scoped></style>