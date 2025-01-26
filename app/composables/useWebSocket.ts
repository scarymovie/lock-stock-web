import { ref, onMounted, onUnmounted } from 'vue'

export function useWebSocket(roomUid: string | null, userId: string | null, initialUsers: any[] = []) {
    const connectedUsers = ref<{ user_id: string; user_name: string }[]>(initialUsers || [])
    const socket = ref<WebSocket | null>(null)
    let reconnectTimeout: NodeJS.Timeout | null = null

    const eventHandlers: Record<string, (data: any) => void> = {
        user_joined: (data) => {
            if (data.user_id !== userId) {
                connectedUsers.value.push({ user_id: data.user_id, user_name: data.user_name })
                console.log(`Пользователь ${data.user_name} присоединился.`)
            }
        },
        user_left: (data) => {
            connectedUsers.value = connectedUsers.value.filter(user => user.user_id !== data.user_id)
            console.log(`Пользователь ${data.user_name} покинул комнату.`)
        },
        game_started: () => {
            console.log('Игра началась!')
        },
    }

    function initializeWebSocket() {
        if (!roomUid) {
            console.error('roomUid не передан')
            return
        }

        console.log(`Подключение к WebSocket для комнаты ${roomUid}`)
        socket.value = new WebSocket(`ws://localhost:8080/ws/${roomUid}`)

        socket.value.onopen = () => {
            console.log('WebSocket соединение установлено')
            if (reconnectTimeout) {
                clearTimeout(reconnectTimeout)
                reconnectTimeout = null
            }
        }

        socket.value.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)
                console.log('Сообщение WebSocket:', data)

                if (data.event && eventHandlers[data.event]) {
                    eventHandlers[data.event](data)
                } else {
                    console.warn(`Нет обработчика для события: ${data.event}`)
                }
            } catch (error) {
                console.error('Ошибка парсинга сообщения WebSocket:', error)
            }
        }

        socket.value.onclose = () => {
            console.log('WebSocket соединение закрыто')
            attemptReconnect()
        }

        socket.value.onerror = (error) => {
            console.error('Ошибка WebSocket:', error)
        }
    }

    function attemptReconnect() {
        if (reconnectTimeout) return

        console.log('Попытка переподключения через 5 секунд...')
        reconnectTimeout = setTimeout(() => {
            initializeWebSocket()
        }, 5000)
    }

    function closeWebSocket() {
        if (socket.value && socket.value.readyState === WebSocket.OPEN) {
            console.log('Закрытие WebSocket соединения...')
            socket.value.close()
        } else {
            console.warn('WebSocket уже закрыт или не открыт')
        }
    }

    onMounted(() => initializeWebSocket())
    onUnmounted(() => {
        closeWebSocket()
        if (reconnectTimeout) clearTimeout(reconnectTimeout)
    })

    return { connectedUsers, socket }
}