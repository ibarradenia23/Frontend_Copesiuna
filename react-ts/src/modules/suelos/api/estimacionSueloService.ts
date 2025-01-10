import axios from "axios";
import Manager from "../../../common/api/manager";
import {
  ServiceResponse,
  ValidationErrors,
} from "../../../common/types/globals";

export const obtenerBitacorasEstimacionSuelo = async (): Promise<ServiceResponse> => {
  try {
    const response = await Manager.get("api/analisissuelo/findall");
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
