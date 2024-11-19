import axios from "axios";
import { ServiceResponse } from "../../../common/types/globals";
import Manager from "../../../common/api/manager";

export const obtenerParcelas = async():Promise<ServiceResponse> =>{
    try {
        const response = await Manager.get("/parcelas/findall");
        return {data: response.data}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Error desconocido");
          } else {
            throw new Error("Error inesperado");
          }
    }
}

export const createParcela = async(descripcion:string,tamaño_parcela:string,id_productor:number,id_cultivo:number,id_tipo_parcela:number): Promise<ServiceResponse> => {
    try {
        const response = await Manager.post("/parcelas/create",{
            descripcion,tamaño_parcela,id_productor,id_cultivo,id_tipo_parcela
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

export const actualizarParcela = async(id:number,descripcion:string,tamaño_parcela:string,id_productor:number,id_cultivo:number,id_tipo_parcela:number): Promise<ServiceResponse> => {
    try {
        const response = await Manager.put(`/parcelas/update/${id}`,{
            descripcion,tamaño_parcela,id_productor,id_cultivo,id_tipo_parcela
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

export const eliminarParcela = async (
    id: number
  ): Promise<ServiceResponse> => {
    try {
      const response = await Manager.delete(`/parcelas/delete/${id}`);
      return { data: response.data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "Error desconocido");
      } else {
          throw new Error("Error inesperado");
      }
    }
  };