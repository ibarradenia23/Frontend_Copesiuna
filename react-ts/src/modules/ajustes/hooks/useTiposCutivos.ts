import { useMutation,useQuery } from "@tanstack/react-query";
import { ServiceResponse } from "../../../common/types/globals";
import { actualizarTiposCultivos, crearTiposCultivos, eliminarTiposCultivos, obtenerTiposCultivos } from "../api/tiposCultivosService";

export const useObtenerTiposCultivos =()=>{
    return useQuery(['tiposCultivos'],obtenerTiposCultivos);
}

export const useCrearTiposCultivo = () => {
    return useMutation({
        mutationFn: (data: { cultivo:string; edad:string; }) =>
            crearTiposCultivos(data.cultivo,data.edad),
        onSuccess: (data: ServiceResponse) => {
            console.log('Cultivo creado con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al crear cultivo:', error);
        }
    });
};

export const useActualizarTiposCultivo = () => {
    return useMutation({
        mutationFn: (data: {id:number; cultivo:string; edad:string; }) =>
            actualizarTiposCultivos(data.id,data.cultivo,data.edad),
        onSuccess: (data: ServiceResponse) => {
            console.log('Cultivo editado con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al editar cultivo:', error);
        }
    });
};

export const useEliminarTipoCultivo = () => {
    return useMutation({
        mutationFn: (id: number) => eliminarTiposCultivos(id),
        onSuccess: (data: ServiceResponse) => {
            console.log('Cultivo eliminado con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al eliminar cultivo:', error);
        }
    });
};