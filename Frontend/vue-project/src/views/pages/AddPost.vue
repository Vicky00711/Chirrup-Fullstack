<template>
    <div>
        <div class="ml-5 mt-5 mb-5"><label>Add your post here:</label></div>


        <div class="ml-5"><textarea type="text" v-model="text" placeholder="Write your post"
                class="resize rounded-md border border-black pl-2 pr-2 pt-2 pb-2 mb-3"></textarea></div>
    </div>
    <div>

        <button @click="addPost"
            class="content-center text-white py-2 px-4 ml-5 uppercase rounded bg-blue-400 hover:bg-blue-700 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
            Send Post
        </button>
        <button @click="savePost"
            class="content-center text-white py-2 px-4 ml-5 uppercase rounded bg-blue-400 hover:bg-blue-700 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
            Save Post
        </button>

    </div>
    <div v-if="error" class="ml-5 text-red-400">{{ error }}</div>
</template>

<script>
import { postService2 } from '../../services/posts2.service';
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            text: "",
            posts: [],
            error: "",
            success: ""
        }
    },
    mounted() {
        this.text = localStorage.getItem('draft')
    },

    methods: {
        addPost() {

            postService2.add_post(this.text)
                .then(() => {
                    Swal.fire({

                        icon: "success",
                        title: "Success",
                        text: "Successfully Posted!! Redirecting to home page",
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
        savePost() {
            localStorage.setItem('draft', this.text);
        }
    }
}


</script>

<style lang="scss" scoped></style>