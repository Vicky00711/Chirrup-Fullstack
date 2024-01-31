<!-- FollowersModal.vue -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center " @click="closeModal">
    <div class="bg-white rounded-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3 items-center justify-center p-4">
    <div class="flex flex-col items-center">
      <div class="mb-4">
        <h3 class="text-lg font-semibold">{{ modalTitle + " Username" + " & " + "Full Name" }}</h3>
      </div>
      <ul class="divide-y divide-gray-300">
        <li v-for="user in userList" :key="user.user_id" class="py-2">
        <router-link :to="'/user/' + user.user_id " class="cursor-pointer hover:bg-gray-200 ">
          {{ user.username + " " + " "+ user.first_name + " " +user.last_name }}
          </router-link>
        </li>
      </ul>
      <button @click="closeModal" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Close
      </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalTitle: String,
    userList: Array,
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>
