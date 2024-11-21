import axios from "axios";
import { ServiceResponse } from "../../../common/types/globals";
import Manager from "../../../common/api/manager";

export const obtenerTiposCultivos = async(): Promise<ServiceResponse> => {
    try {
        const response = await Manager.get("/cultivos/findall");
        return {data:response.data};
    } catch (error:unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Error desconocido");
          } else {
            throw new Error("Error inesperado");
          }
    }
}

export const crearTiposCultivos = async(cultivo:string,edad:string): Promise<ServiceResponse> => {
    try {
        const response = await Manager.post("/cultivos/create",{
        cultivo,
        edad
        });
        return {data:response.data};
    } catch (error:unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Error desconocido");
          } else {
            throw new Error("Error inesperado");
          }
    }
}

export const actualizarTiposCultivos = async(id:number,cultivo:string,edad:string): Promise<ServiceResponse> => {
    try {
        const response = await Manager.put(`/cultivos/update/${id}`,{
        cultivo,
        edad
        });
        return {data:response.data};
    } catch (error:unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Error desconocido");
          } else {
            throw new Error("Error inesperado");
          }
    }
}

export const eliminarTiposCultivos = async (
    id: number
  ): Promise<ServiceResponse> => {
    try {
      const response = await Manager.delete(`/cultivos/delete/${id}`);
      return { data: response.data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "Error desconocido");
      } else {
          throw new Error("Error inesperado");
      }
    }
  };
  