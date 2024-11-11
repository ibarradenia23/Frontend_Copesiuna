import { useRecoilState } from 'recoil';
import { authTokenState } from '../state/authAtom';

const useAuth = () => {
    const [token, setToken] = useRecoilState(authTokenState);

    const logout = () => {
        // Eliminar el token de localStorage
        localStorage.removeItem('authToken');
        setToken(null);
    };

    const initializeToken = () => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    };

    return { token, logout, initializeToken };
};

export default useAuth;