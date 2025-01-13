export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useCookie('Authorization')
    if (!auth.value) {
        console.warn('Пользователь не авторизован. Редирект на /login.')
        return navigateTo('/login')
    }
})
