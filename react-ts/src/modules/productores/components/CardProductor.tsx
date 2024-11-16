import { Fingerprint, MapPinHouse, Pencil, Trash2 } from "lucide-react";
import ImagenTemporal from "../../../../public/profile.jpg";
import Accordion from "../../../common/components/Acordion";
import CardParcela from "./CardParcela";

const CardProductor = () => {
  return (
    <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="pb-2">
        <div className="flex items-center space-x-4">
          <img
            src={ImagenTemporal}
            alt={"Mariana Melendez"}
            className="w-16 h-16 rounded-full border-2 border-primary"
          />
          <div>
            <h3 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Mariana Melendez
            </h3>
            <p className="font-normal text-gray-500 dark:text-gray-400">
              ID: 1
            </p>
          </div>
        </div>
        <div className="">
          <div className="flex items-center mb-2 text-sm text-gray-600 mt-2">
            <MapPinHouse className="mr-2 h-4 w-4" />
            <span>Marco antonio somarriba</span>
          </div>
          <div className="flex items-center mb-4 text-sm text-gray-600">
            <Fingerprint className="mr-2 h-4 w-4" />
            <span>611-120306-1015G</span>
          </div>
        </div>

        <div className="border-t dark:border-gray-600">
          <Accordion title="Parcelas y cultivos">
            <CardParcela />
            <button className="text-white inline-flex items-center bg-primary hover:bg-[#016F35] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-[#016F35] dark:focus:ring-primary w-full justify-center">
          {" "}
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
          </svg>{" "}
          Agregar parcela
        </button>
          </Accordion>
        </div>
       
      </div>
      <div className="border-t dark:border-gray-600 mt-2 flex justify-end gap-4 pt-6">
        <button className="inline-flex">
          {" "}
          <Pencil className="h-4 w-4 mr-2" />
          Editar
        </button>
        <button className="inline-flex">
          {" "}
          <Trash2 className="h-4 w-4 mr-2" />
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CardProductor;
