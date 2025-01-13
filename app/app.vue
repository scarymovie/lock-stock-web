<template>
  <div class="layout">
    <header class="header">
      <nav class="nav">
        <h1 class="logo">♠ Poker Game ♣</h1>
        <ul class="menu">
          <li><a href="/">Home</a></li>
          <li><a href="/login">Authorization</a></li>
        </ul>
      </nav>
    </header>

    <main class="content">
      <NuxtPage />
    </main>

    <footer class="footer">
      <p>&copy; 2025 Poker Game. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
/* Контейнер для всей страницы */
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Занимаем всю высоту экрана */
}

/* Контент растягивается, чтобы футер прижался к низу */
.content {
  flex: 1;
  padding: 1rem;
  background: radial-gradient(circle, #006400, #003300); /* Зеленый стиль стола */
}

/* Стили для хедера */
.header {
  background-color: black;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff0000; /* Красный, ассоциирующийся с покером */
}

.menu {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.menu li a {
  text-decoration: none;
  color: white;
  transition: color 0.3s;
}

.menu li a:hover {
  color: #00ff00; /* Зеленый */
}

/* Стили для футера */
.footer {
  background-color: black;
  color: white;
  text-align: center;
  padding: 1rem;
  border-top: 2px solid #ff0000; /* Красная линия в стиле покера */
}
</style>
