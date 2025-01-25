import {ref, onMounted, onUnmounted} from 'vue'

export function useWebSocket(
    roomUid: string | null,
    userId: string | null,
    initialUsers: { roomUid: string; user_id: string; user_name: string }[] = []
) {
    const connectedUsers = ref<{ roomUid: string; user_id: string; user_name: string }[]>(initialUsers)
    const socket = ref<WebSocket | null>(null)

    const eventHandlers: Record<string, (data: any) => void> = {
        user_joined: (data) => {
            if (data.room_id === roomUid && data.user_id !== userId) {
                connectedUsers.value.push({
                    roomUid: data.roomUid,
                    user_id: data.user_id,
                    user_name: data.user_name,
                })
                console.log(`Пользователь ${data.user_name} присоединился к комнате.`)
            }
        },
        user_left: (data) => {
            if (data.room_id === roomUid) {
                connectedUsers.value = connectedUsers.value.filter(
                    (user) => user.user_id !== data.user_id
                )
                console.log(`Пользователь ${data.user_name} покинул комнату.`)
            }
        },
        new_message: (data) => {
            console.log(`Новое сообщение в комнате ${data.room_id}:`, data.message)
        },
    }

    function initializeWebSocket() {
        if (!roomUid) {
            console.error('roomUid не передан в маршрут')
            return
        }

        const url = `ws://localhost:8080/ws/${roomUid}`
        console.log(`Подключение к WebSocket: ${url}`)
        socket.value = new WebSocket(url)

        socket.value.onopen = () => {
            console.log(`WebSocket соединение установлено для комнаты ${roomUid}`)
        }

        socket.value.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)
                console.log('Получено сообщение:', data)

                if (eventHandlers[data.event]) {
                    eventHandlers[data.event](data)
                } else {
                    console.warn(`Обработчик для события ${data.event} не найден.`)
                }
            } catch (error) {
                console.error('Ошибка обработки сообщения:', error)
            }
        }

        socket.value.onclose = (event) => {
            console.log(
                `WebSocket соединение закрыто (код: ${event.code}, причина: ${event.reason || 'не указана'})`
            )
        }

        socket.value.onerror = (error) => {
            console.error('Ошибка WebSocket:', error)
        }
    }

    function closeWebSocket() {
        if (socket.value && socket.value.readyState === WebSocket.OPEN) {
            console.log('Закрытие WebSocket соединения...')
            socket.value.close()
        } else {
            console.warn('WebSocket уже закрыт или не открыт')
        }
    }

    onMounted(() => {
        initializeWebSocket()
    })

    onUnmounted(() => {
        closeWebSocket()
    })

    return {
        connectedUsers,
        socket,
    }
}