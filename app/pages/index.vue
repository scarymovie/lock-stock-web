<template>
  <div>
    <h1>Список комнат</h1>

    <ul v-if="rooms">
      <li v-for="(room, idx) in rooms" :key="idx">
        {{ room }}
      </li>
    </ul>

    <p v-else>Загрузка...</p>
  </div>
</template>

<script setup lang="ts">
import { fetchRoomsAPI } from '@/utils/api'

definePageMeta({
  middleware: ['auth']
})

const { data: rooms, error } = await useAsyncData<string[]>('room-list', fetchRoomsAPI)

if (error.value) {
  console.error('Ошибка при загрузке комнат:', error.value)
}
</script>
