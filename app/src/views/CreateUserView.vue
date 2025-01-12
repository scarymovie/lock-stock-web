<template>
  <div class="create-user">
    <h1>Создание пользователя</h1>
    <form @submit.prevent="handleCreate">
      <div>
        <label for="username">Имя пользователя:</label>
        <input
            type="text"
            id="username"
            v-model="username"
            required
        />
      </div>

      <div>
        <label for="email">Email:</label>
        <input
            type="email"
            id="email"
            v-model="email"
            required
        />
      </div>

      <div>
        <label for="password">Пароль:</label>
        <input
            type="password"
            id="password"
            v-model="password"
            required
        />
      </div>

      <button type="submit">Создать</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// Интерфейс, описывающий данные для создания пользователя
interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

// Реактивные переменные
const username = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')

// Обработчик создания (async, чтобы использовать await)
async function handleCreate(): Promise<void> {
  // Формируем объект данных
  const data: CreateUserDto = {
    username: username.value,
    email: email.value,
    password: password.value
  }

  try {
    // Отправка на бэкенд
    const response = await fetch('http://localhost:8080/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      // Если сервер вернул ошибку (4xx или 5xx), генерируем ошибку
      throw new Error(`Ошибка запроса: ${response.status}`)
    }

    // Предположим, что бэкенд возвращает JSON с результатом
    const result = await response.json()
    console.log('Пользователь создан успешно:', result)
    // Здесь можно вывести уведомление или перейти на другую страницу

  } catch (error) {
    console.error('Ошибка при создании пользователя:', error)
    // Обработать ошибку (уведомление, логирование и т.д.)
  } finally {
    // Сбросить поля (опционально)
    username.value = ''
    email.value = ''
    password.value = ''
  }
}
</script>

<style scoped>
.create-user {
  max-width: 400px;
  margin: 0 auto;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}

input {
  margin-bottom: 12px;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
