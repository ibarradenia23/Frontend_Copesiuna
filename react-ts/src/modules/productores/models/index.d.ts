import { TiposCultivosInterface, TiposParcelaInterface } from "../../ajustes/models";

export interface ProductorInterface {
    id?:number;
    nombre:string;
    apellido:string;
    direccion:string;
    cedula:string;
    fecha_create?:Date;
    fecha_update?:Date;
}

export interface ParcelaInterface {
    id?:number;
    descripcion:string;
    tamaño_parcela:string;
    productorId:number;
    ID_productor?:number;
    productor?:ProductorInterface;
    cultivoId:number;
    tipoParcelaId:number;
    fecha_create?:Date;
    fecha_update?:Date;
}

export interface ParcelaCompletaInterface extends ParcelaInterface {
  productor: ProductorInterface;
  cultivo:TiposCultivosInterface;
  tipo:TiposParcelaInterface;
}

export interface CultivoInterface {
  id?:number;
  cultivo:string;
  edad:string;
  id_Parcela:number;
  fecha_create?:Date;
  fecha_update?:Date;
}