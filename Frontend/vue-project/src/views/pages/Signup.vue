<template>
    <form class="space-y-6" @submit="handleSubmit">
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <h1 class="title-font font-medium text-3xl text-gray-900">Connect With Friends By Signing Up</h1>
                    <p class="leading-relaxed mt-4">A Nice Place To Look What People Post.</p>
                </div>

                <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                    <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
                    <div class="relative mb-4">
                        <label for="firstname" class="leading-7 text-sm text-gray-600">First Name</label>
                        <input type="text" id="firstname" name="firstname" v-model="firstname"
                            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    </div>


                    <div class="relative mb-4">
                        <label for="lastname" class="leading-7 text-sm text-gray-600">Last Name</label>
                        <input type="text" id="lastname" name="lastname" v-model="lastname"
                            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    </div>
                    <div class="relative mb-4">
                        <label for="username" class="leading-7 text-sm text-gray-600">Username </label>
                        <input type="text" id="username" name="username" v-model="username"
                            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">

                    </div>
                    <div class="relative mb-4">
                        <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
                        <input type="password" id="password" name="password" v-model="password"
                            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    </div>
                    <button
                        class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Register</button>
                    <div v-if="error" class="text-red-500">{{ error }}</div>
                    <div v-else>{{ success }}</div>
                    <p class="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
                </div>


            </div>
        </section>
    </form>
</template>

<script>
import { postService } from '../../services/posts.service';
export default {
    data() {
        return {
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            error: "",
            submitted: false,
            success: "",
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,14}$/,
            showing: localStorage.getItem('session_token')
        }
    },
    methods: {
        handleSubmit(e) {
            this.showing = this.showing
            e.preventDefault();
            this.error = ""
            this.submitted = true;


            if (this.submitted && !this.firstname) {
                this.error = "Input firstname cannot be empty!!"
                return
            }
            else if (this.submitted && !this.lastname) {
                this.error = "Input last name cannot be empty!!"
                return
            }
            else if (this.submitted && !this.username) {
                this.error = "Username cannot be empty"
                return
            }
            else if (this.submitted && !this.pattern.test(this.password)) {
                this.error = "Password should be atleast 8 to 14 characters long, 1 special character, 1 uppercase and lowercase character and 1 alpha numeric character"
                return
            }

            else {
                postService.signup(this.firstname, this.lastname, this.username, this.password)
                    .then(result => {

                        this.success = "Successfully signed up!! Please go to login"
                    })
                    .catch(error => {
                        this.error = error + "!! Try using a different username.";



                    })
            }

        }
    }
}
</script>


<style lang="scss" scoped></style>