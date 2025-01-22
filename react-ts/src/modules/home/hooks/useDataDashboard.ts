import { useQuery } from "@tanstack/react-query";
import { obtenerDataDashboard } from "../api";

export const useObtenerDataDashboard =()=>{
    return useQuery(['dataDashboard'],obtenerDataDashboard);
}
