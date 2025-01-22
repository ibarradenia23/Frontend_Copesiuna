import { ParcelaInterface } from "../../productores/models";

export interface AfectacionesInterface {
    id?:number;
    nombre:string;
    descripcion:string;
    fecha_create?:string;
    fecha_update?:string
}

export interface EstimacionCosechaInterface {
    id?:number;
    estado_clima:"Soleado" | "Nublado" | "LLuvioso";
    fecha_created:string;
    fecha_updated:string;
    parcela:ParcelaInterface;
    plantas:PlantasInterface[];
}

export interface PlantasInterface {
    id?:number;
    num_planta:number;
    ID_afectacion:number;
    afectaciones?:AfectacionesInterface[];
    ID_estimacion:number;
    fecha_create:string;
    fecha_update:string;
    mazorcas:MazorcaInterface[];
}

type WeatherType = "soleado" | "nublado" | "lluvioso";

export interface MazorcaInterface{
    id?:number;
    cantidad:number;
    ID_afectacion:number;
    afectacion?:AfectacionesInterface;
    ID_planta:number;
    fecha_create:string;
    fecha_update:string;
}