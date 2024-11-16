import { useForm } from "react-hook-form";
import { ParcelaInterface } from "../models";
import { useEffect, useState } from "react";
import Toast from "../../../common/components/Toast";

const ParcelaForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ParcelaInterface>();

      //Estado para manejar el toast
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'warning'; message: string; visible: boolean }>({
    type: 'success', // Valor por defecto
    message: '',
    visible: false,
  });

  const onSubmit =(data:ParcelaInterface)=>{
    console.log(data);
    setToast({ type: 'success', message: 'Parcela creada exitosamente.', visible: true });
  }

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
        {toast.visible && <Toast type={toast.type} message={toast.message} onClose={closeToast} />}
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 space-y-6">
        <div className="">
          <label
            htmlFor="descripcion"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Descripcion de parcela
          </label>
          <input
            type="text"
            id="descripcion"
            {...register('descripcion',{required:'Este campo es obligatorio',minLength: { value: 6, message: 'La descripcion debe tener al menos 6 caracteres' }})}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Parcela norte"
          />        
          {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>}
        </div>
        <div className="">
          <label
            htmlFor="tamaño_parcela"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tamaño de la parcela
          </label>
          <input
            type="text"
            id="tamaño"
            {...register('tamaño_parcela',{required:'Este campo es obligatorio',minLength: { value: 6, message: 'Este campo debe tener al menos 6 caracteres' }})}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="20 hectareas"
          />        
          {errors.tamaño_parcela && <p className="text-red-500 text-xs mt-1">{errors.tamaño_parcela.message}</p>}
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
        Agregar parcela nueva
      </button>
        </form>
    </section>
  )
}

export default ParcelaForm