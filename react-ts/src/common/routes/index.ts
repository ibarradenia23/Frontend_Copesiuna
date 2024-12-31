import { Paths } from "../types/globals"

export const routes:Paths[] = [
    {
        path:'/',
        element: ()=> import('../../App'),
        protected:false
    },
    {
        path:'/home',
        element:()=> import('../../modules/home/pages/Home'),
        protected:false
    },
    {
        path:'/cosechas',
        element:()=>import('../../modules/cosechas/pages/Cosechas'),
        protected:true
    },
    {
        path:'/suelos',
        element:()=>import('../../modules/suelos/pages/Suelos'),
        protected:true
    },
    {
        path:'/productores',
        element:()=>import('../../modules/productores/pages/Productores'),
        protected:true
    },
    {
        path:'/cultivos_parcelas',
        element:()=>import('../../modules/ajustes/pages/Cultivos_Parcelas'),
        protected:true
    },
    {
        path:'/users',
        element:()=>import('../../modules/users/pages/Users'),
        protected:true
    },
]
   