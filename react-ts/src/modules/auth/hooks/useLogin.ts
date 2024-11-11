import { useMutation } from "@tanstack/react-query";
import { LoginService } from "../api";
import { ServiceResponse } from "../../../common/types/globals";

export const useLogin =()=>{
    return useMutation({
        mutationFn:(data:{email:string;password:string}) =>
            LoginService(data.email,data.password),
        onSuccess:(data:ServiceResponse) => {
            console.log('Inicio de sesión exitoso:', data);
        },
        onError:(error) =>{
            console.error('Error en el inicio de sesión:', error);
        }
    })
}