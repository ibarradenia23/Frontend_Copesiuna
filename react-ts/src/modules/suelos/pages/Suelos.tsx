import React, { useEffect, useState } from "react";
import Navbar from "../../../common/components/Navbar";
import useAuth from "../../auth/hooks/useAuth";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { authTokenState } from "../../auth/state/authAtom";
import { isTokenExpired } from "../../auth/utils/tokenUtils";
import { FileSpreadsheet } from "lucide-react";
import { useObtenerEstimacionesSuelo } from "../hooks/useEstimacionSuelo";
import { EstimacionSueloInterface } from "../models";
import EstimacionSueloCard from "../components/EstimacionSueloCard";
import ExcelJS from "exceljs";

const Suelos = () => {
  const { logout } = useAuth();
  const token = useRecoilValue(authTokenState);
  const navigate = useNavigate();
  const { data: estimacionSueloResponse } = useObtenerEstimacionesSuelo();
  const [estimacionesSuelos, setEstimacionesSuelos] = useState<
    EstimacionSueloInterface[]
  >([]);

  const traerEstimacionesSuelos = () => {
    if (
      estimacionSueloResponse &&
      Array.isArray(estimacionSueloResponse.data)
    ) {
      setEstimacionesSuelos(estimacionSueloResponse.data);
    }
  };

  useEffect(() => {
    traerEstimacionesSuelos();
  }, [estimacionSueloResponse]);

  useEffect(() => {
    if (isTokenExpired(token)) {
      logout();
    }
  }, [token, navigate]);

  const handleExportToExel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Datos");

    // Agregar el encabezado que ocupa desde la columna A hasta la columna E
    const headerRow = worksheet.addRow([
      "COOPERATIVA AGROPECUARIA MULTISECTORIAL DE SIUNA R.L",
    ]);
    worksheet.mergeCells("A1:P2"); // Fusionar celdas de A1 a E2
    headerRow.getCell(1).alignment = { horizontal: "center" };

    // Establecer estilo para el encabezado
    headerRow.getCell(1).font = { bold: true, size: 14 }; // Negrita y tamaño 14

    // Agregar la fila 2 con el texto "Hoja de muestreo en cacao"
    const samplingRow = worksheet.addRow([
      "Base de datos de análisis físico químico de suelo en parcela de proceso de certificación Raint Forest y orgánico",
    ]);
    worksheet.mergeCells("A3:P3"); // Fusionar celdas de A3 a E3
    samplingRow.getCell(1).alignment = { horizontal: "center" }; // Centrar el texto
    samplingRow.getCell(1).font = { bold: true, size: 12 }; // Negrita y tamaño 12

    // Agregar filas vacías hasta la fila 7
    for (let i = 0; i < 1; i++) {
      worksheet.addRow([]);
    }

    const samplingRow2 = worksheet.addRow(["RESULTADOS"]);
    worksheet.mergeCells("A5:P5"); // Fusionar celdas de A3 a E3
    samplingRow2.getCell(1).alignment = { horizontal: "center" }; // Centrar el texto
    samplingRow2.getCell(1).font = { bold: true, size: 12 };

    // Definir los encabezados
    const headerColumnsRow = worksheet.addRow([
      "N°",
      "Nombre y apellido del productor",
      "Textura",
      "Color",
      "PH",
      "Nitrogeno",
      "Potassium",
      "Aluminium",
      "Calcium",
      "Ferric Iron",
      "Humus",
      "Magnecium",
      "Sulfate",
      "Fecha de levantamiento en campo",
      "Fecha de en laboratorio",
    ]);

    // Aplicar negrita y color de fondo a los encabezados de las columnas
    headerColumnsRow.eachCell((cell) => {
      cell.font = { bold: true }; // Negrita para cada celda del encabezado
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "F8CBAD" }, // Color de fondo para los encabezados
      };
      cell.alignment = { horizontal: "center" };
    });

    // Definir un tipo para las propiedades
    type Propiedades = {
      tectura?: string;
      color?: string;
      ph?: string;
      nitrogen?: string;
      potassium?: string;
      aluminum?: string;
      calcium?: string;
      ferric_iron?: string;
      humus?: string;
      magnecium?: string;
      sulfate?: string;
    };

    //Extraccion de los datos
    const exportData = estimacionesSuelos.flatMap((estimacion, index) => {
      const propiedades: Propiedades = estimacion.propiedades.reduce(
        (acc: Propiedades, propiedad) => {
          acc[propiedad.nombre as keyof Propiedades] = propiedad.dato; // Mapeo de propiedades
          return acc;
        },
        {}
      );
      return {
        numero: index + 1,
        nombreProductor: `${estimacion.productor.nombre} ${estimacion.productor.apellido}`,
        textura: propiedades["tectura"] || "",
        color: propiedades["color"] || "",
        ph: propiedades["ph"] || "",
        nitrogeno: propiedades["nitrogen"] || "",
        potassium: propiedades["potassium"] || "",
        aluminium: propiedades["aluminum"] || "",
        calcium: propiedades["calcium"] || "",
        ferricIron: propiedades["ferric_iron"] || "",
        humus: propiedades["humus"] || "",
        magnecium: propiedades["magnecium"] || "",
        sulfate: propiedades["sulfate"] || "",
        fechaLevantamiento: new Date(
          estimacion.fecha_levantamiento
        ).toLocaleDateString(),
        fechaLaboratorio: new Date(
          estimacion.fecha_e_laboratorio
        ).toLocaleDateString(),
      };
    });

    // Agregar los datos a la hoja
    exportData.forEach((data) => {
      const row = worksheet.addRow([
        data.numero,
        data.nombreProductor,
        data.textura,
        data.color,
        data.ph,
        data.nitrogeno,
        data.potassium,
        data.aluminium,
        data.calcium,
        data.ferricIron,
        data.humus,
        data.magnecium,
        data.sulfate,
        data.fechaLevantamiento,
        data.fechaLaboratorio,
      ]);
      row.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFE699" }, // Color de fondo para los datos
        };
        cell.alignment = { horizontal: "center" };
      });
    });

    // Aplicar bordes a todas las celdas a partir de la fila 6
    const startRow = 6; // Fila desde la cual aplicar bordes
    if (worksheet.lastRow) {
      for (let i = startRow; i <= worksheet.lastRow.number; i++) {
        const row = worksheet.getRow(i);
        row.eachCell((cell) => {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      }
    }

    // Ajustar el ancho de las columnas
    worksheet.columns = [
      { width: 5 }, // N°
      { width: 30 }, // Nombre y apellido del productor
      { width: 15 }, // Textura
      { width: 15 }, // Color
      { width: 7 }, // PH
      { width: 10 }, // Nitrogeno
      { width: 10 }, // Potassium
      { width: 15 }, // Aluminium
      { width: 10 }, // Calcium
      { width: 15 }, // Ferric Iron
      { width: 10 }, // Humus
      { width: 15 }, // Magnecium
      { width: 10 }, // Sulfate
      { width: 35 }, // Fecha de levantamiento en campo
      { width: 25 }, // Fecha de en laboratorio
    ];
    // Guardar el archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Analisis de suelo.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <main className="bg-white border-gray-200 dark:bg-gray-900">
      <Navbar />
      <section className="max-w-screen-xl mx-auto p-4 min-h-[38rem]">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Dashboard
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportToExel}
              className="bg-primary hover:bg-[#016F35] text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none flex align-middle items-center gap-2"
            >
              <FileSpreadsheet /> Exportar a exel
            </button>
          </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {estimacionesSuelos.map((estimacion) => (
            <EstimacionSueloCard estimacionSuelo={estimacion} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Suelos;
