import React, { useEffect, useState } from "react";

import { Pencil, Receipt, Trash2 } from "lucide-react";
import Toast from "../../../common/components/Toast";
import {
  useEliminarAfectacion,
  useObtenerAfectaciones,
} from "../hooks/useAfactaciones";
import { AfectacionesInterface } from "../models";
import Modal from "../../../common/components/Modal";
import AfectacionForm from "./AfectacionForm";
import { useQueryClient } from "@tanstack/react-query";

const Afectaciones = () => {
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
    visible: boolean;
  }>({
    type: "success", // Valor por defecto
    message: "",
    visible: false,
  });
  const [afectacionesData, setAfectacionesData] = useState<
    AfectacionesInterface[]
  >([]);
  const queryClient = useQueryClient();
  const { data: afectacionesResponse } = useObtenerAfectaciones();
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

  const handleOpenModalEdit = () => {
    setIsModalOpenEdit(true);
  };

  const handleCloseModalEdit = () => {
    setIsModalOpenEdit(false);
  };

  const traerAfectaciones = () => {
    const afectaciones = afectacionesResponse?.data as AfectacionesInterface[];
    console.log("las afectaciones son", afectacionesResponse?.data);
    setAfectacionesData(afectaciones);
  };

  useEffect(() => {
    traerAfectaciones();
  }, [afectacionesResponse]);

  const {
    mutate: eliminarAfectacion,
    isError,
    isSuccess,
    error,
  } = useEliminarAfectacion();

  const handleEliminar = (id: number) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta afectacion?")
    ) {
      eliminarAfectacion(id, {
        onSuccess: () => {
          queryClient.invalidateQueries(["afectaciones"]);
        },
      });
    }
  };

  const [afectacionEdit, setAfectacionEdit] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
  });

  const handleEdit = (id: number, nombre: string, descripcion: string) => {
    handleOpenModalEdit();
    setAfectacionEdit({ id, nombre, descripcion });
  };

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
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
      {toast.visible && (
        <Toast type={toast.type} message={toast.message} onClose={closeToast} />
      )}
      {afectacionesData &&
        afectacionesData.map((afectacion) => (
          <div
            key={afectacion.id}
            className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-32 flex justify-between"
          >
            <div className="">
              <h4 className="text-[1.2rem] font-bold text-gray-900 dark:text-white mt-4">
                {afectacion.nombre}
              </h4>
              <span className="flex text-gray-700 dark:text-gray-400 items-center">
                <Receipt className="inline mr-1 h-4 w-4" />{" "}
                {afectacion.descripcion}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() =>
                  handleEdit(
                    afectacion.id ?? 0,
                    afectacion.nombre,
                    afectacion.descripcion
                  )
                }
                className=" items-center  font-medium rounded-lg text-sm p-2.5 text-center w-full justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleEliminar(afectacion.id ?? 0)}
                className=" items-center  font-medium rounded-lg text-sm p-2.5 text-center w-full justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      <Modal
        isOpen={isModalOpenEdit}
        title="Edita un tipo de cultivo"
        onClose={handleCloseModalEdit}
      >
        <AfectacionForm afectacion={afectacionEdit} />
      </Modal>
    </div>
  );
};

export default Afectaciones;
