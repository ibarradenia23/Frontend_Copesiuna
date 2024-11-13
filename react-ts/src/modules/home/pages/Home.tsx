import React from "react";
import Navbar from "../../../common/components/Navbar";
import {
  CalendarDays,
  Clipboard,
  FileSpreadsheet,
  BarChart3,
  Leaf,
  Sprout,
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Home = () => {
  //Datos para mostrar en la grafica
  const soilAnalysisData = [
    { nutriente: "Nitrógeno", valor: 45 },
    { nutriente: "Fósforo", valor: 28 },
    { nutriente: "Potasio", valor: 60 },
    { nutriente: "Calcio", valor: 53 },
    { nutriente: "Magnesio", valor: 32 },
  ];
  return (
    <main className="bg-white border-gray-200 dark:bg-gray-900">
      <Navbar />
      <section className="max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <button className="bg-[#D27E2C] hover:bg-[#B26A1F] text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
              Descargar Reporte
            </button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="border-l-4 border-[#D27E2C] p-6 bg-white border rounded-lg shadow dark:bg-gray-800 ">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-[#D27E2C]">
                Bitacoras de suelo
              </p>
              <Clipboard className="h-4 w-4 text-[#D27E2C]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                24
              </div>
              <p className="text-xs text-muted-foreground text-gray-700 dark:text-gray-400">
                +2 desde el ultimo mes
              </p>
            </div>
          </div>
          <div className="border-l-4 border-[#D27E2C] p-6 bg-white border rounded-lg shadow dark:bg-gray-800 ">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-[#D27E2C]">
                Estimaciones de Cosecha
              </p>
              <Sprout className="h-4 w-4 text-[#D27E2C]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                15
              </div>
              <p className="text-xs text-muted-foreground text-gray-700 dark:text-gray-400">
                +4 desde la última semana
              </p>
            </div>
          </div>
          <div className="border-l-4 border-[#D27E2C] p-6 bg-white border rounded-lg shadow dark:bg-gray-800 ">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-[#D27E2C]">
                Parcelas analizadas
              </p>
              <Leaf className="h-4 w-4 text-[#D27E2C]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                15
              </div>
              <p className="text-xs text-muted-foreground text-gray-700 dark:text-gray-400">
                +7 desde el ultimo mes
              </p>
            </div>
          </div>
          <div className="border-l-4 border-[#D27E2C] p-6 bg-white border rounded-lg shadow dark:bg-gray-800">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-[#D27E2C]">
                Proxima cochecha estimada
              </p>
              <CalendarDays className="h-4 w-4 text-[#D27E2C]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                23 de Enero
              </div>
              <p className="text-xs text-muted-foreground text-gray-700 dark:text-gray-400">
                En n días
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 my-4">
          <div className="col-span-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Resumen de Análisis de Suelo
              </h5>
            </div>
            <div className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={soilAnalysisData}>
                  <XAxis dataKey="nutriente" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="valor" fill="#D27E2C" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-span-3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Estimaciones recientes
              </h5>
              <p className="text-gray-700 dark:text-gray-400">
                Has completado 3 estimaciones esta semana
              </p>
            </div>
            <div>
              <div className="space-y-8 mt-4">
                <div className="flex items-center">
                  <Sprout className="mr-2 h-4 w-4 text-gray-900 dark:text-white" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                      Maíz - Parcela Norte
                    </p>
                    <p className="text-sm text-muted-foreground text-gray-700 dark:text-gray-400">
                      Estimado: 5.2 ton/ha
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-gray-900 dark:text-white mr-2">+12%</div>
                  <div className="w-20 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-secondary h-2.5 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center ">
                  <Sprout className="mr-2 h-4 w-4 text-gray-900 dark:text-white" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                      Trigo - Parcela Este
                    </p>
                    <p className="text-sm text-muted-foreground text-gray-700 dark:text-gray-400">
                      Estimado: 3.8 ton/ha
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-gray-900 dark:text-white mr-2">+7%</div>
                  <div className="w-20 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-secondary h-2.5 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Sprout className="mr-2 h-4 w-4 text-gray-900 dark:text-white" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                      Soja - Parcela Sur
                    </p>
                    <p className="text-sm text-muted-foreground text-gray-700 dark:text-gray-400">
                      Estimado: 2.9 ton/ha
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-gray-900 dark:text-white mr-2">-2%</div>
                  <div className="w-20 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-secondary h-2.5 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
