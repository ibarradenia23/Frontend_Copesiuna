import { MapPin, Pencil, Tractor, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Tooltip from "../../../common/components/Tooltip";
import Modal from "../../../common/components/Modal";


const CardParcela = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      <div className="header-card flex justify-between align-middle mb-2">
        <h4 className="text-[1.2rem] font-bold text-gray-900 dark:text-white">Parcela Norte</h4>
        <div className="btones flex gap-2">
          <Tooltip content="Editar Parcela">
          <button className=" items-center  font-medium rounded-lg text-sm p-2.5 text-center w-full justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            <Pencil className="h-4 w-4" />
          </button>
          </Tooltip>
          
          <button className=" items-center  font-medium rounded-lg text-sm p-2.5 text-center w-full justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            <Trash2 className="h-4 w-4" />
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
    </div>
  );
};

export default CardParcela;
