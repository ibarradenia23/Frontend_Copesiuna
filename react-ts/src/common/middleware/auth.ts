// src/components/AuthMiddleware.tsx
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { authTokenState } from '../../modules/auth/state/authAtom';
import { isTokenExpired } from '../../modules/auth/utils/tokenUtils';
import useAuth from '../../modules/auth/hooks/useAuth';


const AuthMiddleware: React.FC = () => {
    const navigate = useNavigate();
    const token = useRecoilValue(authTokenState);
    const {logout} = useAuth();
    const setToken = useSetRecoilState(authTokenState);

    useEffect(() => {
        if (isTokenExpired(token)) {
            // Limpiar el token y redirigir a login
            logout();
            setToken(null); // Limpiar el estado del token
            // Limpiar datos del localStorage
            navigate('/'); // Redirigir a la página de inicio de sesión
        }
    }, [token, navigate, setToken]);

    return null; // Este componente no renderiza nada
};

export default AuthMiddleware;