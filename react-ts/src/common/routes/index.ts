import { Paths } from "../types/globals"

export const routes:Paths[] = [
    {
        path:'/',
        element: ()=> import('../../App')
    },
    {
        path:'/home',
        element:()=> import('../../modules/home/pages/Home')
    }
]
   