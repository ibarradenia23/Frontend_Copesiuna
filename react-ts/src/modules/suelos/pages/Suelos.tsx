import React, { useEffect } from 'react'
import Navbar from '../../../common/components/Navbar'
import useAuth from '../../auth/hooks/useAuth';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { authTokenState } from '../../auth/state/authAtom';
import { isTokenExpired } from '../../auth/utils/tokenUtils';

const Suelos = () => {
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
            
         </section>
    </main>
  )
}

export default Suelos