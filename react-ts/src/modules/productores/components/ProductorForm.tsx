import { useForm } from "react-hook-form";
import { ProductorInterface } from "../models";

const ProductorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductorInterface>();

  //Manejador del envio del formulario
  const onSubmit = (data: ProductorInterface) => {
    console.log(data);
  };

  return (
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
            {...register('nombre',{required:'Este campo es obligatorio',minLength: { value: 6, message: 'El nombre debe tener al menos 6 caracteres' }})}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Juan Perez"
          />        
          {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
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
            {...register('direccion',{required:'Este campo es obligatorio',minLength: { value: 6, message: 'La direccion debe tener al menos 6 caracteres' }})}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="El hormiguero"
          />
          {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion.message}</p>}
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
            {...register('cedula',{required:'Este campo es obligatorio',minLength: { value: 10, message: 'La cedula debe tener al menos 10 caracteres' }})}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="xxx-xxxxxx-xxxx"
          />
          {errors.cedula && <p className="text-red-500 text-xs mt-1">{errors.cedula.message}</p>}
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
        Add new product
      </button>
    </form>
  );
};

export default ProductorForm;
