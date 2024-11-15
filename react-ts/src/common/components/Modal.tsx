// Modal.tsx
import React from 'react';
import { ModalProps } from '../types/globals';
import { X } from 'lucide-react';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg  dark:bg-gray-700 shadow-lg z-10 p-6">
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} /> {/* Usando el ícono de cerrar de lucide-react */}
          </button>
        </div>
        <div>{children}</div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;