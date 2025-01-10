import React, { useEffect, useState } from 'react'
import Navbar from '../../../common/components/Navbar'
import useAuth from '../../auth/hooks/useAuth';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { authTokenState } from '../../auth/state/authAtom';
import { isTokenExpired } from '../../auth/utils/tokenUtils';
import { FileSpreadsheet} from 'lucide-react';
import { useObtenerEstimacionesSuelo } from '../hooks/useEstimacionSuelo';
import { EstimacionSueloInterface } from '../models';
import EstimacionSueloCard from '../components/EstimacionSueloCard';

const Suelos = () => {
  const {logout} = useAuth();
  const token = useRecoilValue(authTokenState);
  const navigate = useNavigate();
  const {data:estimacionSueloResponse} = useObtenerEstimacionesSuelo();
  const [estimacionesSuelos,setEstimacionesSuelos] = useState<EstimacionSueloInterface[]>([]);

  const traerEstimacionesSuelos =()=>{
    if(estimacionSueloResponse && Array.isArray(estimacionSueloResponse.data)){
      setEstimacionesSuelos(estimacionSueloResponse.data);
    }
  }

  useEffect(()=>{
    traerEstimacionesSuelos();
  },[estimacionSueloResponse]);

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
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <button className="bg-primary hover:bg-[#016F35] text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none flex align-middle items-center gap-2">
              <FileSpreadsheet/> Exportar a exel
            </button>
          </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          <EstimacionSueloCard/>
        </div>
         </section>
    </main>
  )
}

export default Suelos