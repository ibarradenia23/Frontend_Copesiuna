import { useQuery } from "@tanstack/react-query";
import { obtenerBitacorasCosecha } from "../api/estimacionesService";

export const useObtenerEstimaciones = () => {
  return useQuery(["estimacionesCosecha"], obtenerBitacorasCosecha);
};
