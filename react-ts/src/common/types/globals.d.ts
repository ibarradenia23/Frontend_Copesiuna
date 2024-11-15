export interface Paths {
  path: string;
  element: () => Promise<{ default: React.ComponentType<> }>;
}

export interface ServiceResponse {
  data?: unknown;
  error?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}
