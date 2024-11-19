import axios from "axios";
import { ServiceResponse } from "../../../common/types/globals";
import Manager from "../../../common/api/manager";

export const obtenerProductores = async (): Promise<ServiceResponse> => {
  try {
    const response = await Manager.get("/productores/findall");
    return { data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Error desconocido" };
    } else {
      return { error: "Error inesperado" };
    }
  }
};

export const crearProductor = async (
  nombre: string,
  direccion: string,
  cedula: string
): Promise<ServiceResponse> => {
  try {
    const response = await Manager.post("/productores/create", {
      nombre,
      direccion,
      cedula,
    });
    return { data: response.data };
  } catch (error: unknown) {
    // Lanzar un error en caso de fallo
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error desconocido");
    } else {
      throw new Error("Error inesperado");
    }
  }
};

export const actualizarProductor = async (
  id: number,
  nombre: string,
  direccion: string,
  cedula: string
): Promise<ServiceResponse> => {
  try {
    const response = await Manager.put(`/productores/update/${id}`, {
      nombre,
      direccion,
      cedula,
    });
    return { data: response.data };
  } catch (error: unknown) {
    // Lanzar un error en caso de fallo
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error desconocido");
    } else {
      throw new Error("Error inesperado");
    }
  }
};

export const eliminarProductor = async (
  id: number
): Promise<ServiceResponse> => {
  try {
    const response = await Manager.delete(`/productores/delete/${id}`);
    return { data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Error desconocido");
    } else {
        throw new Error("Error inesperado");
    }
  }
};
