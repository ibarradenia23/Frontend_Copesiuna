import axios from "axios";
import { ServiceResponse } from "../../../common/types/globals";
import Manager from "../../../common/api/manager";

export const obtenerAsignaciones = async (): Promise<ServiceResponse> => {
  try {
    const response = await Manager.get("/api/asignacion/findall");
    return { data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error desconocido");
    } else {
      throw new Error("Error inesperado");
    }
  }
};

export const crearAsignacion = async (
  ID_productor: number,
  ID_user: number,
  tipo: string
): Promise<ServiceResponse> => {
  try {
    const response = await Manager.post("/api/asignacion/create", {
      ID_productor,
      ID_user,
      tipo,
    });
    return { data: response.data };
  } catch (error) {
    // Lanzar un error en caso de fallo
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error desconocido");
    } else {
      throw new Error("Error inesperado");
    }
  }
};

export const actualizarAsignacion = async (
  id: number,
  ID_productor: number,
  ID_user: number,
  tipo: string
): Promise<ServiceResponse> => {
  try {
    const response = await Manager.patch(`/api/asignacion/update/${id}`, {
      ID_productor,
      ID_user,
      tipo,
    });
    return { data: response.data };
  } catch (error) {
    // Lanzar un error en caso de fallo
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error desconocido");
    } else {
      throw new Error("Error inesperado");
    }
  }
};

export const eliminarAsignacion = async (
  id: number
): Promise<ServiceResponse> => {
  try {
    const response = await Manager.delete(`/api/asignacion/delete/${id}`);
    return { data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error desconocido");
    } else {
      throw new Error("Error inesperado");
    }
  }
};
