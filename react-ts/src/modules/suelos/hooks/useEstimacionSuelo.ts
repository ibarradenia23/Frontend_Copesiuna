import { useQuery } from "@tanstack/react-query";
import { obtenerBitacorasEstimacionSuelo } from "../api/estimacionSueloService";

export const useObtenerEstimacionesSuelo =()=>{
    return useQuery(["estimacionesSuelo"],obtenerBitacorasEstimacionSuelo);
}