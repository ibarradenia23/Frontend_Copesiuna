import React, { useEffect, useState } from "react";
import { EstimacionSueloInterface, Propiedad } from "../models";
import { useActualizarPropiedadesSuelo } from "../hooks/useEstimacionSuelo";
import { useForm } from "react-hook-form";
import Toast from "../../../common/components/Toast";
import { useQueryClient } from "@tanstack/react-query";

interface DetalleEstimacionProps {
  estimacion: EstimacionSueloInterface;
  editar?: boolean;
}

const DetalleEstimacionSuelo: React.FC<DetalleEstimacionProps> = ({
  estimacion,
  editar,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    mutate: actualizarPropiedadSuelo,
    isError,
    isSuccess,
    error,
  } = useActualizarPropiedadesSuelo();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (editar === true) {
      setIsEditing(true);
    }
  }, [editar]);

  useEffect(() => {
    if (isSuccess) {
      setToast({
        type: "warning",
        message: "Propiedad de suelo se ha editado exitosamente.",
        visible: true,
      });
    }
    if (isError) {
      setToast({
        type: "error",
        message: "Error al editar propiedad de suelo",
        visible: true,
      });
    }
  }, [isSuccess, isError, error]);

  const onCancelar = () => {
    setIsEditing(false);
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

  const closeToast = () => {
    setToast({ ...toast, visible: false });
  };
  const [propiedadesOrdenadas, setPropiedadesOrdenadas] =
    useState<Propiedad[]>();

  // Ordenar las propiedades por ID
  useEffect(() => {
    setPropiedadesOrdenadas(
      [...estimacion.propiedades].sort((a, b) => (a.id || 0) - (b.id || 0))
    );
  }, [estimacion]);
  // const propiedadesOrdenadas = [...estimacion.propiedades].sort((a, b) => (a.id || 0) - (b.id || 0));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EstimacionSueloInterface>({
    defaultValues: {
      propiedades:
        propiedadesOrdenadas &&
        propiedadesOrdenadas.map((propiedad) => ({
          id: propiedad.id,
          nombre: propiedad.nombre,
          dato: propiedad.dato,
        })),
    },
  });

  // Actualizar los valores en el formulario cuando las propiedades ordenadas cambian
  useEffect(() => {
    if (propiedadesOrdenadas) {
      propiedadesOrdenadas.forEach((propiedad, index) => {
        setValue(`propiedades.${index}.id`, propiedad.id);
        setValue(`propiedades.${index}.nombre`, propiedad.nombre);
        setValue(`propiedades.${index}.dato`, propiedad.dato);
      });
    }
  }, [propiedadesOrdenadas, setValue]);

  const onSubmit = async (data: EstimacionSueloInterface) => {
    // Iterar sobre cada propiedad y enviar la actualización
    for (const propiedad of data.propiedades) {
      const payload = {
        id: Number(propiedad.id),
        nombre: propiedad.nombre, // El nombre no se edita
        dato: propiedad.dato, // Asegúrate de que este ID sea el correcto
      };

      actualizarPropiedadSuelo(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries(["estimacionesSuelo"]);
        },
      });
    }

    setIsEditing(false); // Desactivar el modo de edición después de actualizar
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
    <div>
      {toast.visible && (
        <Toast type={toast.type} message={toast.message} onClose={closeToast} />
      )}
      <section>
        <h3 className="text-lg font-semibold mb-2  text-gray-900 dark:text-white">
          Información General
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>ID:</strong> {estimacion.id}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Descripción:</strong> {estimacion.descripcion}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Fecha de levantamiento:</strong>{" "}
            {new Date(estimacion.fecha_levantamiento).toLocaleDateString()}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Fecha de laboratorio:</strong>{" "}
            {new Date(estimacion.fecha_e_laboratorio).toLocaleDateString()}
          </p>
        </div>
      </section>
      <section>
        <h3 className="text-lg font-semibold mb-2  text-gray-900 dark:text-white">
          Información del Productor
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Nombre:</strong> {estimacion.productor.nombre}{" "}
            {estimacion.productor.apellido}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Dirección:</strong> {estimacion.productor.direccion}
          </p>
        </div>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              {propiedadesOrdenadas &&
                propiedadesOrdenadas.map((propiedad, index) => (
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
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue={propiedad.dato}
                          {...register(`propiedades.${index}.dato`, {
                            required: "Este campo es obligatorio",
                          })}
                          className="border rounded p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-primary focus:border-primary mt-2"
                        />
                      ) : (
                        <span className="flex items-center h-full">
                          {propiedad.dato}
                        </span>
                      )}
                      {errors.propiedades?.[index]?.dato && (
                        <span className="text-red-500">
                          {errors.propiedades[index].dato.message}
                        </span>
                      )}
                    </td>

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
                ))}
            </tbody>
          </table>
        </section>
        {isEditing && (
          <div className="flex gap-2">
            <button
              type="submit"
              className="mt-4 bg-primary text-white py-2 px-4 rounded"
            >
              Actualizar Análisis de Suelo
            </button>
            <button
              onClick={onCancelar}
              type="button"
              className="mt-4 bg-red-800 text-white py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default DetalleEstimacionSuelo;
