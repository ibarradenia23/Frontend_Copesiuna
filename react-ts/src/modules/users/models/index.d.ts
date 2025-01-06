import { ProductorInterface } from "../../productores/models";

export interface UserInterface {
  id?:number;
  nombre:string;
  apellido:string;
  telefono:string;
  email:string;
  password:string;
  role:string;
  fecha_create?: Date;
  fecha_update?: Date;
}

export interface Asignacion {
  id?:number,
  ID_productor:number;
  ID_user:number;
  tipo:string;
  estado?:boolean;
  tecnico?:ProductorInterface;
  productor?:ProductorInterface;
  fecha_create: string;
  fecha_update?: Date;
}