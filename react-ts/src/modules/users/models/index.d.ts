export interface UserInterface {
  id?:number;
  nombre:string;
  apellido:string;
  telefono:string;
  email:string;
  password:string;
  fecha_create?: Date;
  fecha_update?: Date;
}

export interface Asignacion {
  id?:number,
  ID_productor:number;
  ID_user:number;
  tipo:string;
  estado?:boolean;
}