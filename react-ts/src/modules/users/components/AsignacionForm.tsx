import React, { useEffect, useState } from 'react'
import { Asignacion } from '../models';
import { useForm } from "react-hook-form";
import Toast from '../../../common/components/Toast';
import { useObtenerProductores } from '../../productores/hooks/useProductor';
import { ProductorInterface } from '../../productores/models';
import { useCrearAsignacion } from '../hooks/useAsignacion';


interface AsignacionPropsInterface {
  idUsuario?:number;
}

const AsignacionForm:React.FC<AsignacionPropsInterface> = ({idUsuario}) => {
  
   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Asignacion>();
    const {data:productoresResponse} = useObtenerProductores();
    const [productoresData,setProductoresData] = useState<ProductorInterface[]>([]);

     const {
        mutate: crearAsignacion,
        isError: isErrorCrear,
        isSuccess: isSuccessCrear,
        error: errorCrear,
        reset: resetCrear,
      } = useCrearAsignacion();

    useEffect(()=>{
       const productores = productoresResponse?.data as ProductorInterface[];
       setProductoresData(productores);
    },[productoresResponse]);

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
          if (toast.visible) {
            const timer = setTimeout(() => {
              closeToast();
            }, 3000); // Duración del toast en milisegundos (3 segundos)
      
            return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
          }
        }, [toast.visible]);


    const onSubmit =(data:Asignacion)=>{
      if(idUsuario){
        const newData ={
          ID_productor:Number(data.ID_productor),
          ID_user:Number(idUsuario),
          tipo:data.tipo,
        }
        crearAsignacion(newData);
      }
    }

    useEffect(()=>{
      if (isSuccessCrear) {
        setToast({
          type: "success",
          message: "Parcela creada exitosamente.",
          visible: true,
        });
      }
  
      if (isErrorCrear) {
        setToast({
          type: "error",
          message:
            "Error al crear la parcela: " + (errorCrear as Error).message,
          visible: true,
        });
      }
    },[isSuccessCrear, isErrorCrear,resetCrear]);
  
  return (
    <section>
      {toast.visible && (
        <Toast type={toast.type} message={toast.message} onClose={closeToast} />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 space-y-6">
      <div className="">
            <label
              htmlFor="parcelas"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tipo de parcela
            </label>
            <select
              id="tiposParcelas"
              {...register("ID_productor",{ required: "Este campo es obligatorio" })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Elige un productor</option>
              {productoresData?.map((productor)=>(
                 <option key={productor.id} value={productor.id}>
                 {productor.nombre}
               </option>
              ))}
            </select>
            {errors.ID_productor && (
              <p className="text-red-500 text-xs mt-1">
                {errors.ID_productor.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="parcelas"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tipo de parcela
            </label>
            <select
              id="tiposParcelas"
              {...register("tipo",{ required: "Este campo es obligatorio" })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Elige una tipo</option>
              <option >Estimacion de Cosecha</option>
              <option >Analisis Fisico-Clinico de Suelo</option>
            </select>
            {errors.tipo && (
              <p className="text-red-500 text-xs mt-1">
                {errors.tipo.message}
              </p>
            )}
          </div>
      </div>
      </form>
    </section>
  )
}

export default AsignacionForm