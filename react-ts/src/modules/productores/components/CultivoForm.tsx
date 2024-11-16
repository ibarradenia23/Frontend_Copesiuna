import { useForm } from "react-hook-form";
import { CultivoInterface } from "../models";
import { useEffect, useState } from "react";
import Toast from "../../../common/components/Toast";

const CultivoForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<CultivoInterface>();

      //Estado para manejar el toast
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'warning'; message: string; visible: boolean }>({
    type: 'success', // Valor por defecto
    message: '',
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

   //Manejador del envio del formulario
   const onSubmit = (data: CultivoInterface) => {
    console.log(data);
    setToast({ type: 'success', message: 'Cultivo creado exitosamente.', visible: true });
  };


  return (
    <section>
         {toast.visible && <Toast type={toast.type} message={toast.message} onClose={closeToast} />}
         <form onSubmit={handleSubmit(onSubmit)}>
         <div className="mb-6 space-y-6">
         <div className="">
          <label
            htmlFor="nombre_cultivo"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre del cultivo
          </label>
          <input
            type="text"
            id="nombre"
            {...register('cultivo',{required:'Este campo es obligatorio',minLength: { value: 6, message: 'El nombre debe tener al menos 6 caracteres' }})}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Cacao E-234"
          />        
          {errors.cultivo && <p className="text-red-500 text-xs mt-1">{errors.cultivo.message}</p>}
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
            {...register('edad',{required:'Este campo es obligatorio',minLength: { value: 3, message: 'La edad debe tener al menos 6 caracteres' }})}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="1 año"
          />        
          {errors.edad && <p className="text-red-500 text-xs mt-1">{errors.edad.message}</p>}
        </div>
         </div>
         <button
        type="submit"
        className="text-white inline-flex items-center bg-primary hover:bg-[#016F35] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-[#016F35] dark:focus:ring-primary"
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
            clip-rule="evenodd"
          ></path>
        </svg>
        Agregar cultivo nuevo
      </button>
         </form>
    </section>
  )
}

export default CultivoForm