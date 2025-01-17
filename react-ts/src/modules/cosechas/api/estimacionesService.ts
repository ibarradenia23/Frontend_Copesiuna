import axios from "axios";
import Manager from "../../../common/api/manager";
import { ServiceResponse, ServiceResponseGeneric, ValidationErrors } from "../../../common/types/globals";
import { EstimacionCosechaInterface } from "../models";

export const obtenerBitacorasCosecha = async (): Promise<ServiceResponse> => {
try {
    const response = await Manager.get("api/estimacioncosecha/findall");
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
}
export const obtenerBitacorasCosechaPorID = async (id:number): Promise<ServiceResponseGeneric<EstimacionCosechaInterface>> => {
try {
    const response = await Manager.get(`api/estimacioncosecha/find/${id}`);
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
}

export const actualizarMazorca = async (
  id: number,
  cantidad: number,
  ID_afectacion: number,
): Promise<ServiceResponse> => {
  try {
   const response = await Manager.patch(`/api/mazorcas/update/${id}`,{
    cantidad,
    ID_afectacion,
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


export const eliminarBitacoraCosechas =async(id:number):Promise<ServiceResponse>=>{
  try {
    const response = await Manager.delete(`/api/estimacioncosecha/delete/${id}`);
    return {data:response.data}
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
  }
  