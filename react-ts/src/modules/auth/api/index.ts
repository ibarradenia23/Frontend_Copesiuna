import axios from "axios";
import Manager from "../../../common/api/manager";
import { LoginResponse } from "../models";

export const LoginService = async (email:string, password:string):Promise<LoginResponse> =>{
  try {
    const response = await Manager.post("/login",{email,password});
    const token = response.data.token
    console.log(token)
    return {token}
  } catch (error) {
    if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.message || "Error iniciando sesión" };
      } else {
        return { error: "Error inesperado" };
      }
  }
}