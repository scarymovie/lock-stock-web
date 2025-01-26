<template>
  <div class="room-page">
    <div class="main-block">
      <div v-if="!gameStarted" class="welcome-block">
        <h1>Добро пожаловать в комнату {{ roomUid }}</h1>
        <p>Подключено участников: {{ connectedUsers.length }}</p>
        <button class="start-btn" @click="startGame">Начать</button>
      </div>

      <div v-else class="game-area">
        <p>Игра началась!</p>
      </div>
    </div>

    <div class="user-container">
      <UserAvatar
          v-for="user in connectedUsers"
          :key="user.user_id"
          :username="user.user_name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/assets/styles/pages/room.css'
import UserAvatar from '@/components/UserAvatar.vue'
import {useRoute} from 'vue-router'
import {useWebSocket} from '@/composables/useWebSocket'
import {startGameAPI} from "~/utils/api";

definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const roomUid = route.query.roomUid as string || null
const initialUsers = JSON.parse(localStorage.getItem('initialUsers') || '[]')
const { connectedUsers, socket } = useWebSocket(roomUid, null, initialUsers)

const gameStarted = ref(false)

async function startGame() {
  try {
    if (!roomUid) {
      throw new Error('roomUid is null. Невозможно начать игру.')
    }
    console.log(`Запрос на старт игры для комнаты: ${roomUid}`)
    await startGameAPI(roomUid)
    console.log('Запрос на старт игры успешно выполнен')
  } catch (error) {
    console.error('Ошибка при старте игры:', error)
  }
}

if (socket.value) {
  socket.value.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.log('Событие WebSocket:', data)
    if (data.event === 'game_started') {
      console.log('Игра началась!')
      gameStarted.value = true
    }
  }
}
</script>
