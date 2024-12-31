import React, { ReactNode, useEffect, useState } from 'react';
import {Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authTokenState } from '../../modules/auth/state/authAtom'; // Asegúrate de importar tu estado de token

interface Props {
    element:ReactNode;
}

const ProtectedRoute:React.FC<Props> = ({ element }) => {
    const token = useRecoilValue(authTokenState);
    const [isTokenReady, setIsTokenReady] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
          // Simula la inicialización del token o espera hasta que esté disponible
          if (token !== undefined) {
            setIsTokenReady(true);
          } else {
            // Espera si aún no se inicializó el token
            const interval = setInterval(() => {
              if (token !== undefined) {
                setIsTokenReady(true);
                clearInterval(interval);
              }
            }, 100); // Chequea cada 100ms si el token ya está listo
          }
        };
    
        checkToken();
      }, [token]);
    
      if (!isTokenReady) {
        // Mostrar un indicador de carga mientras se verifica el token
        return <div>Loading...</div>;
      }
  
   
    if (token ) {
      return element; // Si el token es válido, renderiza el elemento
    } else {
      return <Navigate to="/" replace />; // Si no, redirige a login
    }
  };

export default ProtectedRoute;