import Navbar from "../../../common/components/Navbar";
import {
  CalendarDays,
  CalendarIcon,
  Clipboard,
  Leaf,
  Printer,
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
import { useRecoilValue } from "recoil";
import { authTokenState } from "../../auth/state/authAtom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../auth/utils/tokenUtils";
import useAuth from "../../auth/hooks/useAuth";
import { useObtenerDataDashboard } from "../hooks/useDataDashboard";
import { useObtenerEstimaciones } from "../../cosechas/hooks/useEstimaciones";
import { EstimacionCosechaInterface } from "../../cosechas/models";
import { EstimacionSueloInterface } from "../../suelos/models";
import { useObtenerEstimacionesSuelo } from "../../suelos/hooks/useEstimacionSuelo";
//import { userState } from "../../auth/state/userAtom";

const Home = () => {
  //Datos para mostrar en la grafica
  const soilAnalysisData = [
    { nutriente: "Nitrógeno", valor: 45 },
    { nutriente: "Fósforo", valor: 28 },
    { nutriente: "Potasio", valor: 60 },
    { nutriente: "Calcio", valor: 53 },
    { nutriente: "Magnesio", valor: 32 },
  ];
  const [dashboardData, setDashboardData] = useState<
    DataDashboard | undefined
  >();
  const { data: dataDashboard } = useObtenerDataDashboard();
  const { logout } = useAuth();
  const token = useRecoilValue(authTokenState);
  //const user = useRecoilValue(userState);
  useEffect(() => {
    console.log("El token global", token);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenExpired(token)) {
      logout();
    }
  }, [token, navigate]);

  useEffect(() => {
    console.log("Data", dataDashboard);
    if (dataDashboard?.data && typeof dataDashboard.data === "object") {
      setDashboardData(dataDashboard.data as DataDashboard);
    }
  }, [dataDashboard]);

  //traer datos para la lista de estimaciones
  const { data: estimacionCosechasResponse } = useObtenerEstimaciones();
  const [estimacionesCosechas, setEstimacionesCosechas] = useState<
    EstimacionCosechaInterface[]
  >([]);
  const { data: estimacionSueloResponse } = useObtenerEstimacionesSuelo();
  const [estimacionesSuelos, setEstimacionesSuelos] = useState<
    EstimacionSueloInterface[]
  >([]);

  const [estimacionesCombinadas, setEstimacionesCombinadas] = useState<
    Array<{ tipo: string; fecha_created: string; id: number }>
  >([]);

  const traerEstimacionesCosecha = () => {
    console.log("Datos de la estimacion", estimacionCosechasResponse);
    if (
      estimacionCosechasResponse &&
      Array.isArray(estimacionCosechasResponse.data)
    ) {
      setEstimacionesCosechas(estimacionCosechasResponse.data);
    }
  };

  const traerEstimacionesSuelos = () => {
    if (
      estimacionSueloResponse &&
      Array.isArray(estimacionSueloResponse.data)
    ) {
      setEstimacionesSuelos(estimacionSueloResponse.data);
    }
  };

  useEffect(() => {
    traerEstimacionesCosecha();
    traerEstimacionesSuelos();
  }, [estimacionCosechasResponse, estimacionSueloResponse]);

  //ahora combinamos listas
  useEffect(() => {
    if (estimacionCosechasResponse && estimacionSueloResponse) {
      // Transformar y combinar datos
      const cosechas = estimacionesCosechas.map(
        (item: EstimacionCosechaInterface) => ({
          tipo: "Cosecha",
          fecha_created: item.fecha_created,
          id: item.id,
        })
      );

      const suelos = estimacionesSuelos.map(
        (item: EstimacionSueloInterface) => ({
          tipo: "Suelo",
          fecha_created: item.fecha_levantamiento,
          id: item.id,
        })
      );

      // Fusionar, ordenar y filtrar los últimos 3
      const combinadas = [...cosechas, ...suelos]
        .sort(
          (a, b) =>
            new Date(b.fecha_created).getTime() -
            new Date(a.fecha_created).getTime()
        )
        .slice(0, 3);

      setEstimacionesCombinadas(combinadas);
    }
  }, [estimacionCosechasResponse, estimacionSueloResponse]);

  return (
    <main className="bg-white border-gray-200 dark:bg-gray-900">
      <Navbar />
      <section className="max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Dashboard
          </h2>
          <div className="flex items-center space-x-2">
            <button className="bg-primary hover:bg-[#016F35] text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none flex align-middle items-center gap-2">
              <Printer /> Descargar Reporte
            </button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-2">
          <div className="border-l-4 border-primary p-6 bg-white border rounded-lg shadow dark:bg-gray-800 ">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-primary">
                Bitacoras de suelo
              </p>
              <Clipboard className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {dashboardData?.totalBitacorasSuelo}
              </div>
              <p className="text-xs text-muted-foreground text-gray-700 dark:text-gray-400">
                + {dashboardData?.bitacorasSueloLastMonth} desde el ultimo mes
              </p>
            </div>
          </div>
          <div className="border-l-4 border-primary p-6 bg-white border rounded-lg shadow dark:bg-gray-800 ">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-primary">
                Estimaciones de Cosecha
              </p>
              <Sprout className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {dashboardData?.totalBitacorasCosecha}
              </div>
              <p className="text-xs text-muted-foreground text-gray-700 dark:text-gray-400">
                + {dashboardData?.bitacorasCosechaLastMonth} desde el último mes
              </p>
            </div>
          </div>
          <div className="border-l-4 border-primary p-6 bg-white border rounded-lg shadow dark:bg-gray-800 ">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-primary">
                Asignaciones existentes
              </p>
              <Leaf className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {dashboardData?.totalAsignaciones}
              </div>
              <p className="text-xs text-muted-foreground text-gray-700 dark:text-gray-400">
                +{dashboardData?.asignacionesLastSixMonths} de los ultimos 6
                meses
              </p>
            </div>
          </div>
          <div className="border-l-4 border-primary p-6 bg-white border rounded-lg shadow dark:bg-gray-800">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-primary">
                Productores asociados
              </p>
              <CalendarDays className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {dashboardData?.totalProductores}
              </div>
              <p className="text-xs text-muted-foreground text-gray-700 dark:text-gray-400">
                {dashboardData?.productoresLastYear} en el ultimo año
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
                  <Bar dataKey="valor" fill="#02A750" />
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
                Las ultimas estimaciones completadas
              </p>
            </div>
            <div>
              <div className="space-y-8 mt-4">
                {estimacionesCombinadas.map((estimacion, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <p className="text-[1rem] font-bold text-gray-900 dark:text-white">
                          {estimacion.tipo === "Cosecha"
                            ? "Estimacion de cosecha"
                            : "Analisis de suelo"}
                        </p>
                        <span className="bg-green-200 text-primary text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-700 dark:text-green-300">
                          ID: {estimacion.id}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-400 flex gap-2">
                        <CalendarIcon className="h-4 w-4" aria-hidden="true" />{" "}
                        {new Date(estimacion.fecha_created).toLocaleDateString(
                          "es-ES",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
