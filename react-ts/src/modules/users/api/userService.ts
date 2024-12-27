import axios from "axios";
import { ServiceResponse, ValidationErrors } from "../../../common/types/globals";
import Manager from "../../../common/api/manager";



export const obtenerUsers = async (): Promise<ServiceResponse> => {
    try {
      const response = await Manager.get("/api/users/findall");
      return { data: response.data.data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Error desconocido");
      } else {
        throw new Error("Error inesperado");
      }
    }
  };

  export const crearUser = async (
    nombre: string,
    apellido: string,
    telefono: string,
    email:string,
    role:string,
    password:string
  ): Promise<ServiceResponse> => {
    try {
      const response = await Manager.post("/api/users/create", {
        nombre,
        apellido,
        telefono,
        email,
        role,
        password});
      return { data: response.data };
    } catch (error: unknown) {
       // Lanzar un error en caso de fallo
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
  };

  export const actualizarUser = async (
    id:number,
    nombre: string,
    apellido: string,
    telefono: string,
    email:string,
    role:string,
    password:string
  ): Promise<ServiceResponse> => {
    try {
      const response = await Manager.patch(`/api/users/update/${id}`, {
        nombre,
        apellido,
        telefono,
        email,
        role,
        password});
      return { data: response.data.data };
    } catch (error: unknown) {
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
  };

  export const eliminarUser = async (
    id: number
  ): Promise<ServiceResponse> => {
    try {
      const response = await Manager.delete(`/api/users/delete/${id}`);
      return { data: response.data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "Error desconocido");
      } else {
          throw new Error("Error inesperado");
      }
    }
  };
  