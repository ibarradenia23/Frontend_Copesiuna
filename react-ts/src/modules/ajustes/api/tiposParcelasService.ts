import axios from "axios";
import { ServiceResponse, ValidationErrors } from "../../../common/types/globals";
import Manager from "../../../common/api/manager";

export const obtenerTiposParcelas = async(): Promise<ServiceResponse> => {
    try {
        const response = await Manager.get("/api/tipoparcelas/findall");
        return {data:response.data.data};
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
        const response = await Manager.post("/api/tipoparcelas/create",{descripcion});
        return {data:response.data};
    } catch (error:unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Error desconocido";
        const validationErrors = error.response?.data?.errors as ValidationErrors; // Asegúrate de que sea del tipo ValidationErrors
  
        // Si hay errores de validación, construimos un mensaje detallado
        if (validationErrors) {
          const detailedErrors = Object.entries(validationErrors)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("; ");
          throw new Error(`${errorMessage}: ${detailedErrors}`);
        }
  
        throw new Error(errorMessage);
      } else {
        throw new Error("Error inesperado");
      }
    }
}

export const actualizarTiposParcelas = async(id:number,descripcion:string): Promise<ServiceResponse> => {
    try {
        const response = await Manager.put(`/api/tipoparcelas/create/${id}`,{descripcion});
        return {data:response.data};
    } catch (error:unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Error desconocido";
        const validationErrors = error.response?.data?.errors as ValidationErrors; // Asegúrate de que sea del tipo ValidationErrors
  
        // Si hay errores de validación, construimos un mensaje detallado
        if (validationErrors) {
          const detailedErrors = Object.entries(validationErrors)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("; ");
          throw new Error(`${errorMessage}: ${detailedErrors}`);
        }
  
        throw new Error(errorMessage);
      } else {
        throw new Error("Error inesperado");
      }
    }
}

export const eliminarTiposParcelas = async (
    id: number
  ): Promise<ServiceResponse> => {
    try {
      const response = await Manager.delete(`/api/tipoparcelas/delete/${id}`);
      return { data: response.data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "Error desconocido");
      } else {
          throw new Error("Error inesperado");
      }
    }
  };



