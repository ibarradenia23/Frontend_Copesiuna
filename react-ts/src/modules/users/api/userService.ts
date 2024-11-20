import axios from "axios";
import { ServiceResponse } from "../../../common/types/globals";
import Manager from "../../../common/api/manager";

export const obtenerUsers = async (): Promise<ServiceResponse> => {
    try {
      const response = await Manager.get("/users/findall");
      return { data: response.data };
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
    password:string
  ): Promise<ServiceResponse> => {
    try {
      const response = await Manager.post("/users/create", {
        nombre,
        apellido,
        telefono,
        email,
        password});
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

  export const actualizarUser = async (
    id:number,
    nombre: string,
    apellido: string,
    telefono: string,
    email:string,
    password:string
  ): Promise<ServiceResponse> => {
    try {
      const response = await Manager.put(`/users/update/${id}`, {
        nombre,
        apellido,
        telefono,
        email,
        password});
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

  export const eliminarUser = async (
    id: number
  ): Promise<ServiceResponse> => {
    try {
      const response = await Manager.delete(`/users/delete/${id}`);
      return { data: response.data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "Error desconocido");
      } else {
          throw new Error("Error inesperado");
      }
    }
  };
  