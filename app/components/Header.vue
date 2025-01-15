<template>
  <header class="header">
    <nav class="nav">
      <h1 class="logo">♠ Poker Game ♣</h1>
      <ul class="menu">
        <li><a href="/">Главная</a></li>
        <li><a href="/login">Авторизация</a></li>
      </ul>
      <div v-if="userName" class="user-name">
        Привет, {{ userName }}!
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useCookie } from '#app'
import '@/assets/styles/header.css'

const userName = useCookie('Name').value
</script>