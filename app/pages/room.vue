<template>
  <div class="room-page">
    <h1>Добро пожаловать в комнату</h1>
    <p>Эта страница будет доработана позже.</p>
  </div>
</template>

<script setup lang="ts">
import '@/assets/styles/pages/room.css'
definePageMeta({
  middleware: ['auth']
})
</script>