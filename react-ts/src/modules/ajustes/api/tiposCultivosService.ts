import axios from "axios";
import { ServiceResponse, ValidationErrors } from "../../../common/types/globals";
import Manager from "../../../common/api/manager";

export const obtenerTiposCultivos = async(): Promise<ServiceResponse> => {
    try {
        const response = await Manager.get("/api/cultivos/findall");
        return {data:response.data.data};
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

export const crearTiposCultivos = async(cultivo:string,edad:string): Promise<ServiceResponse> => {
    try {
        const response = await Manager.post("/api/cultivos/create",{
        cultivo,
        edad
        });
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
  