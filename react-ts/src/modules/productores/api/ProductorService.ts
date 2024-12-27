import axios from "axios";
import { ServiceResponse, ValidationErrors } from "../../../common/types/globals";
import Manager from "../../../common/api/manager";

export const obtenerProductores = async (): Promise<ServiceResponse> => {
  try {
    const response = await Manager.get("/api/productores/findall");
    return { data: response.data?.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error desconocido");
    } else {
      throw new Error("Error inesperado");
    }
  }
};

export const crearProductor = async (
  nombre: string,
  apellido:string,
  direccion: string,
  cedula: string
): Promise<ServiceResponse> => {
  try {
    const response = await Manager.post("/api/productores/create", {
      nombre,
      apellido,
      direccion,
      cedula,
    });
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

export const actualizarProductor = async (
  id: number,
  nombre: string,
  apellido:string,
  direccion: string,
  cedula: string
): Promise<ServiceResponse> => {
  try {
    const response = await Manager.patch(`/api/productores/update/${id}`, {
      nombre,
      apellido,
      direccion,
      cedula,
    });
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

export const eliminarProductor = async (
  id: number
): Promise<ServiceResponse> => {
  try {
    const response = await Manager.delete(`/api/productores/delete/${id}`);
    return { data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Error desconocido");
    } else {
        throw new Error("Error inesperado");
    }
  }
};
