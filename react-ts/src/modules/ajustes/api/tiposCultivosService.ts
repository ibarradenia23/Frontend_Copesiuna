import axios from "axios";
import { ServiceResponse } from "../../../common/types/globals";
import Manager from "../../../common/api/manager";

export const obtenerTiposCultivos = async(): Promise<ServiceResponse> => {
    try {
        const response = await Manager.get("/api/cultivos/findall");
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
        const response = await Manager.post("/api/cultivos/create",{
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
        const response = await Manager.patch(`/api/cultivos/update/${id}`,{
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
      const response = await Manager.delete(`/api/cultivos/delete/${id}`);
      return { data: response.data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "Error desconocido");
      } else {
          throw new Error("Error inesperado");
      }
    }
  };
  