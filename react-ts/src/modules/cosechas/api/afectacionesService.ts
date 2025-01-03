import axios from "axios";
import Manager from "../../../common/api/manager";
import { ServiceResponse, ValidationErrors } from "../../../common/types/globals";

export const obtenerAfectaciones = async (): Promise<ServiceResponse> => {
    try {
      const response = await Manager.get("/api/afectacionesmazorca/findall");
      return { data: response.data.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Error desconocido";
        const validationErrors = error.response?.data?.errors as ValidationErrors; 
  
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
  };

  export const createAfectaciones = async (
    nombre:string,
    descripcion: string,
  ): Promise<ServiceResponse> => {
    try {
      const response = await Manager.post("/api/afectacionesmazorca/create", {
        nombre,
        descripcion,
      });
      return { data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Error desconocido";
        const validationErrors = error.response?.data?.errors as ValidationErrors; 
  
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
  };

  
  export const actualizarAfectaciones = async (
    id:number,
    nombre:string,
    descripcion: string,
  ): Promise<ServiceResponse> => {
    try {
      const response = await Manager.patch(`/api/afectacionesmazorca/update/${id}`, {
        nombre,
        descripcion,
      });
      return { data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Error desconocido";
        const validationErrors = error.response?.data?.errors as ValidationErrors; 
  
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
  };

  export const eliminarAfectaciones = async (id: number): Promise<ServiceResponse> => {
    try {
      const response = await Manager.delete(`/api/afectacionesmazorca/delete/${id}`);
      return { data: response.data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Error desconocido";
        const validationErrors = error.response?.data?.errors as ValidationErrors; 
  
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
  };
  