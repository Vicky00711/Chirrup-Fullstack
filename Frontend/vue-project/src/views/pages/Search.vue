<template>
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
        </div>
        <input type="search" id="default-search" v-model="search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search users" required>
        <button v-on:click="searchUsers"
            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>

    <div v-if="users.length">
        <div v-for="user in users" :key="user.user_id" class="p-16">
            <div class="p-8 bg-white shadow mt-24">
                <div class="grid grid-cols-1 md:grid-cols-3">
                    <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                        <div>
                            <p class="font-bold text-gray-700 text-xl">{{ user.user_id }}</p>
                            <p class="text-gray-400">User ID</p>
                        </div>
                        <div>
                            <p class="font-bold text-gray-700 text-xl">{{ user.username }}</p>
                            <p class="text-gray-400">Username</p>
                        </div>


                    </div>
                    <div class="relative">
                        <div
                            class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">

                        <div>
                            <p class="font-bold text-gray-700 text-xl">{{ user.first_name + " " + user.last_name }}</p>
                            <p class="text-gray-400">Full Name</p>
                        </div>

                        <router-link :to="'/user/' + user.user_id">
                            <button
                                class="content-center text-white py-2 px-4 uppercase rounded bg-red-400 hover:bg-red-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                User Details
                            </button>
                        </router-link>

                    </div>
                </div>


                <div>

                </div>



            </div>
        </div>
    </div>
    <div v-if="!users.length">
        <div class="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
            <div class="rounded-lg bg-white p-8 text-center shadow-xl">
                <h1 class="mb-4 text-4xl font-bold">No users</h1>
                <p class="text-gray-600">Oops! Users not found with the above characters <br> Try using different characters
                    <br> Or click on Search leaving the input empty.
                </p>

            </div>
        </div>
    </div>
</template>

<script>
import { postService3 } from '../../services/posts3.service';
export default {
    data() {
        return {
            search: "",
            users: []
        }
    },
    methods: {
        searchUsers() {
            postService3.search(this.search)
                .then((users) => {
                    this.users = users;

                })
                .catch(error => this.error = error);

        },


    }



}


</script>

<style lang="scss" scoped></style>