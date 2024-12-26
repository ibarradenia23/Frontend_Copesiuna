import React, { useEffect, useState } from "react";
import { UserInterface } from "../models";
import { useForm } from "react-hook-form";
import Toast from "../../../common/components/Toast";
import { Pencil } from "lucide-react";
import { useActualizarUsuarios, useCrearUsuario } from "../hooks/useUser";

interface UserPropsInterface {
  user?: UserInterface;
}
const UserForm: React.FC<UserPropsInterface> = ({user}) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInterface>();

  // Usamos el hook para crear un usuario
  const {
    mutate: crearUsuario,
    isError: isErrorCrear,
    isSuccess: isSuccessCrear,
    error: errorCrear,
    reset: resetCrear,
  } = useCrearUsuario();
  const {
    mutate: editarUsuario,
    isError: isErrorEditar,
    isSuccess: isSuccessEditar,
    error: errorEditar,
    reset: resetEditar,
  } = useActualizarUsuarios();

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

  //Estado para decidir si crear o editar
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setIsEditing(true);
      setValue("nombre", user.nombre);
      setValue("apellido", user.apellido);
      setValue("telefono", user.telefono);
      setValue("email", user.email);
      setValue("password", user.password);
      resetEditar();
    } else {
      setIsEditing(false);
      resetCrear(); // Resetea el estado de creación
    }
  }, [user, setValue, resetCrear]);

  //Manejador del envio del formulario
  const onSubmit = async (data: UserInterface) => {
    if (isEditing && user && user.id) {
      const newData = {
        id:user.id,
        nombre:data.nombre,
        apellido:data.nombre,
        telefono:data.telefono,
        email:data.email,
        role:user.role,
        password:data.password
      }
      editarUsuario(newData);
    } else {
      console.log("El formulario es",data);
      crearUsuario(data);
    }
  };

  useEffect(() => {
    if (isSuccessCrear) {
      setToast({
        type: "success",
        message: "Usuario creado exitosamente.",
        visible: true,
      });
    }

    if (isErrorCrear) {
      setToast({
        type: "error",
        message:
          "Error al crear el usuario: " + (errorCrear as Error).message,
        visible: true,
      });
    }

    if (isSuccessEditar) {
      setToast({
        type: "warning",
        message: "Usuario editado exitosamente.",
        visible: true,
      });
    }

    if (isErrorEditar) {
      setToast({
        type: "error",
        message:
          "Error al editar el usuario: " + (errorEditar as Error).message,
        visible: true,
      });
    }
  }, [isSuccessCrear, isErrorCrear, isSuccessEditar, isErrorEditar]);

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
              Ambos nombres
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
              placeholder="Juan Josue"
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
              Ambos apellidos
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
              htmlFor="telefono"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Numero de telefono
            </label>
            <input
              type="text"
              id="telefono"
              {...register("telefono", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 6,
                  message: "El telefono debe tener al menos 6 caracteres",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="7456 6464"
            />
            {errors.telefono && (
              <p className="text-red-500 text-xs mt-1">
                {errors.telefono.message}
              </p>
            )}
          </div>
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
              {...register('email', { required: 'Este campo es obligatorio', pattern: { value: /^\S+@\S+$/i, message: 'Formato de correo inválido' } })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              
            />
             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="">
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tipo de usuario
            </label>
            <select
              disabled={isEditing}
              id="role"
              {...register("role",{ required: "Este campo es obligatorio" })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Elige una rol</option>
              <option >ADMIN</option>
              <option >TECNICO</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">
                {errors.role.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="apellido"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contraseña
            </label>
            <input
              type="text"
              id="contraseña"
              {...register("password", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Perez Perez"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
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

          {isEditing ? "Editar usuario" : "Agregar usuario nuevo"}
        </button>
      </form>
    </section>
  );
};

export default UserForm;
