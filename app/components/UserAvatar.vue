<template>
  <div class="user-avatar">
    <div class="avatar"></div>
    <p class="username">{{ username }}</p>
  </div>
</template>

<script setup>
defineProps({
  username: { type: String, required: true },
})
</script>

<style scoped>
.user-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar {
  width: 50px;
  height: 50px;
  background-color: green;
  border-radius: 50%;
  border: 2px solid white;
}
.username {
  margin-top: 5px;
  color: white;
}
</style>
