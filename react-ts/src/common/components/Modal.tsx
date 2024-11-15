// Modal.tsx
import React from 'react';
import { ModalProps } from '../types/globals';
import { X } from 'lucide-react';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 gap-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} /> {/* Usando el ícono de cerrar de lucide-react */}
          </button>
        </div>
        <div className='p-4 md:p-5'>{children}</div>
       
      </div>
    </div>
  );
};

export default Modal;