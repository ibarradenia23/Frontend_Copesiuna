import { useMutation, useQuery } from "@tanstack/react-query";
import { actualizarBitacoraAnalisisSuelo, actualizarPropiedadSuelo, eliminarBitacoraEstimacionSuelo, obtenerBitacorasEstimacionSuelo } from "../api/estimacionSueloService";
import { ServiceResponse } from "../../../common/types/globals";

export const useObtenerEstimacionesSuelo =()=>{
    return useQuery(["estimacionesSuelo"],obtenerBitacorasEstimacionSuelo);
}

// Hook para editar un analisis de suelo
export const useActualizarAnalisisSuelo = () => {
  return useMutation({
    mutationFn: (data: {
        id: number;
        tectura: string;
        color: string;
        ph: string;
        nitrogen: string;
        potassium: string;
        aluminum: string;
        calcium: string;
        ferric_iron: string;
        humus: string;
        magnecium: string;
        nitrite_nitrogeno: string;
        sulfate: string;
    }) =>
      actualizarBitacoraAnalisisSuelo(
        data.id,
        data.tectura,
        data.color,
        data.ph,
        data.nitrogen,
        data.potassium,
        data.aluminum,
        data.calcium,
        data.ferric_iron,
        data.humus,
        data.magnecium,
        data.nitrite_nitrogeno,
        data.sulfate
      ),
    onSuccess: (data: ServiceResponse) => {
      console.log("Analisis de suelo actualizado con éxito:", data);
    },
    onError: (error) => {
      console.error("Error al actualizar analisis de suelo:", error);
    },
  });
};

export const useActualizarPropiedadesSuelo = () => {
    return useMutation({
        mutationFn: (data: {
            id: number;
            nombre: string;
            dato: string;
            id_analisis_suelo: number;
        }) =>
          actualizarPropiedadSuelo(
            data.id,
            data.nombre,
            data.dato,
            data.id_analisis_suelo
          ),
        onSuccess: (data: ServiceResponse) => {
          console.log("Analisis de suelo actualizado con éxito:", data);
        },
        onError: (error) => {
          console.error("Error al actualizar analisis de suelo:", error);
        },
    })
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