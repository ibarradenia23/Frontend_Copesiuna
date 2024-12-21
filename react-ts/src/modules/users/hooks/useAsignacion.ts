import { useMutation,useQuery } from "@tanstack/react-query";
import { ServiceResponse } from "../../../common/types/globals";
import { actualizarAsignacion, crearAsignacion, eliminarAsignacion, obtenerAsignaciones } from "../api/asignacionService";


export const useObtenerAsignaciones =()=>{
    return useQuery(['asignaciones'],obtenerAsignaciones);
}

export const useCrearAsignacion = () => {
    return useMutation({
        mutationFn:(data:{ID_productor: number,
            ID_user: number,
            tipo: string}) =>
                crearAsignacion(data.ID_productor,data.ID_user,data.tipo),
            onSuccess: (data: ServiceResponse) => {
                console.log('Asignacion creada con exito',data);
            },
            onError: (error) => {
                console.error('Error al crear la asignacion:', error);
            }
    })
}

export const useActualizarAsignacion = () => {
    return useMutation({
        mutationFn:(data:{id:number;ID_productor: number,
            ID_user: number,
            tipo: string}) =>
                actualizarAsignacion(data.id,data.ID_productor,data.ID_user,data.tipo),
            onSuccess: (data: ServiceResponse) => {
                console.log('Asignacion editada con exito',data);
            },
            onError: (error) => {
                console.error('Error al editar la asignacion:', error);
            }
    })
}

export const useEliminarAsignacion = () => {
    return useMutation({
        mutationFn: (id: number) => eliminarAsignacion(id),
        onSuccess: (data: ServiceResponse) => {
            console.log('Asignacion eliminado con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al eliminar asignacion:', error);
        }
    });
};