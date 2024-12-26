import axios from "axios";
import { ServiceResponse, ServiceResponseParcelas } from "../../../common/types/globals";
import Manager from "../../../common/api/manager";

export const obtenerParcelas = async():Promise<ServiceResponseParcelas> =>{
    try {
        const response = await Manager.get("/api/parcelas/findall");
        return {data: response.data.data}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Error desconocido");
          } else {
            throw new Error("Error inesperado");
          }
    }
}

export const createParcela = async(descripcion:string,tamaño_parcela:string,productorId:number,cultivoId:number,tipoParcelaId:number): Promise<ServiceResponse> => {
    try {
        const response = await Manager.post("/api/parcelas/create",{
            descripcion,tamaño_parcela,productorId,cultivoId,tipoParcelaId
        });
        return {data: response.data}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Error desconocido");
          } else {
            throw new Error("Error inesperado");
          }
        
    }
}

export const actualizarParcela = async(id:number,descripcion:string,tamaño_parcela:string): Promise<ServiceResponse> => {
    try {
        const response = await Manager.patch(`/api/parcelas/update/${id}`,{
            descripcion,tamaño_parcela
        });
        return {data: response.data.data}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Error desconocido");
          } else {
            throw new Error("Error inesperado");
          }
        
    }
}

export const eliminarParcela = async (
    id: number
  ): Promise<ServiceResponse> => {
    try {
      const response = await Manager.delete(`/api/parcelas/delete/${id}`);
      return { data: response.data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "Error desconocido");
      } else {
          throw new Error("Error inesperado");
      }
    }
  };