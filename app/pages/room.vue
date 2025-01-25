<template>
  <div class="room-page">
    <h1>Добро пожаловать в комнату {{ roomUid }}</h1>
    <p>Подключено участников: {{ connectedUsers.length }}</p>

    <div class="user-container">
      <div
          v-for="user in connectedUsers"
          :key="user.user_id"
          class="user-icon"
      >
        <div class="avatar"></div>
        <p class="username">{{ user.user_name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/assets/styles/pages/room.css'
import { useRoute } from 'vue-router'
import { useCookie } from '#app'
import { useWebSocket } from '@/composables/useWebSocket'

definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const roomUid = route.query.roomUid as string || null

let initialUsers = []
const rawUsers = localStorage.getItem('initialUsers')

if (rawUsers) {
  try {
    initialUsers = JSON.parse(rawUsers)
    console.log('Участники из localStorage:', initialUsers)
  } catch (error) {
    console.error('Ошибка парсинга данных из localStorage:', error)
  }
} else {
  console.warn('initialUsers отсутствует в localStorage.')
}
const userId = useCookie('Authorization')?.value || null
const { connectedUsers } = useWebSocket(roomUid, userId, initialUsers)
</script>