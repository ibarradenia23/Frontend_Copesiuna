import React, { useEffect, useState } from "react";
import { AfectacionesInterface, EstimacionCosechaInterface, PlantasInterface } from "../models";
import { useObtenerAfectaciones } from "../hooks/useAfactaciones";

interface DetalleEstimacionProps {
  estimacion: EstimacionCosechaInterface;
}

const DetalleEstimacion: React.FC<DetalleEstimacionProps> = ({
  estimacion,
}) => {
  const [plantas, setPlantas] = useState<PlantasInterface[]>([]);
  const [afectacionesData,setAfectacionesData] = useState<AfectacionesInterface[]>([])
  
    const {data:afectacionesResponse} = useObtenerAfectaciones();

     const traerAfectaciones =()=>{
        if(afectacionesResponse && Array.isArray(afectacionesResponse.data)){
          setAfectacionesData(afectacionesResponse.data);
        }
        
      }

      const obtenerAfcetacionPorId =(id:number):AfectacionesInterface | undefined=>{
        return afectacionesData.find(afectacion =>afectacion.id === id);
      }
    
      useEffect(()=>{
       traerAfectaciones();
      },[afectacionesResponse]);

  useEffect(() => {
    if (estimacion) {
      setPlantas(estimacion.plantas);
    }
  }, [estimacion]);

  return (
    <section>
      <div className="flex flex-col gap-2">
        {plantas.map((planta) => (
          <div
            key={planta.id}
            className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-40"
          >
            <h4 className="text-[1.2rem] font-bold text-gray-900 dark:text-white">
              Planta {planta.id}
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-gray-700 dark:text-gray-300">
                ID: {planta.id}
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                ID Afectación: {planta.ID_afectacion}
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                ID Parcela: {estimacion.parcela.descripcion}
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                ID Estimación: {planta.ID_estimacion}
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                Fecha Creación:{" "}
                {new Date(planta.fecha_create).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                Fecha Actualización:{" "}
                {new Date(planta.fecha_update).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Mazorcas
            </h3>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 sm:rounded-lg">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Cantidad
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Afectacion
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Fecha de creacion
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Fecha de actualizacion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {planta.mazorcas.map((mazorca) => {
                    const afectacion = obtenerAfcetacionPorId(Number(mazorca.ID_afectacion))
                    return (
                      <tr
                        key={mazorca.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {mazorca.id}
                        </th>
                        <td className="px-6 py-4">{mazorca.cantidad}</td>
                        <td className="px-6 py-4">{afectacion?.nombre}</td>
                        <td className="px-6 py-4">
                          {new Date(mazorca.fecha_create).toLocaleDateString(
                            "es-ES",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(mazorca.fecha_update).toLocaleDateString(
                            "es-ES",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetalleEstimacion;
