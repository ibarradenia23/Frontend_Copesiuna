import axios from 'axios'

const Manager = axios.create({
    baseURL:"https://3sw40mhb-3000.use2.devtunnels.ms/",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'mode': 'no-cors'
    }
})

Manager.interceptors.request.use((config)=>{
    //Este token debe estraerce desde el servidor.
    const token = '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default Manager;