import React, { useEffect, useState } from "react";
import {
  AfectacionesInterface,
  EstimacionCosechaInterface,
  MazorcaInterface,
  PlantasInterface,
} from "../models";
import { useForm } from "react-hook-form";
import {
  useActualizarMazorcas,
} from "../hooks/useEstimaciones";
import Toast from "../../../common/components/Toast";
import { useQueryClient } from "@tanstack/react-query";

interface DetalleEstimacionProps {
  estimacion: EstimacionCosechaInterface;
  afectaciones: AfectacionesInterface[];
}

const DetalleEstimacion: React.FC<DetalleEstimacionProps> = ({
  estimacion,
  afectaciones,
}) => {
  const [estimacionData, setEstimacionData] =
    useState<EstimacionCosechaInterface>(estimacion);
  const [plantas, setPlantas] = useState<PlantasInterface[]>([]);
  const [afectacionesData, setAfectacionesData] = useState<
    AfectacionesInterface[]
  >([]);
  const [editingMazorca, setEditingMazorca] = useState<MazorcaInterface | null>(
    null
  );
  const [cantidad, setCantidad] = useState<number | undefined>(undefined);
  const [afectacionId, setAfectacionId] = useState<number | undefined>(
    undefined
  );

    const queryClient = useQueryClient();


  useEffect(() => {
    setEstimacionData(estimacion);
  }, [estimacion]);


  const traerAfectaciones = () => {
    if (afectaciones && Array.isArray(afectaciones)) {
      setAfectacionesData(afectaciones);
    }
  };

  const {
    mutate: actualizarMazorca,
    isError,
    isSuccess,
    error,
  } = useActualizarMazorcas();

  const { handleSubmit } = useForm<MazorcaInterface>();

  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
    visible: boolean;
  }>({
    type: "success", // Valor por defecto
    message: "",
    visible: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setToast({
        type: "warning",
        message: "Mazorca se ha editado exitosamente.",
        visible: true,
      });

    }
    if (isError) {
      setToast({
        type: "error",
        message: "Error al editar mazorca",
        visible: true,
      });
    }
  }, [isSuccess, isError, error]);

  const obtenerAfcetacionPorId = (
    id: number
  ): AfectacionesInterface | undefined => {
    return afectacionesData.find((afectacion) => afectacion.id === id);
  };

  useEffect(() => {
    traerAfectaciones();
  }, [afectaciones]);

  const handleEditMazorca = (mazorca: MazorcaInterface) => {
    setEditingMazorca(mazorca);
    setCantidad(mazorca.cantidad);
    setAfectacionId(mazorca.ID_afectacion);
  };

  const onSubmit = async () => {
    const payload = {
      id: Number(editingMazorca?.id),
      cantidad: Number(cantidad),
      ID_afectacion: Number(afectacionId),
    };
    actualizarMazorca(payload,{
      onSuccess: () => {
        queryClient.invalidateQueries(["estimacionesCosecha"]);
      },
    });
    setEditingMazorca(null);

    /*setTimeout(() => {
      updateData();
    }, 3000);*/
  };

  useEffect(() => {
    if (estimacionData) {
      // Ordenar las mazorcas por ID al cargar
      const plantasConMazorcasOrdenadas = estimacionData.plantas.map(
        (planta) => ({
          ...planta,
          mazorcas: planta.mazorcas.sort(
            (a, b) => (a.id as number) - (b.id as number)
          ), // Ordenar por ID
        })
      );
      setPlantas(plantasConMazorcasOrdenadas);
    }
  }, [estimacionData]);

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
      <div className="flex flex-col gap-2">
        {plantas.map((planta) => {
          const afectacion = obtenerAfcetacionPorId(
            Number(planta.ID_afectacion)
          );
          return (
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
                  Afectación: {afectacion?.nombre}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  Parcela: {estimacion.parcela.descripcion}
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
                      <th scope="col" className="px-6 py-3">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {planta.mazorcas.map((mazorca) => {
                      const afectacion = obtenerAfcetacionPorId(
                        Number(mazorca.ID_afectacion)
                      );
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
                          <td className="px-6 py-4">
                            {editingMazorca?.id === mazorca.id ? (
                              <input
                                type="number"
                                value={cantidad}
                                onChange={(e) =>
                                  setCantidad(Number(e.target.value))
                                }
                                className="border border-gray-300 rounded p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-primary focus:border-primary"
                              />
                            ) : (
                              mazorca.cantidad
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {editingMazorca?.id === mazorca.id ? (
                              <select
                                value={afectacionId}
                                onChange={(e) =>
                                  setAfectacionId(Number(e.target.value))
                                }
                                className="border border-gray-300 rounded p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-primary focus:border-primary"
                              >
                                {afectacionesData.map((afectacion) => (
                                  <option
                                    key={afectacion.id}
                                    value={afectacion.id}
                                  >
                                    {afectacion.nombre}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              afectacion?.nombre
                            )}
                          </td>
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
                          <td className="px-6 py-4">
                            {editingMazorca?.id === mazorca.id ? (
                              <form onSubmit={handleSubmit(onSubmit)}>
                                <button
                                  type="submit"
                                  /*onClick={handleSaveMazorca}*/ className="text-primary hover:underline"
                                >
                                  Guardar
                                </button>
                              </form>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleEditMazorca(mazorca)}
                                className="text-primary hover:underline"
                              >
                                Editar
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DetalleEstimacion;
