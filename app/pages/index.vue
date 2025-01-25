<template>
  <div>
    <h1>Список комнат</h1>
    <RoomList :rooms="rooms" @join="joinRoom" />
  </div>
</template>

<script setup lang="ts">
import RoomList from '@/components/RoomList.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchRoomsAPI, joinRoomAPI } from '@/utils/api'

definePageMeta({
  middleware: ['auth']
})

const rooms = ref<{ roomUid: string }[]>([])
const router = useRouter()


onMounted(async () => {
  const data = await fetchRoomsAPI()
  rooms.value = data.map(room => ({ roomUid: room.roomUid }))
})

async function joinRoom(roomUid: string) {
  const response = await joinRoomAPI(roomUid)
  localStorage.setItem('initialUsers', JSON.stringify(response))
  await router.push({path: '/room', query: {roomUid}})
}
</script>
