<template>
  <div>
    <h1>Создать пользователя</h1>
    <form @submit.prevent="createUser">
      <label for="name">Введите имя:</label>
      <input id="name" v-model="name" type="text" placeholder="Ваше имя" required />
      <button type="submit">Создать или авторизоваться</button>
    </form>
    <p v-if="errorMsg" style="color: red">{{ errorMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import '@/assets/styles/pages/join.css'
import { ref } from 'vue'
import { useCookie } from '#app'
import { createUserAPI } from '@/utils/api'

const errorMsg = ref('')
const name = ref('')
const token = useCookie('Authorization')
if (token.value) {
  navigateTo('/')
}

async function createUser() {
  try {
    console.log('Введённое имя:', name.value)
    const response = await createUserAPI(name.value)

    const authCookie = useCookie('Authorization')
    authCookie.value = response.user_id

    const nameCookie = useCookie('Name')
    nameCookie.value = response.name

    console.log('Токен установлен:', authCookie.value)
    console.log('Имя установлено:', nameCookie.value)

    navigateTo('/')
  } catch (error: any) {
    errorMsg.value = 'Ошибка при создании пользователя'
    console.error(error)
  }
}
</script>

