import { ref, onMounted, onUnmounted } from 'vue'

export function useWebSocket(roomUid: string | null, userId: string | null, initialUsers: any[] = []) {
    const connectedUsers = ref(initialUsers)
    const socket = ref<WebSocket | null>(null)

    function initializeWebSocket() {
        if (!roomUid) {
            console.error('roomUid не передан')
            return
        }

        socket.value = new WebSocket(`ws://localhost:8080/ws/${roomUid}`)
        socket.value.onopen = () => console.log(`Соединение установлено для комнаты ${roomUid}`)
        socket.value.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if (data.event === 'user_joined' && data.user_id !== userId) {
                connectedUsers.value.push({ user_id: data.user_id, user_name: data.user_name })
            }
        }
        socket.value.onclose = () => console.log('Соединение закрыто')
        socket.value.onerror = (error) => console.error('Ошибка WebSocket:', error)
    }

    function closeWebSocket() {
        if (socket.value) socket.value.close()
    }

    onMounted(() => initializeWebSocket())
    onUnmounted(() => closeWebSocket())

    return { connectedUsers, socket }
}