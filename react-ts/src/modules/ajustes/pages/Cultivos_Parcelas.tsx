import React, { useEffect } from 'react'
import Navbar from '../../../common/components/Navbar'
import CartasCultivos from '../components/CartasCultivos'
import CartasTiposParcelas from '../components/CartasTiposParcelas'
import { isTokenExpired } from '../../auth/utils/tokenUtils'
import useAuth from '../../auth/hooks/useAuth'
import { useRecoilValue } from 'recoil'
import { authTokenState } from '../../auth/state/authAtom'
import { useNavigate } from 'react-router-dom'

const Cultivos_Parcelas = () => {

  const {logout} = useAuth();
  const token = useRecoilValue(authTokenState);
   const navigate = useNavigate();

  useEffect(() => {
      if (isTokenExpired(token)) {
        logout();
      }
    }, [token, navigate]);
  return (
    <main className="bg-white border-gray-200 dark:bg-gray-900">
         <Navbar />
         <section className="max-w-screen-xl mx-auto p-4">
         <div className="flex items-center justify-between space-y-2">
         <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Gestion de tipos de cultivo y parcelas
          </h2>
         </div>
         <div className="flex flex-col md:flex-row gap-4 mt-4">
         <div className="w-full md:w-1/2">
         <CartasCultivos/>
         </div>
         <div className="w-full md:w-1/2">
         <CartasTiposParcelas/>
         </div>
         </div>
         </section>
    </main>
  )
}

export default Cultivos_Parcelas