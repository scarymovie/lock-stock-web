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
import { ref, onMounted } from 'vue'
import { fetchRoomsAPI } from '@/utils/api'

const rooms = ref<{ roomUid: string }[] | null>(null)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    console.log('Выполняем запрос на клиенте')
    rooms.value = await fetchRoomsAPI()
  } catch (err) {
    console.error('Ошибка при загрузке комнат:', err)
    error.value = 'Не удалось загрузить комнаты'
  }
})
</script>
