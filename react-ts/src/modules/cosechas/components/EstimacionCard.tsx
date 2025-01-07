import React, { useState } from "react";
import { EstimacionCosechaInterface } from "../models";
import {
  Cloud,
  CloudRain,
  Edit2,
  Eye,
  FileSpreadsheet,
  Sun,
  Trash2,
} from "lucide-react";
import { ProductorInterface } from "../../productores/models";
import Modal from "../../../common/components/Modal";
import DetalleEstimacion from "./DetalleEstimacion";

interface EstimacionCardProp {
  estimacionCosecha: EstimacionCosechaInterface;
  productor?: ProductorInterface;
}

const EstimacionCard: React.FC<EstimacionCardProp> = ({
  estimacionCosecha,
  productor,
}) => {
  const weatherIcons: Record<
    EstimacionCosechaInterface["estado_clima"],
    React.FC<React.SVGProps<SVGSVGElement>>
  > = {
    Soleado: Sun,
    Nublado: Cloud,
    LLuvioso: CloudRain,
  };

  const WeatherIcon = weatherIcons[estimacionCosecha.estado_clima];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      key={estimacionCosecha.id}
      className="overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-[#111827] border-t-4 border-primary rounded-lg border"
    >
      <div className="flex flex-row items-center justify-between dark:bg-gray-800  bg-gray-50 p-4">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Ficha de estimacion
        </h3>
        <WeatherIcon className="h-8 w-8 text-primary" />
      </div>
      <div className="p-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Fecha de Creación:
            </span>{" "}
            {new Date(estimacionCosecha.fecha_create).toLocaleDateString(
              "es-ES",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </p>
          <p className="text-sm text-gray-500 ">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Parcela:
            </span>{" "}
            {estimacionCosecha.parcela.descripcion}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Productor:
            </span>{" "}
            {productor ? productor.nombre : ""}
          </p>
        </div>
        <span className="inline-block mt-3 bg-gray-200 dark:bg-gray-800 dark:text-gray-400 text-gray-600 text-xs font-medium px-2 py-1 rounded">
          {estimacionCosecha.estado_clima.charAt(0).toUpperCase() +
            estimacionCosecha.estado_clima.slice(1)}
        </span>
      </div>
      <div className="flex flex-wrap justify-between dark:bg-gray-800  bg-gray-50 p-4 gap-2">
        <button
          onClick={handleOpenModal}
          className="text-blue-500 hover:text-blue-700 border dark:border-gray-600 rounded px-3 py-2 text-sm flex items-center flex-grow basis-[calc(50%-0.25rem)] sm:basis-[calc(25%-0.375rem)]"
        >
          <Eye className="h-4 w-4 mr-2" />
          Examinar
        </button>
        <button className="text-green-500 hover:text-green-700 border dark:border-gray-600 rounded px-3 py-2 text-sm flex items-center flex-grow basis-[calc(50%-0.25rem)] sm:basis-[calc(25%-0.375rem)]">
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Excel
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
        title="Detalle de estimacion"
        width="min-w-[1000px]" 
      >
        <DetalleEstimacion estimacion={estimacionCosecha}/>
      </Modal>
    </div>
  );
};

export default EstimacionCard;
