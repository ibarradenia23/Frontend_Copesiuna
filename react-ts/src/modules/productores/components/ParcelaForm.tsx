import { useForm } from "react-hook-form";
import { ParcelaInterface } from "../models";
import React, { useEffect, useState } from "react";
import Toast from "../../../common/components/Toast";
import { useActualizarParcela, useCreateParcela } from "../hooks/useParcela";
import { Pencil } from "lucide-react";
import { useObtenerTiposParcelas } from "../../ajustes/hooks/useTiposParcelas";
import { useObtenerTiposCultivos } from "../../ajustes/hooks/useTiposCutivos";
import { TiposCultivosInterface, TiposParcelaInterface } from "../../ajustes/models";
import { useQueryClient } from "@tanstack/react-query";

interface ParcelaPropsInterface {
  parcela?: ParcelaInterface;
  idProductor?:number;
}

const ParcelaForm: React.FC<ParcelaPropsInterface> = ({parcela,idProductor}) => {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParcelaInterface>({
    defaultValues: {
      descripcion: "",
      tamaño_parcela: "",
      tipoParcelaId: 0, // Valor inicial para el select
      cultivoId: 0, // Valor inicial para el select
    },
  });

   //Estado para decidir si crear o editar
   const [isEditing, setIsEditing] = useState(false);
   const [tiposParecelaData,setTipoParcelaData] = useState<TiposParcelaInterface[]>([]);
   const [tiposCultivosData,setTiposCultivosData] = useState<TiposCultivosInterface[]>([]);
   const {data:tiposParcelaResponse} = useObtenerTiposParcelas();
   const {data:tiposCultivossResponse} = useObtenerTiposCultivos();
   
   const queryClient = useQueryClient();
   

   useEffect(()=>{
    const tiposParcelas = tiposParcelaResponse?.data as TiposParcelaInterface[];
    setTipoParcelaData(tiposParcelas);
    if(tiposCultivossResponse && Array.isArray(tiposCultivossResponse.data)){
      setTiposCultivosData(tiposCultivossResponse.data);
    }
    
   },[tiposCultivossResponse,tiposParcelaResponse]);

   // Usamos el hook para crear una parcela
  const {
    mutate: crearParcela,
    isError: isErrorCrear,
    isSuccess: isSuccessCrear,
    error: errorCrear,
    reset: resetCrear,
  } = useCreateParcela();

  // Usamos el hook para editar una parcela
  const {
    mutate: editarParcela,
    isError: isErrorEditar,
    isSuccess: isSuccessEditar,
    error: errorEditar,
    reset: resetEditar,
  } = useActualizarParcela();

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

  useEffect(()=>{
    if(parcela){
      setIsEditing(true);
      setValue("descripcion",parcela.descripcion);
      setValue("tamaño_parcela",parcela.tamaño_parcela);
      resetEditar();
    }
    else {
      setIsEditing(false);
      resetCrear();
    }
  },[parcela,setValue,resetCrear]);

  const onSubmit = (data: ParcelaInterface) => {

   if(isEditing && parcela && parcela.id){
    const newDataEdit ={
      id:parcela.id,
      descripcion:data.descripcion,
      tamaño_parcela:data.tamaño_parcela
    }
    editarParcela(newDataEdit,{
      onSuccess: () => {
        queryClient.invalidateQueries(['parcelas']);
        reset();
        //onSave(); // Llama a onSave para actualizar la lista en el componente padre
      },
    });
   }
   else {
    const newData ={
      descripcion:data.descripcion,
      tamaño_parcela:data.tamaño_parcela,
      productorId:idProductor ?? 0,
      cultivoId:Number(data.cultivoId),
      tipoParcelaId:Number(data.tipoParcelaId)
    }
    console.log("Form enviado",newData);
    
    crearParcela(newData,{
      onSuccess: () => {
        queryClient.invalidateQueries(['parcelas']);
        reset();
       // onSave(); // Llama a onSave para actualizar la lista en el componente padre
      },
    });
   }
  };

  useEffect(() => {
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

    if (isSuccessEditar) {
      setToast({
        type: "warning",
        message: "Parcela editada exitosamente.",
        visible: true,
      });
    }

    if (isErrorEditar) {
      setToast({
        type: "error",
        message:
          "Error al editar la parcela: " + (errorEditar as Error).message,
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
              htmlFor="parcelas"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tipo de parcela
            </label>
            <select
            disabled={isEditing}
              id="tiposParcelas"
              {...register("tipoParcelaId",{ required: "Este campo es obligatorio" })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled selected>Elige una tipo</option>
              {tiposParecelaData?.map((tipoP)=>(
                 <option key={tipoP.id} value={tipoP.id}>
                 {tipoP.descripcion}
               </option>
              ))}
            </select>
            {errors.tipoParcelaId&& (
              <p className="text-red-500 text-xs mt-1">
                {errors.tipoParcelaId.message}
              </p>
            )}
          </div>
          <div className="">
          <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tipo de cultivo
            </label>
            <select
            disabled={isEditing}
              id="tiposCultivos"
              {...register("cultivoId",{required: "Este campo es obligatorio"})}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
               <option value="" disabled selected >Elige una tipo</option>
              {tiposCultivosData?.map((tipoC)=>(
                <option key={tipoC.id} value={tipoC.id}>
                {tipoC.cultivo}
              </option>
              ))}
            </select>
            {errors.cultivoId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.cultivoId.message}
              </p>
            )}
          </div>
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
              {...register("descripcion", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 6,
                  message: "La descripcion debe tener al menos 6 caracteres",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Parcela norte"
            />
            {errors.descripcion && (
              <p className="text-red-500 text-xs mt-1">
                {errors.descripcion.message}
              </p>
            )}
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
              {...register("tamaño_parcela", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 6,
                  message: "Este campo debe tener al menos 6 caracteres",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-[#016F35] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="20 hectareas"
            />
            {errors.tamaño_parcela && (
              <p className="text-red-500 text-xs mt-1">
                {errors.tamaño_parcela.message}
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
           {isEditing ? "Editar parcela" : "Agregar parcela nueva"}
        </button>
      </form>
    </section>
  );
};

export default ParcelaForm;
