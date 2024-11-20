import { MapPin, Pencil, Tractor, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Tooltip from "../../../common/components/Tooltip";
import Modal from "../../../common/components/Modal";
import ParcelaForm from "./ParcelaForm";
import { useEliminarParcela } from "../hooks/useParcela";
import Toast from "../../../common/components/Toast";


const CardParcela = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
    visible: boolean;
  }>({
    type: "success", // Valor por defecto
    message: "",
    visible: false,
  });

  const { mutate: eliminarParcela, isError, isSuccess, error } = useEliminarParcela();

  const handleEliminar = (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta parcela?")) {
        eliminarParcela(id);
    }
};

useEffect(()=>{
  if(isSuccess){
   setToast({
     type: "warning",
       message: "Parcela se ha eliminado exitosamente.",
       visible: true,
   })
  } 
  if(isError){
   setToast({
     type: "error",
       message: "Error al eliminar parcela",
       visible: true,
   })
  }
 },[isSuccess,isError,error]);

 const closeToast = () => {
  setToast({ ...toast, visible: false });
};

  const parcelaprueba = {
    id:1,
    descripcion: 'Parcela norte',
    tamaño_parcela: '24 mz',
    id_productor:1,
    id_cultivo:1,
    id_tipo_parcela:1,
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      {
        toast.visible && <Toast type={toast.type} message={toast.message} onClose={closeToast}/>
      }
      <div className="header-card flex justify-between align-middle mb-2">
        <h4 className="text-[1.2rem] font-bold text-gray-900 dark:text-white">Parcela Norte</h4>
        <div className="btones flex gap-2">
          <Tooltip content="Editar Parcela">
          <button className=" items-center  font-medium rounded-lg text-sm p-2.5 text-center w-full justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleOpenModal}>
            <Pencil className="h-4 w-4" />
          </button>
          </Tooltip>
          
          <button onClick={()=>handleEliminar(1)} className=" items-center  font-medium rounded-lg text-sm p-2.5 text-center w-full justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            <Trash2 className="h-4 w-4"/>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm mt-3">
        <span className="flex text-gray-700 dark:text-gray-400 items-center">
          <MapPin className="inline mr-1 h-4 w-4" /> 20 hectáreas
        </span>
        <span className="flex text-gray-700 dark:text-gray-400 items-center">
          <Tractor className="inline mr-1 h-4 w-4" /> Regadio
        </span>
      </div>
      <div className="flex justify-between align-middle mt-2 items-center">
      <h5 className="my-2 text-gray-900 dark:text-white">Cultivos de Cacao:</h5>  
      <p className=" text-gray-700 dark:text-gray-400">Criollo</p>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title='Actualiza esta parcela'>
            <ParcelaForm parcela={parcelaprueba}/>
          </Modal>
    </div>
  );
};

export default CardParcela;
