import Axios, { type AxiosInstance } from 'axios'

const axios: AxiosInstance = Axios.create({
    baseURL: process.env.BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

export default axios
