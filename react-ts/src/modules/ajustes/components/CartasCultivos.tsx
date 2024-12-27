import { CirclePlus, Clock, Pencil, Sprout, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Modal from "../../../common/components/Modal";
import TiposCultivosForm from "./TiposCultivosForm";
import { useEliminarTipoCultivo, useObtenerTiposCultivos } from "../hooks/useTiposCutivos";
import Toast from "../../../common/components/Toast";
import { TiposCultivosInterface } from "../models";

const CartasCultivos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
    visible: boolean;
  }>({
    type: "success", // Valor por defecto
    message: "",
    visible: false,
  });
  const [tipoCultivoEdit,setTipoCultivoEdit] = useState({
    id:0,
    cultivo:'',
    edad:''
  })

  const closeToast = () => {
    setToast({ ...toast, visible: false });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModalEdit = () => {
    setIsModalOpenEdit(true);
  };

  const handleCloseModalEdit = () => {
    setIsModalOpenEdit(false);
  };

  const {data:tiposCultivosResponse,/*isLoading*/} = useObtenerTiposCultivos();
  const {mutate: eliminarTiposCultivos,isError,isSuccess,error} = useEliminarTipoCultivo();
  const [tiposCultivosD,setTiposCultivosD] = useState<TiposCultivosInterface[]>([]);

  const traerTiposCultivos =()=>{
    if(tiposCultivosResponse && Array.isArray(tiposCultivosResponse.data)){
      setTiposCultivosD(tiposCultivosResponse.data);
    }
    
  }

  useEffect(()=>{
   traerTiposCultivos();
  },[tiposCultivosResponse]);

  useEffect(()=>{
    if(isSuccess){
      setToast({
        type: "warning",
             message: "Tipo de cultivo se ha eliminado exitosamente.",
             visible: true,
      })
    }
    if(isError){
      setToast({
        type: "error",
          message: "Error al eliminar tipo de cultivo",
          visible: true,
      })
    }
  },[isSuccess,isError,error]);

  const handleEliminar=(id:number)=>{
    if(window.confirm("¿Estas seguro de eliminar este tipo de cultivo?")){
      eliminarTiposCultivos(id);
    }
  }

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        closeToast();
      }, 3000); // Duración del toast en milisegundos (3 segundos)

      return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
    }
  }, [toast.visible]);

  const handleEdit=(id:number,cultivo:string,edad:string)=>{
     setTipoCultivoEdit({id,cultivo,edad});
     handleOpenModalEdit();
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-128">
      {toast.visible && <Toast type={toast.type} message={toast.message} onClose={closeToast}/>}
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
          <Sprout /> Cultivos
        </h3>
        <button className="text-white inline-flex items-center bg-primary hover:bg-[#016F35] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-[#016F35] dark:focus:ring-primary justify-center mt-4 gap-2" onClick={handleOpenModal}>
          <CirclePlus /> Agregar cultivo
        </button>
      </div>
      <div className="contenedorcartas mt-4">
       {
        tiposCultivosD && tiposCultivosD?.map((tipoCultivo)=>(
           <div className="p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center">
          <div className="">
            <h4 className="text-[1.2rem] font-bold text-gray-900 dark:text-white">
              {tipoCultivo.cultivo}
            </h4>
            <span className="flex text-gray-700 dark:text-gray-400 items-center">
              <Clock className="inline mr-1 h-4 w-4" /> Edad: {tipoCultivo.edad}
            </span>
          </div>
          <div className="btones flex gap-2">
            <button onClick={()=>handleEdit(tipoCultivo.id ?? 0,tipoCultivo.cultivo,tipoCultivo.edad)} className=" items-center  font-medium rounded-lg text-sm p-2.5 text-center w-full justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              <Pencil className="h-4 w-4" />
            </button>

            <button onClick={()=>handleEliminar(tipoCultivo.id ?? 0)} className=" items-center  font-medium rounded-lg text-sm p-2.5 text-center w-full justify-center text-white bg-error hover:bg-red-900 focus:ring-4 focus:ring-gray-100   dark:bg-error dark:hover:bg-red-900 dark:focus:ring-error">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        ))}
      
      </div>
      <Modal isOpen={isModalOpen} title="Crea un tipo de cultivo" onClose={handleCloseModal}>
        <TiposCultivosForm />
      </Modal>
      <Modal isOpen={isModalOpenEdit} title="Edita un tipo de cultivo" onClose={handleCloseModalEdit}>
        <TiposCultivosForm tipoCultivo={tipoCultivoEdit}/>
      </Modal>
    </div>
  );
};

export default CartasCultivos;
