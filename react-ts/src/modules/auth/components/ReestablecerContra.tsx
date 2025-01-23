import React, { useEffect, useState } from "react";
import { RecuperarContra } from "../models";
import { useForm } from "react-hook-form";
import { useEnviarCorreo } from "../hooks/useLogin";
import Toast from "../../../common/components/Toast";

const ReestablecerContra = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecuperarContra>();

  const {
    mutate: enviarCorreo,
    isError: isErrorCrear,
    isSuccess: isSuccessCrear,
    error: errorCrear,
  } = useEnviarCorreo();

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
    if (isSuccessCrear) {
      setToast({
        type: "success",
        message: "Correo enviado exitosamente.",
        visible: true,
      });
    }

    if (isErrorCrear) {
      setToast({
        type: "error",
        message: "Error al enviar Correo: " + (errorCrear as Error).message,
        visible: true,
      });
    }
  }, [isSuccessCrear, isErrorCrear]);

  const onSubmit = async (data: RecuperarContra) => {
    enviarCorreo({ email: data.email });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
      {toast.visible && (
        <Toast type={toast.type} message={toast.message} onClose={closeToast} />
      )}
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Formato de correo inválido",
            },
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@company.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      {isSuccessCrear && (
        <p className="text-primary text-xs mt-1">
          Revisa tu correo para establecer la nueva contraseña
        </p>
      )}{" "}
      <button
        type="submit"
        className="w-full text-white bg-primary hover:bg-[#016F35] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-[#016F35] dark:focus:ring-blue-800"
      >
        Enviar a correo
      </button>
    </form>
  );
};

export default ReestablecerContra;
