import { useEffect, useState } from "react";
import { useObtenerEstimaciones } from "../hooks/useEstimaciones";
import { EstimacionCosechaInterface } from "../models";
import EstimacionCard from "./EstimacionCard";
import { useObtenerProductores } from "../../productores/hooks/useProductor";
import { ProductorInterface } from "../../productores/models";

const Estimacion = () => {
  const { data: estimacionResponse } = useObtenerEstimaciones();
  const [estimaciones, setEstimaciones] = useState<
    EstimacionCosechaInterface[]
  >([]);
  const { data: productoresResponse } = useObtenerProductores();
  const [productores, setProductores] = useState<ProductorInterface[]>([]);

  const traerProductores = () => {
    if (productoresResponse && Array.isArray(productoresResponse.data)) {
      setProductores(productoresResponse.data); // Asigna directamente el array de productores
    }
  };

  useEffect(() => {
    traerProductores();
  }, [productoresResponse]);

  const traerEstimacionesCosecha = () => {
    console.log("Datos de la estimacion", estimacionResponse);
    if (estimacionResponse && Array.isArray(estimacionResponse.data)) {
      setEstimaciones(estimacionResponse.data);
    }
  };

  const obtenerProductorPorId = (
    id: number
  ): ProductorInterface | undefined => {
    return productores.find((productor) => productor.id === id);
  };

  useEffect(() => {
    console.log("jsjjdjdj");
    traerEstimacionesCosecha();
  }, [estimacionResponse]);

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
      {estimaciones.map((estimacion) => {
        const productor = obtenerProductorPorId(
          Number(estimacion.parcela.ID_productor)
        );
        return (
          <EstimacionCard
            productor={productor}
            key={estimacion.id}
            estimacionCosecha={estimacion}
          />
        );
      })}
    </div>
  );
};

export default Estimacion;
