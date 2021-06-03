import axios, { AxiosInstance } from 'axios'

const client: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT,
    headers: {
        'Content-type': 'application/json'
    }
})

export interface ResponseData {
    data: any
}

export default client