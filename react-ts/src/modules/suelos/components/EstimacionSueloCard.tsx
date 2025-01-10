import React, { useState } from "react";
import { EstimacionSueloInterface } from "../models";
import { Edit2, Eye, LandPlot, Trash2 } from "lucide-react";
import Modal from "../../../common/components/Modal";
import DetalleEstimacionSuelo from "./DetalleEstimacionSuelo";

interface EstimacionSueloProps {
  estimacionSuelo: EstimacionSueloInterface;
}

const EstimacionSueloCard: React.FC<EstimacionSueloProps> = ({
  estimacionSuelo,
}) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  return (
    <div className="overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-[#111827] border-t-4 border-primary rounded-lg border">
      <div className="flex flex-row items-center justify-between dark:bg-gray-800  bg-gray-50 p-4">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Ficha de analisis
        </h3>
        <LandPlot className="h-8 w-8 text-primary" />
      </div>
      <div className="p-4">
        <div className="space-y-2">
          <h4 className=" text-gray-500 text-xl">
            {" "}
            <span className=" text-gray-700 dark:text-gray-300">
              Productor:{" "}
            </span>
            {estimacionSuelo.productor.nombre}
          </h4>
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Fecha de levantamiento:
            </span>{" "}
            {new Date(estimacionSuelo?.fecha_levantamiento).toLocaleDateString(
              "es-ES",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Fecha de laboratorio:
            </span>{" "}
            {new Date(estimacionSuelo?.fecha_levantamiento).toLocaleDateString(
              "es-ES",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-between dark:bg-gray-800  bg-gray-50 p-4 gap-2">
        <button onClick={handleOpenModal} className="text-blue-500 hover:text-blue-700 border dark:border-gray-600 rounded px-3 py-2 text-sm flex items-center flex-grow basis-[calc(50%-0.25rem)] sm:basis-[calc(25%-0.375rem)]">
          <Eye className="h-4 w-4 mr-2" />
          Examinar
        </button>

        <button className="text-red-500 hover:text-red-700 border dark:border-gray-600 rounded px-3 py-2 text-sm flex items-center flex-grow basis-[calc(50%-0.25rem)] sm:basis-[calc(25%-0.375rem)]">
          <Trash2 className="h-4 w-4 mr-2" />
          Eliminar
        </button>
        <button className="text-yellow-500 hover:text-yellow-700 border dark:border-gray-600 rounded px-3 py-2 text-sm flex items-center flex-grow basis-[calc(50%-0.25rem)] sm:basis-[calc(25%-0.375rem)] justify-center">
          <Edit2 className="h-4 w-4 mr-2" />
          Editar
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Detalle de estimacion de suelo"
        width="min-w-[760px]"
      >
        <DetalleEstimacionSuelo estimacion={estimacionSuelo}/>
      </Modal>
    </div>
  );
};

export default EstimacionSueloCard;
