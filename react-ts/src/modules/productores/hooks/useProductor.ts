import { useMutation,useQuery } from "@tanstack/react-query";
import { actualizarProductor, crearProductor, eliminarProductor, obtenerProductores } from "../api/ProductorService";
import { ServiceResponse } from "../../../common/types/globals";

// Hook para obtener todos los productores
export const useObtenerProductores = () => {
    return useQuery(['productores'], obtenerProductores);
};

// Hook para crear un productor
export const useCrearProductor = () => {
    return useMutation({
        mutationFn: (data: { nombre: string; direccion: string; cedula: string }) =>
            crearProductor(data.nombre,data.direccion,data.cedula),
        onSuccess: (data: ServiceResponse) => {
            console.log('Productor creado con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al crear productor:', error);
        }
    });
};

// Hook para actualizar un productor
export const useActualizarProductor = () => {
    return useMutation({
        mutationFn: (data: { id: string; nombre: string; direccion: string; cedula: string }) =>
            actualizarProductor(data.id, data.nombre, data.direccion, data.cedula), // Asegúrate de llamar correctamente
        onSuccess: (data: ServiceResponse) => {
            console.log('Productor actualizado con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al actualizar productor:', error);
        }
    });
};

// Hook para eliminar un productor
export const useEliminarProductor = () => {
    return useMutation({
        mutationFn: (id: string) => eliminarProductor(id),
        onSuccess: (data: ServiceResponse) => {
            console.log('Productor eliminado con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al eliminar productor:', error);
        }
    });
};