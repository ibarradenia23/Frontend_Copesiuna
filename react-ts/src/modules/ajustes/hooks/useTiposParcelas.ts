import { useMutation,useQuery } from "@tanstack/react-query";
import { ServiceResponse } from "../../../common/types/globals";
import { actualizarTiposParcelas, crearTiposParcelas, eliminarTiposParcelas, obtenerTiposParcelas } from "../api/tiposParcelasService";

export const useObtenerTiposParcelas =()=>{
    return useQuery(['tiposParcelas'],obtenerTiposParcelas);
}

export const useCrearTiposParcela = () => {
    return useMutation({
        mutationFn: (data: { descripcion: string; }) =>
            crearTiposParcelas(data.descripcion),
        onSuccess: (data: ServiceResponse) => {
            console.log('Tipo de parcela creado con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al crear tipo de parcela:', error);
        }
    });
};

export const useActualizarTiposParcela = () => {
    return useMutation({
        mutationFn: (data: { id:number; descripcion: string; }) =>
            actualizarTiposParcelas(data.id,data.descripcion),
        onSuccess: (data: ServiceResponse) => {
            console.log('Tipo de parcela editado con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al editar tipo de parcela:', error);
        }
    });
};

export const useEliminarTipoParcela = () => {
    return useMutation({
        mutationFn: (id: number) => eliminarTiposParcelas(id),
        onSuccess: (data: ServiceResponse) => {
            console.log('Tipo de parcela eliminado con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al eliminar tipo de parcela:', error);
        }
    });
};