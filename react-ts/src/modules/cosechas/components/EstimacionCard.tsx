import React, { useEffect, useState } from "react";
import { AfectacionesInterface, EstimacionCosechaInterface } from "../models";
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
import ExcelJS from "exceljs";
import { useObtenerAfectaciones } from "../hooks/useAfactaciones";

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

  const [afectacionesData, setAfectacionesData] = useState<
    AfectacionesInterface[]
  >([]);

  const { data: afectacionesResponse } = useObtenerAfectaciones();

  //Traer objeto de afcetaciones.
  const traerAfectaciones = () => {
    if (afectacionesResponse && Array.isArray(afectacionesResponse.data)) {
      setAfectacionesData(afectacionesResponse.data);
    }
  };

  useEffect(() => {
    traerAfectaciones();
  }, [afectacionesResponse]);

  const obtenerAfcetacionPorId = (
    id: number
  ): AfectacionesInterface | undefined => {
    return afectacionesData.find((afectacion) => afectacion.id === id);
  };

  const WeatherIcon = weatherIcons[estimacionCosecha.estado_clima];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Datos");

    // Agregar el encabezado que ocupa desde la columna A hasta la columna E
    const headerRow = worksheet.addRow([
      "COOPERATIVA AGROPECUARIA MULTISECTORIAL DE SIUNA R.L",
    ]);
    worksheet.mergeCells("A1:E2"); // Fusionar celdas de A1 a E2
    headerRow.getCell(1).alignment = { horizontal: "center" }; // Centrar el texto

    // Establecer estilo para el encabezado
    headerRow.getCell(1).font = { bold: true, size: 14 }; // Negrita y tamaño 14

    // Agregar la imagen al lado del título
    /*const imageId = workbook.addImage({
    filename: '../../../public/logo1.png', // Reemplaza con la ruta de tu imagen
    extension: 'png',
  });
  worksheet.addImage(imageId, 'F1:G2'); */

    // Agregar la fila 3 con el texto "Hoja de muestreo en cacao"
    const samplingRow = worksheet.addRow([
      "Hoja de muestreo en cacao (Estimación de cosecha, plagas y enfermedades)",
    ]);
    worksheet.mergeCells("A3:E3"); // Fusionar celdas de A3 a E3
    samplingRow.getCell(1).alignment = { horizontal: "center" }; // Centrar el texto
    samplingRow.getCell(1).font = { bold: true, size: 12 }; // Negrita y tamaño 12

    // Rellenar la fila 4
    worksheet.addRow([
      "Fecha:",
      new Date(estimacionCosecha.fecha_create).toLocaleDateString(),
      "",
      "Tipo de Cultivo:",
      "Cacao",
    ]); // Ajusta el tipo de cultivo según sea necesario
    worksheet.getCell("A4").font = { bold: true }; // Negrita para la etiqueta "Fecha"
    worksheet.getCell("D4").font = { bold: true }; // Negrita para la etiqueta "Tipo de Cultivo"

    // Rellenar la fila 5
    worksheet.addRow([
      "Tipo de Parcela:",
      estimacionCosecha.parcela.descripcion,
      "",
      "Edad:",
      "2 años",
    ]); // Ajusta los valores según sea necesario
    worksheet.getCell("A5").font = { bold: true }; // Negrita para la etiqueta "Tipo de Parcela"
    worksheet.getCell("D5").font = { bold: true }; // Negrita para la etiqueta "Edad"

    // Rellenar la fila 6
    worksheet.addRow([
      "Nombre del Productor:",
      productor?.nombre,
      "",
      "Estado del Clima:",
      estimacionCosecha.estado_clima,
    ]); // Ajusta el nombre del productor según sea necesario
    worksheet.getCell("A6").font = { bold: true }; // Negrita para la etiqueta "Nombre del Productor"
    worksheet.getCell("D6").font = { bold: true }; // Negrita para la etiqueta "Estado del Clima"

    // Agregar filas vacías hasta la fila 7
    for (let i = 0; i < 1; i++) {
      worksheet.addRow([]);
    }

    // Definir los encabezados
    const headerColumnsRow = worksheet.addRow([
      "Mazorca",
      "Número de Planta",
      "ID Afectación Planta",
      "ID Afectación Mazorca",
      "Cantidad",
    ]);

    // Aplicar negrita a los encabezados de las columnas
    headerColumnsRow.eachCell((cell) => {
      cell.font = { bold: true }; // Negrita para cada celda del encabezado
    });

    // Transformar los datos en un formato adecuado para Excel
    const exportData = estimacionCosecha.plantas.flatMap((planta) => {
      return planta.mazorcas.map((mazorca) => {
        const afectacion = obtenerAfcetacionPorId(
          Number(mazorca.ID_afectacion)
        );
        return {
          numeroPlanta: planta.id,
          ID_afectacion_planta: planta.ID_afectacion,
          ID_afectacion_mazorca: afectacion?.nombre,
          cantidad: mazorca.cantidad,
        };
      });
    });

    // Agregar los datos a la hoja, comenzando desde la fila 8
    exportData.forEach((data, index) => {
      worksheet.addRow([
        `Mazorca ${index + 1}`,
        data.numeroPlanta,
        data.ID_afectacion_planta,
        data.ID_afectacion_mazorca,
        data.cantidad,
      ]);
    });

    // Aplicar bordes a todas las celdas
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 8) {
        // Solo aplicar bordes a las filas de datos
        row.eachCell((cell) => {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      }
    });

    // Ajustar el ancho de las columnas
    worksheet.columns.forEach((column) => {
      column.width = 20; // Ajusta el ancho según sea necesario
    });

    // Guardar el archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `estimacion_cosecha${estimacionCosecha.id}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
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
        <button
          onClick={handleExportToExcel}
          className="text-green-500 hover:text-green-700 border dark:border-gray-600 rounded px-3 py-2 text-sm flex items-center flex-grow basis-[calc(50%-0.25rem)] sm:basis-[calc(25%-0.375rem)]"
        >
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
        <DetalleEstimacion
          afectaciones={afectacionesData}
          estimacion={estimacionCosecha}
        />
      </Modal>
    </div>
  );
};

export default EstimacionCard;
