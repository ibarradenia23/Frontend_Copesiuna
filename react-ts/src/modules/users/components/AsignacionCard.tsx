import React, { useEffect, useState } from 'react'
import { useEliminarAsignacion } from '../hooks/useAsignacion';
import Toast from '../../../common/components/Toast';

const AsignacionCard = () => {

  const [toast, setToast] = useState<{
      type: "success" | "error" | "warning";
      message: string;
      visible: boolean;
    }>({
      type: "success", // Valor por defecto
      message: "",
      visible: false,
    });

    const {
        mutate: eliminarAsignacion,
        isError,
        isSuccess,
        error,
      } = useEliminarAsignacion();

      useEffect(() => {
          if (isSuccess) {
            setToast({
              type: "warning",
              message: "Asignacion se ha eliminado exitosamente.",
              visible: true,
            });
          }
          if (isError) {
            setToast({
              type: "error",
              message: "Error al eliminar asignacion",
              visible: true,
            });
          }
        }, [isSuccess, isError, error]);

      const handleEliminar = (id: number) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta asignacion?")) {
          eliminarAsignacion(id);
        }
      };

      const closeToast = () => {
        setToast({ ...toast, visible: false });
      };

      useEffect(() => {
            if (toast.visible) {
              const timer = setTimeout(() => {
                closeToast();
              }, 3000); // Duración del toast en milisegundos (3 segundos)
        
              return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
            }
          }, [toast.visible]);
    
    
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      {toast.visible && (
        <Toast type={toast.type} message={toast.message} onClose={closeToast} />
      )}
      <div className="header-card flex justify-between align-middle mb-2">
        
      </div>
    </div>
  )
}

export default AsignacionCard