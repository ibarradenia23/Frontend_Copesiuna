import { ParcelaCompletaInterface } from "../../modules/productores/models";
import { Asignacion } from "../../modules/users/models";

export interface Paths {
  path: string;
  element: () => Promise<{ default: React.ComponentType<> }>;
  protected:boolean;
}

export interface ServiceResponse {
  data?: unknown;
  error?: string;
}

export interface ServiceResponseGeneric<T = unknown> {
  data?: T;
  error?: string;
}

interface ValidationErrors {
  [key: string]: string[]; // Clave es el nombre del campo, valor es un array de mensajes de error
}


export interface ServiceResponseAsignacion {
  data:Asignacion[];
  error?: string;
}

export interface ServiceResponseParcelas {
  data:ParcelaCompletaInterface[];
  error?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  width?: string; // Ancho opcional
  height?: string; // Alto opcional
}

export interface ToastProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose: () => void;
}
