import { useMutation } from "@tanstack/react-query";
import { LoginService } from "../api";
import { useRecoilState } from "recoil";
import { authTokenState } from "../state/authAtom";
import useAuth from "./useAuth";
import { LoginResponse } from "../models";
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const { initializeToken } = useAuth();
  const [token, setToken] = useRecoilState(authTokenState);
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, { email: string; password: string }>({
    mutationFn: (data: { email: string; password: string }) =>
      LoginService(data.email, data.password),
    onSuccess: (data: LoginResponse) => {
      if (data.data.Access_token) {
        // Almacenar el token en localStorage
        localStorage.setItem("authToken", data.data?.Access_token);
        setToken(data.data.Access_token);
        initializeToken(); // Inicializar el token después del login
        console.log("Inicio de sesión exitoso:", data);

        // Redirigir a la página de inicio
        navigate('/home');
        console.log(token)
      }
    },
    onError: (error) => {
      return error.message || "Error desconocido";
      console.error("Error en el inicio de sesión:", error);
    },
  });
};
