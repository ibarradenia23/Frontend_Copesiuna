import { useMutation } from "@tanstack/react-query";
import { LoginService } from "../api";
import { useRecoilState } from "recoil";
import { authTokenState } from "../state/authAtom";
import { userState } from "../state/userAtom";
import useAuth from "./useAuth";
import { LoginResponse } from "../models";
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const { initializeToken,initializeUser } = useAuth();
  const [token, setToken] = useRecoilState(authTokenState);
  const [user,setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, { email: string; password: string }>({
    mutationFn: (data: { email: string; password: string }) =>
      LoginService(data.email, data.password),
    onSuccess: (data: LoginResponse) => {
      if (data.data.Access_token && data.data.Usuario) {
        // Almacenar el token en localStorage
        localStorage.setItem("authToken", data.data?.Access_token);
        setToken(data.data.Access_token);
        initializeToken(); // Inicializar el token después del login
        console.log("Inicio de sesión exitoso:", data);

        const usuarios = data.data.Usuario; // Asumimos que esto es un array

        // Si el array está vacío, maneja el caso
        if (Array.isArray(usuarios) && usuarios.length === 0) {
          console.error("El array de usuarios está vacío.");
          return; // Salir de la función o manejar el error como desees
        }

        // Si hay usuarios, puedes usar find para obtener el primer usuario
        const usuario = Array.isArray(usuarios) ? usuarios.find(user => user) : usuarios;


        if(usuario){
          // Almacenar la información del usuario en localStorage y en el estado global
        localStorage.setItem("infoUser",JSON.stringify(data.data?.Usuario));
        
        setUser(usuario);
        initializeUser();
        }
        
        // Redirigir a la página de inicio
        navigate('/home');
        console.log(token,user);
      }
    },
    onError: (error) => {
      return error.message || "Error desconocido";
      console.error("Error en el inicio de sesión:", error);
    },
  });
};
