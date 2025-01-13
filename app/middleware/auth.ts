export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('Authorization')
    if (!token.value) {
        return navigateTo('/login')
    }
})
