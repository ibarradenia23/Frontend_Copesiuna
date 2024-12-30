import { useRecoilState } from 'recoil';
import { authTokenState } from '../state/authAtom';
import { userState } from '../state/userAtom';

const useAuth = () => {
    const [token, setToken] = useRecoilState(authTokenState);
    const [user,setUser] = useRecoilState(userState);

    const logout = () => {
        // Eliminar el token de localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('infoUser');
        setUser(null);
        setToken(null);
    };

    const initializeToken = () => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    };

    const initializeUser =()=>{
        const storedUser = localStorage.getItem('infoUser');
        if(storedUser){
            setUser(JSON.parse(storedUser))
        }
    }

    return { token, logout, initializeToken, user, initializeUser };
};

export default useAuth;