<template>
    <div class="bg-white overflow-hidden shadow rounded-lg border">
        <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                User Details
            </h3>


            <router-link :to="'/addposts'">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-10 mr-10 float-right">
                    Add Post
                </button>
            </router-link>

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




                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500 cursor-pointer hover:bg-blue-300"
                        @click="openFollowersModal('Followers')">
                        Number of Followers
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ followers.length }}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500 cursor-pointer hover:bg-blue-300"
                        @click="openFollowersModal('Following')">
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

                <div v-for="post in posts" :key="post.post_id" class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        {{ "Post id: " + post.post_id }}


                    </dt>

                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <router-link :to="'/posts/' + post.post_id" class="hover:scale-110 hover:bg-blue-300">
                            {{ post.text }} <br>
                        </router-link>
                        <button @click="deletePost(post.post_id)" class="float-right">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6  mr-10 hover:cursor-pointer hover:bg-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                        <router-link :to="'/edit/' + post.post_id" class="float-right mr-3 hover:bg-green-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </router-link>


                    </dd>
                </div>
            </dl>
        </div>
    </div>
    <div class="mt-5 mb-5 ">


        <p v-if="error" class="ml-5 mt-5 text-red-400">{{ error }}</p>
    </div>

    <FollowersModal v-if="showFollowersModal" :modalTitle="followersModalTitle" :userList="followersModalUsers"
        @close="closeFollowersModal" />
</template>

<script>

import { postService3 } from '../../services/posts3.service';
import { postService2 } from '../../services/posts2.service';
import FollowersModal from '../components/followersModal.vue';
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
            userss: [],
            userId: localStorage.getItem('user_id'),
            showFollowersModal: false,
            followersModalTitle: '',
            followersModalUsers: [],
        }
    },
    mounted() {
        this.userdetails()

    },
    methods: {
        userdetails() {
            postService3.getSingleUser(this.userId)
                .then(users => {

                    this.users = users
                    console.log(this.users)
                    console.log(localStorage.getItem('session_token'))
                    console.log(this.$route.params.id)

                    users.posts.forEach(post => {
                        this.count = post.likes.length
                        console.log(this.count)

                    });

                    this.followers = users.followers
                    console.log(this.followers)
                    this.followings = users.following

                    this.posts = users.posts




                })
                .catch(error => this.error = error);
        },
        openFollowersModal(title) {
            if (title === 'Followers') {
                this.followersModalTitle = 'Followers';
                this.followersModalUsers = this.followers;
                console.log(this.followersModalUsers)
            } else if (title === 'Following') {
                this.followersModalTitle = 'Following';
                this.followersModalUsers = this.followings;
            }

            this.showFollowersModal = true;
        },

        closeFollowersModal() {
            this.showFollowersModal = false;
        },
        deletePost(postId) {
            postService2.delete_post([postId])
                .then(() => {
                    this.posts = this.posts.filter(post => post.post_id !== postId);


                    this.userdetails()
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
    },
    components: {
        FollowersModal,
    },
}





</script>

<style lang="scss" scoped></style>