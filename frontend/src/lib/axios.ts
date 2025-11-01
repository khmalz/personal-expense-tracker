import Axios, { type AxiosInstance } from 'axios'

const getBaseURL = () => {
    if (typeof window === 'undefined') {
        return process.env.SERVER_BACKEND_URL
    }

    return process.env.NEXT_PUBLIC_BACKEND_URL
}

const axios: AxiosInstance = Axios.create({
    baseURL: getBaseURL(),
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

export default axios
