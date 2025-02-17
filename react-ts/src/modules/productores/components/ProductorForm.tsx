import { useForm } from "react-hook-form";
import { ProductorInterface } from "../models";
import React, { useEffect, useState } from "react";
import Toast from "../../../common/components/Toast";
import {
  useActualizarProductor,
  useCrearProductor,
} from "../hooks/useProductor";
import { Pencil } from "lucide-react";

interface ProductorPropsInterface {
  productor?: ProductorInterface;
  onSave:()=>void;
}

const ProductorForm: React.FC<ProductorPropsInterface> = ({ productor,onSave }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductorInterface>();

  //Estado para decidir si crear o editar
  const [isEditing, setIsEditing] = useState(false);

  // Usamos el hook para crear un productor
  const {
    mutate: crearProductor,
    isError: isErrorCrear,
    isSuccess: isSuccessCrear,
    error: errorCrear,
    reset: resetCrear,
  } = useCrearProductor();
  const {
    mutate: editarProductor,
    isError: isErrorEditar,
    isSuccess: isSuccessEditar,
    error: errorEditar,
    reset: resetEditar,
  } = useActualizarProductor();

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

  useEffect(() => {
    if (productor) {
      setIsEditing(true);
      setValue("nombre", productor.nombre);
      setValue("apellido",productor.apellido);
      setValue("direccion", productor.direccion);
      setValue("cedula", productor.cedula);
      resetEditar();
    } else {
      setIsEditing(false);
      resetCrear(); // Resetea el estado de creación
    }
  }, [productor, setValue, resetCrear]);

  //Manejador del envio del formulario
  const onSubmit = async (data: ProductorInterface) => {
    console.log(data);
    if (isEditing && productor && productor.id) {
      editarProductor({ id: productor.id, ...data });
      onSave();
    } else {
      crearProductor(data);
      onSave();
    }
  };

  useEffect(() => {
    if (isSuccessCrear) {
      setToast({
        type: "success",
        message: "Productor creado exitosamente.",
        visible: true,
      });
      onSave();
    }

    if (isErrorCrear) {
      setToast({
        type: "error",
        message:
          "Error al crear el productor: " + (errorCrear as Error).message,
        visible: true,
      });
    }

    if (isSuccessEditar) {
      setToast({
        type: "warning",
        message: "Productor editado exitosamente.",
        visible: true,
      });
      onSave();
    }

    if (isErrorEditar) {
      setToast({
        type: "error",
        message:
          "Error al editar el productor: " + (errorEditar as Error).message,
        visible: true,
      });
    }
  }, [isSuccessCrear, isErrorCrear, isSuccessEditar, isErrorEditar]);

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
    <section>
      {toast.visible && (
        <Toast type={toast.type} message={toast.message} onClose={closeToast} />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 space-y-6">
          <div className="">
            <label
              htmlFor="nombre"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombre completo
            </label>
            <input
              type="text"
              id="nombre"
              {...register("nombre", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 6,
                  message: "El nombre debe tener al menos 6 caracteres",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Juan Alverto"
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1">
                {errors.nombre.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="apellido"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              {...register("apellido", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 6,
                  message: "El apellido debe tener al menos 6 caracteres",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Perez Perez"
            />
            {errors.apellido && (
              <p className="text-red-500 text-xs mt-1">
                {errors.apellido.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="direccion"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Direccion
            </label>
            <input
              type="text"
              id="direccion"
              {...register("direccion", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 6,
                  message: "La direccion debe tener al menos 6 caracteres",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="El hormiguero"
            />
            {errors.direccion && (
              <p className="text-red-500 text-xs mt-1">
                {errors.direccion.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="cedula"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Cedula
            </label>
            <input
              type="text"
              id="cedula"
              {...register("cedula", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 10,
                  message: "La cedula debe tener al menos 10 caracteres",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="xxx-xxxxxx-xxxx"
            />
            {errors.cedula && (
              <p className="text-red-500 text-xs mt-1">
                {errors.cedula.message}
              </p>
            )}
          </div>
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

          {isEditing ? "Editar productor" : "Agregar producto nuevo"}
        </button>
      </form>
    </section>
  );
};

export default ProductorForm;
