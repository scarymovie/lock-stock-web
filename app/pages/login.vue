<template>
  <div>
    <h1>Создать пользователя</h1>
    <button @click="createUser">Создать или авторизоваться</button>
    <p v-if="errorMsg" style="color: red">{{ errorMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCookie } from '#app'
import { createUserAPI } from '@/utils/api'

const errorMsg = ref('')
const token = useCookie('Authorization')
if (token.value) {
  navigateTo('/')
}

async function createUser() {
  try {
    const response = await createUserAPI()
    const authCookie = useCookie('Authorization')
    authCookie.value = response.user_id
    console.log('Токен установлен:', authCookie.value)
    navigateTo('/')
  } catch (error: any) {
    errorMsg.value = 'Ошибка при создании пользователя'
    console.error(error)
  }
}
</script>

