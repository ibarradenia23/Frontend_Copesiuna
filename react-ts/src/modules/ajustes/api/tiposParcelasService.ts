import axios from "axios";
import { ServiceResponse } from "../../../common/types/globals";
import Manager from "../../../common/api/manager";

export const obtenerTiposParcelas = async(): Promise<ServiceResponse> => {
    try {
        const response = await Manager.get("/tipoparcelas/findall");
        return {data:response.data};
    } catch (error:unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Error desconocido");
          } else {
            throw new Error("Error inesperado");
          }
    }
}

export const crearTiposParcelas = async(descripcion:string): Promise<ServiceResponse> => {
    try {
        const response = await Manager.post("/tipoparcelas/create",{descripcion});
        return {data:response.data};
    } catch (error:unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Error desconocido");
          } else {
            throw new Error("Error inesperado");
          }
    }
}

export const actualizarTiposParcelas = async(id:number,descripcion:string): Promise<ServiceResponse> => {
    try {
        const response = await Manager.put(`/tipoparcelas/create/${id}`,{descripcion});
        return {data:response.data};
    } catch (error:unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Error desconocido");
          } else {
            throw new Error("Error inesperado");
          }
    }
}

export const eliminarTiposParcelas = async (
    id: number
  ): Promise<ServiceResponse> => {
    try {
      const response = await Manager.delete(`/tipoparcelas/delete/${id}`);
      return { data: response.data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "Error desconocido");
      } else {
          throw new Error("Error inesperado");
      }
    }
  };



