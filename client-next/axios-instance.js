import axios from 'axios'

const api = () => {
    return axios.create({
        baseURL: '/api',
        headers: {
            "Content-Type": "application/json"
        },
    })
}

export default api;