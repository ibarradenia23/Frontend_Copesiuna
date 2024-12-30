import axios from 'axios'

const Manager = axios.create({
    baseURL:"http://localhost:3003/",
    headers: {
        'Content-Type': 'application/json',
    }
})

Manager.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    //const token = useRecoilValue(authTokenState)// Asegúrate de que el token se almacene aquí
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default Manager;