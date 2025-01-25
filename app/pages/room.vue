<template>
  <div class="room-page">
    <h1>Добро пожаловать в комнату {{ roomUid }}</h1>
    <p>Подключено участников: {{ connectedUsers.length }}</p>
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
import { useRoute } from 'vue-router'
import { useWebSocket } from '@/composables/useWebSocket'

definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const roomUid = route.query.roomUid as string || null
const initialUsers = JSON.parse(localStorage.getItem('initialUsers') || '[]')
const { connectedUsers } = useWebSocket(roomUid, null, initialUsers)
</script>
