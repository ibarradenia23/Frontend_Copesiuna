import { useState, useEffect } from "react";
import { Cloud, Eye, EyeOff,ShieldAlert } from "lucide-react";
import { useForm } from 'react-hook-form'

import { ToogleThemeButton } from "./common/components/ToogleTheme";
import { LoginFormInputs } from "./modules/auth/models";
import { useLogin } from "./modules/auth/hooks/useLogin";
import Spiner from "./common/components/Spiner";
import { useRecoilValue } from "recoil";
import { authTokenState } from "./modules/auth/state/authAtom";
import { useNavigate } from "react-router-dom";



function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  
  const navigate = useNavigate();
  const token = useRecoilValue(authTokenState);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sunPosition, setSunPosition] = useState(0);
  const [moonPosition, setMoonPosition] = useState(-100);
  const [cloudPosition, setCloudPosition] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const savedTheme = localStorage.getItem("color-theme");

  const { mutate: login, isLoading, isError, error } = useLogin();

  //Manejar el estado del fondo, dependiendo del estado del tema
  useEffect(() => {
    const initialDarkMode = savedTheme === "dark";
    setIsDarkMode(initialDarkMode);
    if (initialDarkMode) {
      document.documentElement.classList.add("dark");
    }
    updateCelestialPositions(initialDarkMode);
  }, [savedTheme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCloudPosition((prev) => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const updateCelestialPositions = (isDark: boolean) => {
    if (isDark) {
      setSunPosition(-100);
      setMoonPosition(0);
    } else {
      setSunPosition(0);
      setMoonPosition(-100);
    }
  };

  //Menejar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //manejador del envio del formulario
  const onSubmit = (data: LoginFormInputs) => {
    setErrorMessage("");
    console.log(data); // Imprimir los datos en la consola
    // Aquí puedes agregar la lógica para manejar el inicio de sesión
    login(data);
  };

  useEffect(() => {
    if (isError || error) {
      // Captura el mensaje de error y actualiza el estado
      setErrorMessage(error.message || "Error en el inicio de sesión. Inténtalo de nuevo.");
    }
  }, [isError, error]);

  //Validacion de un token existente
  useEffect(()=>{
   if(token){
      navigate('/home');
   }
  },[token]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center overflow-hidden ${
        isDarkMode ? "bg-gray-900" : "bg-[#d0f4df]"
      } transition-colors duration-1000 z-0`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Sol */}
        <div
          className="absolute w-20 h-20 bg-[#D27E2C] rounded-full transition-all duration-1000 ease-in-out"
          style={{
            top: "10%",
            left: "10%",
            transform: `translateY(${sunPosition}vh)`,
            boxShadow: isDarkMode
              ? "none"
              : "0 0 60px 30px rgba(210, 126, 44, 0.3)",
          }}
        />
        {/* Luna */}
        <div
          className="absolute w-16 h-16 bg-gray-200 rounded-full transition-all duration-1000 ease-in-out"
          style={{
            top: "10%",
            right: "10%",
            transform: `translateY(${moonPosition}vh)`,
            boxShadow: isDarkMode
              ? "0 0 20px 10px rgba(255, 255, 255, 0.2)"
              : "none",
          }}
        />
        {/* Nubes */}
        <Cloud
          className="absolute text-white text-opacity-80 transition-all duration-100 ease-linear"
          style={{
            top: "20%",
            left: `${cloudPosition}%`,
            fontSize: "100px",
          }}
        />
        <Cloud
          className="absolute text-white text-opacity-80 transition-all duration-100 ease-linear"
          style={{
            top: "40%",
            left: `${(cloudPosition + 50) % 100}%`,
            fontSize: "80px",
          }}
        />
      </div>
      <div className="z-50 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between mb-4">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Inicia sesión en la plataforma
            </h5>
            <ToogleThemeButton />
          </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
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
                  {...register('password', { required: 'Este campo es obligatorio', minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' } })}
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
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                 
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Recordar
              </label>
            </div>
            <a
              href="#"
              className="ms-auto text-sm text-primary hover:underline dark:text-primary"
            >
              Olvidaste contraseña?
            </a>
          </div>
          {errorMessage && <p className="text-red-500 text-sm mt-1 flex items-center gap-2"><ShieldAlert/> {errorMessage}</p>}
          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-[#016F35] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-[#016F35] dark:focus:ring-blue-800"
          >
            {
              isLoading ? <Spiner/> :  'Inicie sesión en su cuenta'
            }
           
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
