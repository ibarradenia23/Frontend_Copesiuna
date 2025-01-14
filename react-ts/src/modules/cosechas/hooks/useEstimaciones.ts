import { useMutation, useQuery } from "@tanstack/react-query";
import { eliminarBitacoraCosechas, obtenerBitacorasCosecha } from "../api/estimacionesService";
import { ServiceResponse } from "../../../common/types/globals";

export const useObtenerEstimaciones = () => {
  return useQuery(["estimacionesCosecha"], obtenerBitacorasCosecha);
};

// Hook para eliminar una estimacion de cosecha
export const useEliminarEstimacionCosecha= () => {
    return useMutation({
        mutationFn: (id: number) => eliminarBitacoraCosechas(id),
        onSuccess: (data: ServiceResponse) => {
            console.log('Estimacion de cosechas eliminada con éxito:', data);
        },
        onError: (error) => {
            console.error('Error al eliminar estimacion de cosechas:', error);
        }
    });
};