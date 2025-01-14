import { useMutation, useQuery } from "@tanstack/react-query";
import { eliminarBitacoraEstimacionSuelo, obtenerBitacorasEstimacionSuelo } from "../api/estimacionSueloService";
import { ServiceResponse } from "../../../common/types/globals";

export const useObtenerEstimacionesSuelo =()=>{
    return useQuery(["estimacionesSuelo"],obtenerBitacorasEstimacionSuelo);
}

// Hook para eliminar un analisis de suelo
export const useEliminarAnalisisSuelo= () => {
    return useMutation({
        mutationFn: (id: number) => eliminarBitacoraEstimacionSuelo(id),
        onSuccess: (data: ServiceResponse) => {
            console.log('Analisis de suelo eliminado con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al eliminar analisis de suelo:', error);
        }
    });
};