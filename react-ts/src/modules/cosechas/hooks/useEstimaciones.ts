import { useMutation, useQuery } from "@tanstack/react-query";
import { actualizarMazorca, eliminarBitacoraCosechas, obtenerBitacorasCosecha, obtenerBitacorasCosechaPorID } from "../api/estimacionesService";
import { ServiceResponse } from "../../../common/types/globals";

//Hook para traer todas las estimaciones
export const useObtenerEstimaciones = () => {
  return useQuery(["estimacionesCosecha"], obtenerBitacorasCosecha);
};

//Hook para traer solo una estimacion
export const useObtenerEstimacion =(id:number)=>{
return useQuery(["estimacionesCosecha",id],()=>obtenerBitacorasCosechaPorID(id),{
  enabled: !!id, // Solo ejecutar la consulta si el ID es válido
})
}

//Hook para actualizar una mazorca de la estimacion de cosechas
export const useActualizarMazorcas= () => {
    return useMutation({
        mutationFn: (data: {
            id: number;
            cantidad: number;
            ID_afectacion: number;
        }) =>
          actualizarMazorca(
            data.id,
            data.cantidad,
            data.ID_afectacion,
          ),
        onSuccess: (data: ServiceResponse) => {
          console.log("Mazorca actualizada con éxito:", data);
        },
        onError: (error) => {
          console.error("Error al actualizar mazorca:", error);
        },
    })
}

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