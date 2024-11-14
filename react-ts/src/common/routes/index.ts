import { Paths } from "../types/globals"

export const routes:Paths[] = [
    {
        path:'/',
        element: ()=> import('../../App')
    },
    {
        path:'/home',
        element:()=> import('../../modules/home/pages/Home')
    },
    {
        path:'/cosechas',
        element:()=>import('../../modules/cosechas/pages/Cosechas')
    },
    {
        path:'/suelos',
        element:()=>import('../../modules/suelos/pages/Suelos')
    },
    {
        path:'/productores',
        element:()=>import('../../modules/productores/pages/Productores')
    },
    {
        path:'/ajustes',
        element:()=>import('../../modules/ajustes/pages/Ajustes')
    }
]
   