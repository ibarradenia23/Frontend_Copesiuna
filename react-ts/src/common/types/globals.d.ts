import { ParcelaCompletaInterface } from "../../modules/productores/models";
import { Asignacion } from "../../modules/users/models";

export interface Paths {
  path: string;
  element: () => Promise<{ default: React.ComponentType<> }>;
}

export interface ServiceResponse {
  data?: unknown;
  error?: string;
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
}

export interface ToastProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose: () => void;
}
