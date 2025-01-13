export default defineNuxtRouteMiddleware((to, from) => {
    console.log('Middleware вызван для маршрута:', to.path)
    const token = useCookie('Authorization')

    if (!token.value) {
        console.log('Токен отсутствует. Перенаправление на /login')
        return navigateTo('/login')
    }
})
