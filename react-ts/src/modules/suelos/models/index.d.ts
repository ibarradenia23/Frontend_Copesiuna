import { ProductorInterface } from "../../productores/models";

export interface EstimacionSueloInterface {
    id: number;
    fecha_levantamiento: string;
    fecha_e_laboratorio: string;
    descripcion: string;
    fecha_updated: string;
    fecha_created: string;
    productor: ProductorInterface;
    propiedades: Propiedad[];
}

export interface Propiedad {
    id: number;
    nombre: string;
    dato: string;
    fecha_create: string;
    fecha_update: string;
  }
  
  