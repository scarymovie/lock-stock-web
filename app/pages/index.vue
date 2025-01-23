<template>
  <div>
    <h1>Список комнат</h1>

    <ul v-if="rooms" class="room-list">
      <li v-for="(room) in rooms" :key="room.roomUid" class="room-item">
        <div>
          <h2>{{ room.roomUid }}</h2>
          <button class="join-btn" @click="joinRoom(room.roomUid)">
            Присоединиться
          </button>
        </div>
      </li>
    </ul>

    <p v-else-if="error" class="error">{{ error }}</p>
    <p v-else>Загрузка...</p>
  </div>
</template>

<script setup lang="ts">
import '@/assets/styles/pages/home.css'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchRoomsAPI, joinRoomAPI } from '@/utils/api'
import { definePageMeta } from '#imports'

definePageMeta({
  middleware: ['auth']
})

const rooms = ref<{ roomUid: string }[] | null>(null)
const error = ref<string | null>(null)
const router = useRouter() // Роутер для перенаправления

onMounted(async () => {
  try {
    console.log('Выполняем запрос на клиенте')
    rooms.value = await fetchRoomsAPI()
  } catch (err) {
    console.error('Ошибка при загрузке комнат:', err)
    error.value = 'Не удалось загрузить комнаты'
  }
})

async function joinRoom(roomUid: string) {
  try {
    console.log(`Попытка подключения к комнате ${roomUid}`)
    await joinRoomAPI(roomUid)
    await router.push({ path: '/room', query: { roomUid } })
  } catch (err) {
    console.error(`Ошибка при подключении к комнате ${roomUid}:`, err)
    alert(`Не удалось подключиться к комнате: ${roomUid}`)
  }
}
</script>