import React from "react";
import { EstimacionSueloInterface } from "../models";

interface DetalleEstimacionProps {
  estimacion: EstimacionSueloInterface;
}

const DetalleEstimacionSuelo: React.FC<DetalleEstimacionProps> = ({
  estimacion,
}) => {
    
  return (
    <div>
      <section>
              <h3 className="text-lg font-semibold mb-2  text-gray-900 dark:text-white">Información General</h3>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-700 dark:text-gray-300"><strong>ID:</strong> {estimacion.id}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Descripción:</strong> {estimacion.descripcion}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Fecha de levantamiento:</strong> {new Date(estimacion.fecha_levantamiento).toLocaleDateString()}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Fecha de laboratorio:</strong> {new Date(estimacion.fecha_e_laboratorio).toLocaleDateString()}</p>
              </div>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-2  text-gray-900 dark:text-white">Información del Productor</h3>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-700 dark:text-gray-300"><strong>Nombre:</strong> {estimacion.productor.nombre} {estimacion.productor.apellido}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Dirección:</strong> {estimacion.productor.direccion}</p>
              </div>
            </section>
            <section className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 sm:rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:bg-gray-800 dark:text-gray-400">
            <tr>
                    <th scope="col" className="px-6 py-3">
                      Propiedad
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Valor
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
                {
                    estimacion.propiedades.map((propiedad)=>(
                        <tr
                        key={propiedad.id}
                        className="bg-white border-b dark:bg-gray-700 dark:border-gray-700"
                      >
                         <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {propiedad.nombre}
                        </th>
                        <td className="px-6 py-4">{propiedad.dato}</td>
                        <td className="px-6 py-4">
                          {new Date(propiedad.fecha_create).toLocaleDateString(
                            "es-ES",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(propiedad.fecha_update).toLocaleDateString(
                            "es-ES",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </td>
                      </tr>
                    ))
                }
            </tbody>
            </table>
            </section>
    </div>
  );
};

export default DetalleEstimacionSuelo;
