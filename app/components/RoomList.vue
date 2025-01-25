<template>
  <ul class="room-list">
    <li v-for="room in rooms" :key="room.roomUid" class="room-item">
      <h2>{{ room.roomUid }}</h2>
      <button @click="$emit('join', room.roomUid)">Присоединиться</button>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  rooms: { type: Array, required: true },
})
</script>

<style scoped>
.room-list {
  list-style: none;
  padding: 0;
}
.room-item {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid red;
  background: black;
  color: white;
  border-radius: 5px;
}
</style>
