import React, { useEffect, useState } from "react";
import { ReestablecerContra } from "../models";
import { useForm } from "react-hook-form";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Spiner from "../../../common/components/Spiner";
import { useRecuperarContraseña } from "../hooks/useLogin";
import Toast from "../../../common/components/Toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const RecuperarContraseña = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReestablecerContra>();

   const navigate = useNavigate();

   useEffect(() => {
    // Captura el token de los parámetros de la URL
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
      // Limpia el token de la URL
      const newUrl = `${window.location.origin}/recuperarContrasena/reset-password`;
      window.history.replaceState({}, document.title, newUrl);
    } else {
      // Si no hay token, redirige o muestra un error
      setToast({
        type: "error",
        message: "Token no válido. Intente nuevamente.",
        visible: true,
      });
    }
  }, [searchParams]);

  useEffect(()=>{
   console.log("El token de la url es",token);
  },[token]);

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

  const {
    mutate: recuperarContraseña,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useRecuperarContraseña();

  useEffect(()=>{
    if (isSuccess) {
        setToast({
          type: "success",
          message: "Usuario creado exitosamente.",
          visible: true,
        });
      }
  
      if (isError) {
        setToast({
          type: "error",
          message: "Error al crear el usuario: " + (error as Error).message,
          visible: true,
        });
      }
  },[isSuccess,isError]);

  //Menejar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit =(data:ReestablecerContra)=>{
    console.log("lo que evio es",token,data.password)
    recuperarContraseña({token:String(token),password:data.password})
  }

  const volver =()=>{
    navigate('/');
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center overflow-hidden bg-[#d0f4df] dark:bg-gray-900  transition-colors duration-1000 z-0`}
    >
        {toast.visible && (
        <Toast type={toast.type} message={toast.message} onClose={closeToast} />
      )}
      <div className="z-50 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between align-middle items-center">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Nueva contraseña
        </h5>
        <button onClick={volver} className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
         <ArrowLeft/>
        </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-2">
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Este campo es obligatorio",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
              <button
                type="button"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-primary dark:text-primary" />
                ) : (
                  <Eye className="h-4 w-4 text-primary dark:text-primary" />
                )}
                <span className="sr-only">
                  {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                </span>
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
            <button
              type="submit"
              className="w-full text-white bg-primary hover:bg-[#016F35] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-[#016F35] dark:focus:ring-blue-800 mt-3"
            >
              {isLoading ? <Spiner /> : "Cambiar contraseña"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecuperarContraseña;
