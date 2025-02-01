import React, { useEffect, useState } from "react";
import { Asignacion } from "../models";
import { useForm } from "react-hook-form";
import Toast from "../../../common/components/Toast";
import { useObtenerProductores } from "../../productores/hooks/useProductor";
import { ProductorInterface } from "../../productores/models";
import { useCrearAsignacion } from "../hooks/useAsignacion";
import { useQueryClient } from "@tanstack/react-query";

interface AsignacionPropsInterface {
  idUsuario?: number;
}

const AsignacionForm: React.FC<AsignacionPropsInterface> = ({ idUsuario }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Asignacion>({
    defaultValues:{
      ID_productor:0,
      tipo:""
    }
  });
  const { data: productoresResponse } = useObtenerProductores();
  const [productoresData, setProductoresData] = useState<ProductorInterface[]>(
    []
  );
  const queryClient = useQueryClient();

  const {
    mutate: crearAsignacion,
    isError: isErrorCrear,
    isSuccess: isSuccessCrear,
    error: errorCrear,
    reset: resetCrear,
  } = useCrearAsignacion();

  useEffect(() => {
    const productores = productoresResponse?.data as ProductorInterface[];
    setProductoresData(productores);
  }, [productoresResponse]);

  //Estado para manejar el toast
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
    visible: boolean;
  }>({
    type: "success", // Valor por defecto
    message: "",
    visible: false,
  });

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

  const onSubmit = (data: Asignacion) => {
    if (idUsuario) {
      const newData = {
        ID_productor: Number(data.ID_productor),
        ID_user: Number(idUsuario),
        tipo: data.tipo,
      };
      console.log("Data de asignacion", newData);
      crearAsignacion(newData, {
        onSuccess: () => {
          queryClient.invalidateQueries(["asignaciones"]);
          reset();
        },
      });
    }
  };

  useEffect(() => {
    if (isSuccessCrear) {
      setToast({
        type: "success",
        message: "Asignacion creada exitosamente.",
        visible: true,
      });
    }

    if (isErrorCrear) {
      setToast({
        type: "error",
        message:
          "Error al crear la asignacion: " + (errorCrear as Error).message,
        visible: true,
      });
    }
  }, [isSuccessCrear, isErrorCrear, resetCrear]);

  return (
    <section>
      {toast.visible && (
        <Toast type={toast.type} message={toast.message} onClose={closeToast} />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 space-y-6">
          <div className="">
            <label
              htmlFor="parcelas"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Productor
            </label>
            <select
              id="tiposParcelas"
              {...register("ID_productor", {
                required: "Este campo es obligatorio",
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={0} disabled selected>Elige un productor</option>
              {productoresData?.map((productor) => (
                <option key={productor.id} value={productor.id}>
                  {productor.nombre}
                </option>
              ))}
            </select>
            {errors.ID_productor && (
              <p className="text-red-500 text-xs mt-1">
                {errors.ID_productor.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="parcelas"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tipo de asignacion
            </label>
            <select
              id="tiposParcelas"
              {...register("tipo", { required: "Este campo es obligatorio" })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled selected>Elige una tipo</option>
              <option>Estimacion de Cosecha</option>
              <option>Analisis Fisico-Clinico de Suelo</option>
            </select>
            {errors.tipo && (
              <p className="text-red-500 text-xs mt-1">{errors.tipo.message}</p>
            )}
          </div>
          <button
            type="submit"
            className={`text-white inline-flex items-center ${" bg-primary hover:bg-[#016F35] dark:bg-primary dark:hover:bg-[#016F35] dark:focus:ring-primary"} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center `}
          >
            <svg
              className="me-1 -ms-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Agregar Asignacion
          </button>
        </div>
      </form>
    </section>
  );
};

export default AsignacionForm;
