import axios from "axios";
import Manager from "../../../common/api/manager";
import { LoginResponse } from "../models";
import {
  ServiceResponse,
  ValidationErrors,
} from "../../../common/types/globals";

export const LoginService = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await Manager.post("/auth/signin", { email, password });
    const data = response.data;
    // Verifica si hay un mensaje de error en la respuesta
    if (data.message) {
      throw new Error(data.message); // Lanza un error con el mensaje del servidor
    }
    console.log("respuesta", data);
    return { data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || "Error desconocido";
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

export const EnviarCorreoService = async (
  email: string
): Promise<ServiceResponse> => {
  try {
    const response = await Manager.post("/api/users/reset-password", {
      email,
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

export const newPasswordService = async (
  token: string,
  password: string
): Promise<ServiceResponse> => {
  try {
    const response = await Manager.post("/api/users/setup-password", {
      token,
      password,
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
