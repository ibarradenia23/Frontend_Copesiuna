import axios from "axios";
import Manager from "../../../common/api/manager";
import { LoginResponse } from "../models";

export const LoginService = async (email:string, password:string):Promise<LoginResponse> =>{
  try {
    const response = await Manager.post("/auth/signin",{email,password});
    const data = response.data
    // Verifica si hay un mensaje de error en la respuesta
    if (data.message) {
      throw new Error(data.message); // Lanza un error con el mensaje del servidor
    }
    console.log("respuesta",data);
    return {data}
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error iniciando sesión");
      } else if (error instanceof Error) {
        // Si es un error genérico, lanza el mensaje de error
        throw new Error(error.message);
      } else {
        // Para cualquier otro tipo de error, lanza un mensaje genérico
        throw new Error("Error inesperado");
      }
  }
}