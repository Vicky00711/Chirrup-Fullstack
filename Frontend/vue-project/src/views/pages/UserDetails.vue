<template>
    <div class="bg-white overflow-hidden shadow rounded-lg border">
        <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                User Details
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                This is some information about the user {{ users.first_name + " " + users.last_name }}.
            </p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Full Name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ users.first_name + " " + users.last_name }}
                    </dd>
                </div>
                <div v-for="follower in followers" :key="follower.user_id"
                    class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        {{ "Follower id: " + follower.user_id }} <br>
                        Follower Name

                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ follower.username }} <br>
                        {{ follower.first_name + " " + follower.last_name }}
                    </dd>
                </div>
                <div v-for="following in followings" :key="following.user_id"
                    class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">

                    <dt class="text-sm font-medium text-gray-500">
                        {{ "Following id: " + following.user_id }} <br>
                        Following Name
                    </dt>

                    <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ following.username }} <br>
                        {{ following.first_name + " " + following.last_name }}
                    </div>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Number of Followers
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ followers.length }}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Number of Followings
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ followings.length }}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Number of Posts
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ posts.length }}
                    </dd>
                </div>
            </dl>
        </div>
    </div>
    <div class="mt-5 mb-5 ">
        <router-link :to="'/user/follow/' + users.user_id">
            <button v-on:click="follow"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-10 mr-10 ">
                Follow
            </button>
        </router-link>
        <router-link :to="'/user/unfollow/' + users.user_id">
            <button v-on:click="unfollow" class="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ">
                Unfollow
            </button>
        </router-link>
        <p v-if="error" class="ml-5 mt-5 text-red-400">{{ error }}</p>
    </div>
</template>

<script>

import { postService3 } from '../../services/posts3.service';
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            users: {},
            followers: [],
            followings: [],
            posts: [],
            likes: [],
            length: {},
            count: "",
            error: "",
            userss: []
        }
    },
    created() {
        this.userdetails()

    },
    methods: {
        userdetails() {
            postService3.getSingleUser(this.$route.params.id)
                .then(users => {

                    this.users = users
                    console.log(this.users)
                    console.log(this.followings.some((following) => following.user_id === this.$route.params.id))
                    console.log(localStorage.getItem('session_token'))
                    console.log(this.$route.params.id)

                    users.posts.forEach(post => {
                        this.count = post.likes.length
                        console.log(this.count)

                    });

                    this.followers = users.followers

                    this.followings = users.following

                    this.posts = users.posts




                })
                .catch(error => this.error = error);
        }, follow() {
            postService3.followsomeone(this.$route.params.id)
                .then(() => {
                    this.userdetails()
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
                });
        }, unfollow() {
            postService3.unfollowsomeone(this.$route.params.id)
                .then(() => {
                    this.userdetails()
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
                });
        }
    }
}




</script>

<style lang="scss" scoped></style>