import { MapPin, Pencil, Tractor, Trash2 } from "lucide-react";
import React from "react";
import CultivoItem from "./CultivoItem";
import Tooltip from "../../../common/components/Tooltip";

const CardParcela = () => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      <div className="header-card flex justify-between align-middle mb-2">
        <h4>Parcela Norte</h4>
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
      <div className="flex items-center justify-between text-sm">
        <span>
          <MapPin className="inline mr-1 h-4 w-4" /> 20 hectáreas
        </span>
        <span>
          <Tractor className="inline mr-1 h-4 w-4" /> Regadio
        </span>
      </div>
      <h5 className="font-semibold my-2 text-primary">Cultivos de Cacao:</h5>
      <div className="cultivos flex flex-col gap-2">
        <CultivoItem/>
        <CultivoItem/>
      </div>
      <button  className=" inline-flex items-center  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 w-full justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> <svg
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
        </svg> Agregar cultivo de cacao</button>
    </div>
  );
};

export default CardParcela;
