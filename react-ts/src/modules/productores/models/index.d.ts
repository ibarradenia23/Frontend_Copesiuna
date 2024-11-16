export interface ProductorInterface {
    id?:number;
    nombre:string;
    direccion:string;
    cedula:string;
    fecha_create?:Date;
    fecha_update?:Date;
}

export interface ParcelaInterface {
    id?:number;
    descripcion:string;
    tamaño_parcela:string;
    id_productor:number;
    id_tipo_parcela:number;
    fecha_create?:Date;
    fecha_update?:Date;
}

export interface CultivoInterface {
  id?:number;
  cultivo:string;
  edad:string;
  id_Parcela:number;
  fecha_create?:Date;
  fecha_update?:Date;
}