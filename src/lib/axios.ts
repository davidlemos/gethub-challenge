import axios from "axios";

// const api = axios.create({
//     baseURL: "https://api.themoviedb.org/3",
// })

// // api.defaults.headers.common['Authorization'] = process.env.API_BEARER_TOKEN;

// export default api;

export const api = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.API_BEARER_TOKEN}`
    }
})