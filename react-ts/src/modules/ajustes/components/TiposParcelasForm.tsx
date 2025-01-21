import React, { useEffect, useState } from "react";
import { TiposParcelaInterface } from "../models";
import { useForm } from "react-hook-form";
import {
  useActualizarTiposParcela,
  useCrearTiposParcela,
} from "../hooks/useTiposParcelas";
import Toast from "../../../common/components/Toast";
import { Pencil } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface TiposParcelaPropsInterface {
  tipoParcela?: TiposParcelaInterface;
}

const TiposParcelasForm: React.FC<TiposParcelaPropsInterface> = ({
  tipoParcela,
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TiposParcelaInterface>();

  // Usamos el hook para crear un usuario
  const {
    mutate: crearTipoParcela,
    isError: isErrorCrear,
    isSuccess: isSuccessCrear,
    error: errorCrear,
    reset: resetCrear,
  } = useCrearTiposParcela();
  const {
    mutate: editarTipoParcela,
    isError: isErrorEditar,
    isSuccess: isSuccessEditar,
    error: errorEditar,
    reset: resetEditar,
  } = useActualizarTiposParcela();

  //Estado para decidir si crear o editar
  const [isEditing, setIsEditing] = useState(false);

   const queryClient = useQueryClient();

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
    if (tipoParcela) {
      setIsEditing(true);
      setValue("descripcion", tipoParcela.descripcion);
      resetEditar();
    } else {
      setIsEditing(false);
      resetCrear(); // Resetea el estado de creación
    }
  }, [tipoParcela, setValue, resetCrear]);

  //Manejador de envio del formulario
  const onSubmit = async (data: TiposParcelaInterface) => {
    if (isEditing && tipoParcela && tipoParcela.id) {
      editarTipoParcela(
        { id: tipoParcela.id, ...data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["tiposParcelas"]);
          },
        }
      );
    } else {
      crearTipoParcela(data, {
        onSuccess: () => {
          queryClient.invalidateQueries(["tiposParcelas"]);
        },
      });
    }
  };

  useEffect(() => {
    if (isSuccessCrear) {
      setToast({
        type: "success",
        message: "Tipo de parcelas creado exitosamente.",
        visible: true,
      });
    }

    if (isErrorCrear) {
      setToast({
        type: "error",
        message:
          "Error al crear tipo de parcela: " + (errorCrear as Error).message,
        visible: true,
      });
    }

    if (isSuccessEditar) {
      setToast({
        type: "warning",
        message: "Tipo de parcela editado exitosamente.",
        visible: true,
      });
    }

    if (isErrorEditar) {
      setToast({
        type: "error",
        message:
          "Error al editar el tipo de parcela: " +
          (errorEditar as Error).message,
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
              htmlFor="descripcion"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tipo de cultivo
            </label>
            <input
              type="text"
              id="cultivo"
              {...register("descripcion", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 6,
                  message:
                    "El tipo de cultivo debe tener al menos 6 caracteres",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Cultivo n"
            />
            {errors.descripcion && (
              <p className="text-red-500 text-xs mt-1">
                {errors.descripcion.message}
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

            {isEditing ? "Editar tipo parcela" : "Agregar tipo parcela"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default TiposParcelasForm;
