import React, { useEffect, useState } from "react";
import { TiposCultivosInterface } from "../models"
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import Toast from "../../../common/components/Toast";
import { useActualizarTiposCultivo, useCrearTiposCultivo } from "../hooks/useTiposCutivos";


interface TiposCultivosPropsInterface {
    tipoCultivo?: TiposCultivosInterface;
}

const TiposCultivosForm: React.FC<TiposCultivosPropsInterface> = ({tipoCultivo}) => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
      } = useForm<TiposCultivosInterface>();

      // Usamos el hook para crear un usuario
  const {
    mutate: crearTipoCultivo,
    isError: isErrorCrear,
    isSuccess: isSuccessCrear,
    error: errorCrear,
    reset: resetCrear,
  } = useCrearTiposCultivo();
  const {
    mutate: editarTipoCultivo,
    isError: isErrorEditar,
    isSuccess: isSuccessEditar,
    error: errorEditar,
    reset: resetEditar,
  } = useActualizarTiposCultivo();

      //Estado para decidir si crear o editar
  const [isEditing, setIsEditing] = useState(false);

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
    if (tipoCultivo) {
      setIsEditing(true);
      setValue("cultivo", tipoCultivo.cultivo);
      setValue("edad", tipoCultivo.edad);
      resetEditar();
    } else {
      setIsEditing(false);
      resetCrear(); // Resetea el estado de creación
    }
  }, [tipoCultivo, setValue, resetCrear]);

  //Manejador del envio del formulario
  const onSubmit = async (data: TiposCultivosInterface) => {
    if (isEditing && tipoCultivo && tipoCultivo.id) {
      editarTipoCultivo({ id: tipoCultivo.id, ...data });
    } else {
      crearTipoCultivo(data);
    }
  };

  useEffect(() => {
    if (isSuccessCrear) {
      setToast({
        type: "success",
        message: "Tipo de cultivo creado exitosamente.",
        visible: true,
      });
    }

    if (isErrorCrear) {
      setToast({
        type: "error",
        message:
          "Error al crear tipo de cultivo: " + (errorCrear as Error).message,
        visible: true,
      });
    }

    if (isSuccessEditar) {
      setToast({
        type: "warning",
        message: "Tipo de cultivo editado exitosamente.",
        visible: true,
      });
    }

    if (isErrorEditar) {
      setToast({
        type: "error",
        message:
          "Error al editar el tipo de cultivo: " + (errorEditar as Error).message,
        visible: true,
      });
    }
  }, [isSuccessCrear, isErrorCrear, isSuccessEditar, isErrorEditar]);

  useEffect(() => {
      if (toast.visible) {
        const timer = setTimeout(() => {
          closeToast();
        }, 3000); // Duración del toast en milisegundos (3 segundos)
  
        return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
      }
    }, [toast.visible]);

  return (
    <section>
        {toast.visible && (
        <Toast type={toast.type} message={toast.message} onClose={closeToast} />
      )}
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 space-y-6">
        <div className="">
            <label
              htmlFor="cultivo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tipo de cultivo
            </label>
            <input
              type="text"
              id="cultivo"
              {...register("cultivo", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 6,
                  message: "El tipo de cultivo debe tener al menos 6 caracteres",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Cultivo n"
            />
            {errors.cultivo && (
              <p className="text-red-500 text-xs mt-1">
                {errors.cultivo.message}
              </p>
            )}
          </div>
        <div className="">
            <label
              htmlFor="edad"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Edad del cultivo
            </label>
            <input
              type="text"
              id="edad"
              {...register("edad", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 2,
                  message: "La edad del cultivo debe tener al menos 2 caracteres",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="8 meses"
            />
            {errors.edad && (
              <p className="text-red-500 text-xs mt-1">
                {errors.edad.message}
              </p>
            )}
          </div>
          <button
          type="submit"
          className={`text-white inline-flex items-center ${
            isEditing
              ? "bg-secondary hover:bg-[#8C541D] dark:bg-secondary dark:hover:bg-[#8C541D] dark:focus:ring-secondary"
              : " bg-primary hover:bg-[#016F35] dark:bg-primary dark:hover:bg-[#016F35] dark:focus:ring-primary"
          } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center `}
        >
          {isEditing ? (
            <Pencil className="h-4 w-4 mr-2" />
          ) : (
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
          )}

          {isEditing ? "Editar tipo cultivo" : "Agregar tipo cultivo"}
        </button>
        </div>
        </form>
    </section>
  )
}

export default TiposCultivosForm