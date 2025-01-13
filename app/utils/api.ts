import { useCookie, useRuntimeConfig } from '#app'

const apiFetch = async <T>(url: string, options: any = {}): Promise<T> => {
    const config = useRuntimeConfig()
    const token = useCookie('Authorization').value

    const headers = {
        ...options.headers,
        Authorization: ` ${token}`,
        'User-Agent': 'Nuxt HTTP Client',
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
    const token = useCookie('Authorization').value

    return apiFetch<{ roomUid: string }[]>('/room/list', {
        method: 'POST',
        credentials: 'include',
        headers: {
            Authorization: token,
        },
        body: undefined,
    })
}


