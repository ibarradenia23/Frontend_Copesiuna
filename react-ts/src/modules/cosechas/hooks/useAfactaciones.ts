import { useMutation,useQuery } from "@tanstack/react-query";
import { ServiceResponse } from "../../../common/types/globals";
import { actualizarAfectaciones, createAfectaciones, eliminarAfectaciones, obtenerAfectaciones } from "../api/afectacionesService";

//Hook para traer todas las afectaciones
export const useObtenerAfectaciones =()=>{
    return useQuery(['afectaciones'],
        obtenerAfectaciones
    );
}

//Hook para crear una afectacion
export const useCreateAfectacion =()=>{
    return useMutation({
        mutationFn: (data:{nombre:string; descripcion:string; }) =>
            createAfectaciones(data.nombre,data.descripcion),
        onSuccess: (data:ServiceResponse) => {
            console.log("Afectacion creada con exito",data);
        },
        onError: (error) => {
            console.error('Error al crear la afectacion:', error);
        }
    })
}

//Hook para actualizar una afectacion
export const useActualizarAfectacion =()=>{
    return useMutation({
        mutationFn: (data:{id:number; nombre:string; descripcion:string; }) =>
            actualizarAfectaciones(data.id,data.nombre,data.descripcion),
        onSuccess: (data:ServiceResponse) => {
            console.log("Afectacion editada con exito",data);
        },
        onError: (error) => {
            console.error('Error al editar la afectacion:', error);
        }
    })
}

//Hook para eliminar una afectacion
export const useEliminarAfectacion = () => {
    return useMutation({
        mutationFn: (id: number) => eliminarAfectaciones(id),
        onSuccess: (data: ServiceResponse) => {
            console.log('Afectacion eliminada con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al eliminar afectacion:', error);
        }
    });
};