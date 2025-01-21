import React, { useEffect, useState } from "react";
import { useEliminarAsignacion } from "../hooks/useAsignacion";
import Toast from "../../../common/components/Toast";
import { Asignacion } from "../models";
import { Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface PropsInterface {
  asignacion: Asignacion;
}

const AsignacionCard: React.FC<PropsInterface> = ({ asignacion }) => {
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
    visible: boolean;
  }>({
    type: "success", // Valor por defecto
    message: "",
    visible: false,
  });

  const queryClient = useQueryClient();
  

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
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta asignacion?")
    ) {
      eliminarAsignacion(id, {
        onSuccess: () => {
          queryClient.invalidateQueries(['asignaciones']);
        },
      });
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
        <div className="">
          <h4 className="text-[1.2rem] font-bold text-gray-900 dark:text-white">
            {asignacion.productor?.nombre}
          </h4>
        </div>
        <div className="btones flex gap-2">
          <button
            onClick={() => handleEliminar(asignacion.id ?? 0)}
            className=" items-center  font-medium rounded-lg text-sm p-2.5 text-center w-full justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
       
      </div>
      <div className="flex justify-between items-center">
        <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
            {asignacion.tipo}
          </span>
          <p className=" text-gray-700 dark:text-gray-400 text-sm">{new Date(asignacion.fecha_create).toLocaleDateString('es-ES',{year:'numeric',month:'long',day:'numeric'}) }</p>
        </div>
    </div>
  );
};

export default AsignacionCard;
