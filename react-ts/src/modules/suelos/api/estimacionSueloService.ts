import axios from "axios";
import Manager from "../../../common/api/manager";
import {
  ServiceResponse,
  ServiceResponseGeneric,
  ValidationErrors,
} from "../../../common/types/globals";
import { EstimacionSueloInterface } from "../models";

export const obtenerBitacorasEstimacionSuelo =
  async (): Promise<ServiceResponse> => {
    try {
      const response = await Manager.get("api/analisissuelo/findall");
      return { data: response.data.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Error desconocido";
        const validationErrors = error.response?.data
          ?.errors as ValidationErrors;

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

  export const obtenerBitacoraEstimacionSuelo =
  async (id:number): Promise<ServiceResponseGeneric<EstimacionSueloInterface>> => {
    try {
      const response = await Manager.get(`api/analisissuelo/find/${id}`);
      return { data: response.data.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Error desconocido";
        const validationErrors = error.response?.data
          ?.errors as ValidationErrors;

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

export const actualizarBitacoraAnalisisSuelo = async (
  id: number,
  tectura: string,
  color: string,
  ph: string,
  nitrogen: string,
  potassium: string,
  aluminum: string,
  calcium: string,
  ferric_iron: string,
  humus: string,
  magnecium: string,
  nitrite_nitrogeno: string,
  sulfate: string
): Promise<ServiceResponse> => {
  try {
    const response = await Manager.patch(`/api/analisissuelo/update/${id}`, {
      tectura,
      color,
      ph,
      nitrogen,
      potassium,
      aluminum,
      calcium,
      ferric_iron,
      humus,
      magnecium,
      nitrite_nitrogeno,
      sulfate,
    });
    return { data: response.data.data };
  } catch (error) {
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

export const actualizarPropiedadSuelo = async (
  id: number,
  nombre: string,
  dato: string,
): Promise<ServiceResponse> => {
  try {
   const response = await Manager.patch(`/api/propiedadesuelo/update/${id}`,{
    nombre,
    dato,
   })
   return {data:response.data.data}
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

export const eliminarBitacoraEstimacionSuelo = async (
  id: number
): Promise<ServiceResponse> => {
  try {
    const response = await Manager.delete(`/api/analisissuelo/delete/${id}`);
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
