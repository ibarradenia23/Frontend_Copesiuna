import axios from 'axios'


const Manager = axios.create({
    baseURL:"https://gdlh9m72-3004.use.devtunnels.ms/",
    headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors'
    }
})

Manager.interceptors.request.use((config)=>{
    //Este token debe estraerce desde el servidor.
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default Manager;