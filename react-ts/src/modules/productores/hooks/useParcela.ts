import { useMutation,useQuery } from "@tanstack/react-query";
import { ServiceResponse, ServiceResponseParcelas } from "../../../common/types/globals";
import { actualizarParcela, createParcela, eliminarParcela, obtenerParcelas } from "../api/ParcelaService";

export const useObtenerParcelas =()=>{
    return useQuery<ServiceResponseParcelas,Error>(['parcelas'],obtenerParcelas);
}

export const useCreateParcela =()=>{
    return useMutation({
        mutationFn: (data:{descripcion:string; tamaño_parcela:string; productorId:number; cultivoId:number; tipoParcelaId:number}) =>
            createParcela(data.descripcion, data.tamaño_parcela, data.productorId, data.cultivoId,data.tipoParcelaId),
        onSuccess: (data:ServiceResponse) => {
            console.log("parcela creada con exito",data);
        },
        onError: (error) => {
            console.error('Error al crear la parcela:', error);
        }
    })
}
export const useActualizarParcela =()=>{
    return useMutation({
        mutationFn: (data:{id:number, descripcion:string; tamaño_parcela:string;}) =>
            actualizarParcela(data.id, data.descripcion, data.tamaño_parcela),
        onSuccess: (data:ServiceResponse) => {
            console.log("parcela editada con exito",data);
        },
        onError: (error) => {
            console.error('Error al editar la parcela:', error);
        }
    })
}

export const useEliminarParcela = () => {
    return useMutation({
        mutationFn: (id: number) => eliminarParcela(id),
        onSuccess: (data: ServiceResponse) => {
            console.log('Parcela eliminado con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al eliminar parcela:', error);
        }
    });
};