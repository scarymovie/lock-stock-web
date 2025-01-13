import { useCookie, useRuntimeConfig } from '#app'

const apiFetch = async <T>(url: string, options: any = {}): Promise<T> => {
    const config = useRuntimeConfig()
    const token = useCookie('Authorization').value?.trim()

    const headers = {
        ...options.headers,
        Authorization: token
    }

    return $fetch<T>(url, {
        baseURL: config.public.apiBase,
        ...options,
        headers,
    })
}


export async function createUserAPI(): Promise<{ user_id: string }> {
    return apiFetch<{ user_id: string }>('/user/create', {
        method: 'POST',
        credentials: 'include',
    })
}


export async function fetchRoomsAPI(): Promise<{ roomUid: string }[]> {

    try {
        const response = await apiFetch<{ roomUid: string }[]>('/room/list', {
            method: 'POST',
            credentials: 'include',
            body: undefined,
        })

        console.log('Ответ от API:', response)
        return response
    } catch (error) {
        console.error('Ошибка при запросе к API:', error)
        throw error
    }
}



